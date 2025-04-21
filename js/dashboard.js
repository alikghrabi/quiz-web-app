// Protect page: only allow if isAdmin = true
if (localStorage.getItem("isAdmin") !== "true") {
  alert("Access denied");
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const tableContainer = document.getElementById("usersTable");

if (users.length === 0) {
  tableContainer.innerHTML = "<p>No users found.</p>";
} else {
  let html = "<table><tr><th>Name</th><th>Email</th><th>Scores</th></tr>";
  users.forEach(user => {
    const scores = user.scores && user.scores.length > 0
  ? user.scores.map(s => s.score ?? s).join(", ")
  : "No scores";

    html += `<tr><td>${user.name}</td><td>${user.email}</td><td>${scores}</td></tr>`;
  });
  html += "</table>";
  tableContainer.innerHTML = html;
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}
