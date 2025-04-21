const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "index.html";

document.getElementById("welcomeMsg").innerText = `Welcome, ${user.name}!`;

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [
  {
    id: 1,
    title: "JavaScript Basics",
    questions: [
      {
        question: "What is the correct syntax to declare a variable?",
        options: ["let x = 5;", "int x = 5;", "var x := 5;"],
        answer: 0
      },
      {
        question: "Which is a JavaScript data type?",
        options: ["float", "number", "decimal"],
        answer: 1
      },
      {
        question: "How do you write a comment in JS?",
        options: ["# comment", "// comment", "<!-- comment -->"],
        answer: 1
      }
    ]
  },
  {
    id: 2,
    title: "HTML & CSS",
    questions: [
      {
        question: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>"],
        answer: 1
      },
      {
        question: "CSS stands for?",
        options: ["Cascading Style Sheets", "Color Style System", "Creative Sheet Style"],
        answer: 0
      },
      {
        question: "Which property changes text color?",
        options: ["text-style", "font-color", "color"],
        answer: 2
      }
    ]
  }
];

// Save quizzes if not already saved
if (!localStorage.getItem("quizzes")) {
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

const quizList = document.getElementById("quizList");
quizzes.forEach(quiz => {
  const div = document.createElement("div");
  div.className = "quiz-item";
  div.innerText = quiz.title;
  div.onclick = () => {
    localStorage.setItem("selectedQuizId", quiz.id);
    window.location.href = "quiz.html";
  };
  quizList.appendChild(div);
});

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
