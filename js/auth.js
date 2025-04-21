const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

function handleRegister() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!name || !email || !password) return alert("All fields required.");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(user => user.email === email);
  if (existingUser) return alert("Email already registered.");

  users.push({ name, email, password, scores: [] });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please login.");
  loginTab.click();
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) return alert("All fields required.");

  if (email === "admin@quiz.com" && password === "admin123") {
    localStorage.setItem("currentUser", JSON.stringify({ name: "Admin", email }));
    return window.location.href = "dashboard.html";
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) return alert("Invalid credentials.");

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "home.html";
}
