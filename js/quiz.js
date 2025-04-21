const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "index.html";

const quizId = parseInt(localStorage.getItem("selectedQuizId"));
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
const quiz = quizzes.find(q => q.id === quizId);

if (!quiz) {
  alert("Quiz not found.");
  window.location.href = "home.html";
}

document.getElementById("quizTitle").innerText = quiz.title;

const quizForm = document.getElementById("quizForm");

quiz.questions.forEach((q, index) => {
  const block = document.createElement("div");
  block.className = "question-block";
  block.innerHTML = `<h4>Q${index + 1}. ${q.question}</h4>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  q.options.forEach((opt, i) => {
    const optId = `q${index}_opt${i}`;
    const radio = `
      <label>
        <input type="radio" name="q${index}" value="${i}" id="${optId}" />
        ${opt}
      </label>
    `;
    optionsDiv.innerHTML += radio;
  });

  block.appendChild(optionsDiv);
  quizForm.appendChild(block);
});

function submitQuiz() {
  let score = 0;

  quiz.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });

  const resultText = `You scored ${score} out of ${quiz.questions.length}`;
  document.getElementById("result").innerText = resultText;

  // Save score to current user
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUserIndex = users.findIndex(u => u.email === user.email);
  if (currentUserIndex !== -1) {
    users[currentUserIndex].scores.push({ quizId: quiz.id, title: quiz.title, score });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Disable form after submit
  document.getElementById("submitBtn").disabled = true;
  const inputs = quizForm.querySelectorAll("input");
  inputs.forEach(input => input.disabled = true);
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
