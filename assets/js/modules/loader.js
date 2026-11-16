import { bindEvents } from "./events.js";
import { showDashboard, showLogin } from "./view.js";
import { isAuthenticated } from "./session.js";
import { initializeMobileNumberIntelligence } from "./mobile-number-intelligence.js";

export function initialize() {
  bindEvents();
  initializeMobileNumberIntelligence();
  isAuthenticated() ? showDashboard() : showLogin();
}
