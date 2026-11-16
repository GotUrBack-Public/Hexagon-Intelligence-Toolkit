import { bindEvents } from "./events.js";
import { showDashboard, showLogin } from "./view.js";
import { isAuthenticated } from "./session.js";

export function initialize() {
  bindEvents();
  isAuthenticated() ? showDashboard() : showLogin();
}
