import { createChallenge } from "./challenge.js";
import { verifyKey } from "./verifier.js";
import { startSession, endSession } from "./session.js";
import { showDashboard, showLogin } from "./view.js";
import { settings } from "../../../config/client-settings.js";

export function bindEvents() {
  const form = document.querySelector("#login-form");
  const key = document.querySelector("#access-key");
  const answer = document.querySelector("#captcha-answer");
  const question = document.querySelector("#captcha-question");
  const feedback = document.querySelector("#feedback");
  const button = form.querySelector(".submit-btn");
  let challenge;

  const refresh = () => {
    challenge = createChallenge();
    question.textContent = challenge.question;
    answer.value = "";
  };

  document.querySelector("#refresh-captcha").addEventListener("click", refresh);
  document.querySelector("#toggle-key").addEventListener("click", event => {
    const visible = key.type === "password";
    key.type = visible ? "text" : "password";
    event.currentTarget.textContent = visible ? "HIDE" : "SHOW";
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.classList.remove("success");
    if (answer.value.trim() === "" || Number(answer.value) !== challenge.answer) {
      feedback.textContent = "Bot protection check failed. Try a new challenge.";
      refresh();
      return;
    }
    if (!key.value.trim()) {
      feedback.textContent = "Please enter your access key.";
      return;
    }
    button.disabled = true;
    button.querySelector("span").textContent = "VERIFYING...";
    try {
      if (!await verifyKey(key.value)) {
        window.location.href = settings.redirectOnFailure;
        return;
      }
      startSession();
      feedback.textContent = "Verification complete. Access granted.";
      feedback.classList.add("success");
      showDashboard();
    } catch {
      feedback.textContent = "Secure verification is unavailable. Open this site over HTTPS.";
    } finally {
      button.disabled = false;
      button.querySelector("span").textContent = "AUTHENTICATE";
    }
  });

  document.querySelector("#logout").addEventListener("click", () => {
    endSession();
    key.value = "";
    feedback.textContent = "";
    showLogin();
    refresh();
  });

  refresh();
}
