import { questionCategories } from "./question.js"; // Importing categories

let userCreated = false;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question
let selectedCategory = []; // Stores the selected category questions

const box = document.querySelector(".box");
const userInput = document.querySelector("#username");
const createUserButton = document.querySelector(".createuser");
const quitButton = document.querySelector(".quit-btn");
const homeButton = document.getElementById("home-button");
const createButton = document.querySelector(".Create");
const startButton = document.querySelector(".start-button");
const musicButton = document.querySelector(".topic.music");
const artButton = document.querySelector(".topic.art");
const codingButton = document.querySelector(".topic.coding");
const nextButton = document.getElementById("next-btn");
const quitQuizButton = document.getElementById("quit-btn");
const questionContainer = document.getElementById("questions");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const scorePage = document.getElementById("score-page");
const finalScoreElement = document.getElementById("final-score");
const restartQuiz = document.getElementById("restart");

startButton.addEventListener("click", startQuiz);
createButton.addEventListener("click", createUser);
musicButton.addEventListener("click", () => selectCategory("general"));
artButton.addEventListener("click", () => selectCategory("geography"));
codingButton.addEventListener("click", () => selectCategory("science"));
homeButton.addEventListener("click", goHome);
nextButton.addEventListener("click", nextQuestion);
quitQuizButton.addEventListener("click", quitQuiz);

createUserButton.addEventListener("click", () => {
  box.style.display = "block";
});

quitButton.addEventListener("click", () => {
  box.style.display = "none";
});



// Function to create a user
function createUser() {
  const usernameValue = userInput.value.trim();

  if (usernameValue === "") {
    alert("Please enter a username.");
    return;
  }

  createUserButton.textContent = usernameValue;
  box.style.display = "none";
  userCreated = true;
  alert("USER CREATED SUCCESSFULLY");
}

// Function to start the quiz
function startQuiz() {
  if (!userCreated) {
    alert("PLEASE CREATE A USER.");
    return;
  }

  document.getElementById("first-container").style.display = "none";
  document.getElementById("second-container").style.display = "block";
}

// Function to go back to home
function goHome(event) {
  event.preventDefault();
  document.getElementById("second-container").style.display = "none";
  document.getElementById("first-container").style.display = "block";
}

// Function to select a category
function selectCategory(category) {
  selectedCategory = questionCategories[category];
  currentQuestionIndex = 0; // Reset question index
  score = 0; // Reset score
  document.getElementById("second-container").style.display = "none";
  questionContainer.style.display = "block";
  loadQuestion();
}

// Function to load a question
function loadQuestion() {
  const question = selectedCategory[currentQuestionIndex];

  if (!question) {
    endQuiz();
    return;
  }

  questionElement.textContent = question.q;
  optionsElement.innerHTML = ""; // Clear previous options
  question.opt.forEach((opt) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = opt;
    optionButton.classList.add("option-button");
    optionButton.addEventListener("click", () => handleAnswer(opt));
    optionsElement.appendChild(optionButton);
  });

  startTimer();
}

// Function to start the timer
function startTimer() {
  timeLeft = 10;
  timerElement.textContent = `timer left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `timer left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function handleAnswer(selectedAnswer) {
    const correctAnswer = selectedCategory[currentQuestionIndex].a;
    if (selectedAnswer === correctAnswer) {
      score++; // Increment score if the answer is correct
    }
    nextQuestion(); // Move to the next question without showing an alert
  }
  

// Function to go to the next question
function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedCategory.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Function to quit the quiz
function quitQuiz() {
  clearInterval(timer);
  endQuiz();
}

// Function to end the quiz
function endQuiz() {
  questionContainer.style.display = "none";
  scorePage.style.display = "block";
  finalScoreElement.textContent = `${score}/${selectedCategory.length}`;
}

// Restart quiz
restartQuiz.addEventListener("click", () => {
  scorePage.style.display = "none";
  document.getElementById("first-container").style.display = "block";
});