// Tab logic
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const adminTab = document.getElementById("adminTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const adminForm = document.getElementById("adminForm");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  adminTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  adminForm.classList.add("hidden");
};

registerTab.onclick = () => {
  loginTab.classList.remove("active");
  registerTab.classList.add("active");
  adminTab.classList.remove("active");
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  adminForm.classList.add("hidden");
};

adminTab.onclick = () => {
  loginTab.classList.remove("active");
  registerTab.classList.remove("active");
  adminTab.classList.add("active");
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  adminForm.classList.remove("hidden");
};

// Login as user
function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    alert("Invalid login credentials");
  }
}

// Register new user
function handleRegister() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  const newUser = { name, email, password, scores: [] };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  registerTab.classList.remove("active");
  loginTab.classList.add("active");
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
}

// Admin login
function handleAdminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if (email === "alikghrabi@gmail.com" && password === "12321") {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid admin credentials");
  }
}
