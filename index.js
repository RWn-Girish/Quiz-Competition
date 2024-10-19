const questions = [
  {
    question: "What does HTML stand for?",
    options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Marketing Language",
        "Hyper Text Markup Language",
        "Hyper Tool Markup Language"
    ],
    correct: 2 
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<style>", "<css>", "<link>"],
    correct: 1 
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "background-color", "bgcolor", "background"],
    correct: 1 
  },
  {
    question: "Which is the correct syntax for referring to an external script in JavaScript?",
    options: [
        '<script src="script.js">',
        '<script href="script.js">',
        '<script link="script.js">',
        '<script file="script.js">'
    ],
    correct: 0
  },
  {
    question: "What is the correct way to center an element horizontally in CSS?",
    options: [
        "text-align: center;",
        "vertical-align: middle;",
        "margin: auto;",
        "display: center;"
    ],
    correct: 2 
  },
  {
    question: "Which method is used to access an HTML element by its ID in JavaScript?",
    options: [
        "getElementByTagName()",
        "getElementById()",
        "getElementByClassName()",
        "getElementByName()"
    ],
    correct: 1 
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2 
  },
  {
    question: "In HTML, which attribute is used to specify a unique identifier for an element?",
    options: ["class", "id", "name", "key"],
    correct: 1 
  },
  {
    question: "How do you write a comment in CSS?",
    options: [
        "// This is a comment",
        "<!-- This is a comment -->",
        "' This is a comment",
        "/* This is a comment */"
    ],
    correct: 3 
  },
  {
    question: "Which event occurs when a user clicks on an HTML element?",
    options: ["onchange", "onmouseover", "onmouseclick", "onclick"],
    correct: 3 
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10 * 60;
let questionTimer = 60;
let quizInterval, questionInterval;
let username = "";

const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const loginBtn = document.getElementById("loginBtn");
const scoreContainer = document.getElementById("score-container");
const loginContainer = document.querySelector(".login-container");

// Load the current question and options
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.innerText = option;
    optionBtn.classList.add("option-btn");
    optionBtn.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(optionBtn);
  });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    score++;
  }
  nextQuestion();
}

// Move to the next question (manually or automatically)
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    submitQuiz();
  } else {
    loadQuestion();
    questionTimer = 60;
  }
}

// Update timer for both total time and per question
function updateTimers() {
  timeLeft--;
  questionTimer--;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.innerText = `Time Left: ${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  // If total time is over, submit the quiz
  if (timeLeft <= 0) {
    submitQuiz();
  }

  // If 1 minute for a question is over, go to the next question
  if (questionTimer <= 0) {
    nextQuestion();
  }
}

// Start the quiz and the timers
function startQuiz() {
  loadQuestion();

  quizInterval = setInterval(updateTimers, 1000);

  nextBtn.addEventListener("click", nextQuestion);
  submitBtn.addEventListener("click", submitQuiz);
}

// Submit the quiz and show the score
function submitQuiz() {
  clearInterval(quizInterval);
  clearInterval(questionInterval);
  questionElement.style.display = "none";
  optionsContainer.style.display = "none";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";

  scoreContainer.style.display = "block";
  scoreContainer.innerText = `Hi, ${username}!!!. 
    Your final score is: ${score} / ${questions.length}`;
}

function login(e) {
  e.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("userName: ===> ", userName);
  console.log("Password: ===> ", password);
  if (userName === "user" && password === "12345") {
    username = userName;
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.style.display = "block";
    loginContainer.style.display = "none";
    startQuiz();
  }
  else if(!userName && !password){
    alert('Username and Password is not Empty');
  }
  else{
    alert('Your Username and Password is wrong!!!!! ');
  }
}
loginBtn.addEventListener("click", login);

function loginPage() {
  loginContainer.style.display = "block";
}
// Initialize quiz on page load
window.onload = loginPage;
// window.onload = startQuiz;
