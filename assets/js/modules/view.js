export function showDashboard() {
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#dashboard-view").classList.remove("hidden");
}

export function showLogin() {
  document.querySelector("#dashboard-view").classList.add("hidden");
  document.querySelector("#login-view").classList.remove("hidden");
}
