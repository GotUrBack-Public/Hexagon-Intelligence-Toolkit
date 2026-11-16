const ACCESS_KEY_HASH = "183ae0b1891f2cd15f3ca1d4755cd1ae3480a0ace0fb0f769a786ee556aeeb80";

const challenges = [
  [3, 8, "+"], [7, 4, "+"], [9, 6, "+"], [12, 5, "+"], [8, 7, "+"],
  [14, 3, "+"], [6, 11, "+"], [15, 2, "+"], [13, 4, "+"], [5, 9, "+"],
  [18, 7, "-"], [16, 8, "-"], [14, 6, "-"], [19, 5, "-"], [12, 3, "-"],
  [17, 9, "-"], [20, 7, "-"], [15, 4, "-"], [11, 6, "-"], [18, 10, "-"],
  [2, 4, "×"], [3, 5, "×"], [4, 4, "×"], [6, 3, "×"], [7, 2, "×"],
  [5, 5, "×"], [8, 2, "×"], [3, 6, "×"], [9, 2, "×"], [4, 7, "×"]
];

const loginView = document.querySelector("#login-view");
const dashboardView = document.querySelector("#dashboard-view");
const loginForm = document.querySelector("#login-form");
const keyInput = document.querySelector("#access-key");
const answerInput = document.querySelector("#captcha-answer");
const questionNode = document.querySelector("#captcha-question");
const feedback = document.querySelector("#feedback");
let activeChallenge = null;

function newChallenge() {
  const index = Math.floor(Math.random() * challenges.length);
  const [a, b, operator] = challenges[index];
  const answer = operator === "+" ? a + b : operator === "-" ? a - b : a * b;
  activeChallenge = { question: `${a} ${operator} ${b} = ?`, answer };
  questionNode.textContent = activeChallenge.question;
  answerInput.value = "";
}

function showDashboard() {
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
}

function showLogin() {
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
  keyInput.value = "";
  answerInput.value = "";
  feedback.textContent = "";
  feedback.classList.remove("success");
  newChallenge();
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

document.querySelector("#refresh-captcha").addEventListener("click", () => {
  newChallenge();
  feedback.textContent = "A new security challenge has been generated.";
  feedback.classList.remove("success");
});

document.querySelector("#toggle-key").addEventListener("click", event => {
  const visible = keyInput.type === "password";
  keyInput.type = visible ? "text" : "password";
  event.currentTarget.textContent = visible ? "HIDE" : "SHOW";
  event.currentTarget.setAttribute("aria-label", visible ? "Hide access key" : "Show access key");
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  feedback.classList.remove("success");

  const submittedAnswer = Number(answerInput.value.trim());
  if (answerInput.value.trim() === "" || !Number.isFinite(submittedAnswer) || submittedAnswer !== activeChallenge.answer) {
    feedback.textContent = "Bot protection check failed. Try a new challenge.";
    newChallenge();
    answerInput.focus();
    return;
  }

  const normalizedKey = keyInput.value.trim().toUpperCase();
  if (!normalizedKey) {
    feedback.textContent = "Please enter your access key.";
    keyInput.focus();
    return;
  }

  const button = loginForm.querySelector(".submit-btn");
  button.disabled = true;
  button.querySelector("span").textContent = "VERIFYING...";
  try {
    const candidateHash = await sha256(normalizedKey);
    if (candidateHash !== ACCESS_KEY_HASH) {
      feedback.textContent = "Access denied. The supplied key is not valid.";
      newChallenge();
      keyInput.select();
      return;
    }
    sessionStorage.setItem("hexagonAuthenticated", "true");
    feedback.textContent = "Verification complete. Access granted.";
    feedback.classList.add("success");
    showDashboard();
  } catch (error) {
    feedback.textContent = "Secure verification is unavailable. Open this site over HTTPS.";
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "AUTHENTICATE";
  }
});

document.querySelector("#logout").addEventListener("click", () => {
  sessionStorage.removeItem("hexagonAuthenticated");
  showLogin();
});

newChallenge();
if (sessionStorage.getItem("hexagonAuthenticated") === "true") showDashboard();