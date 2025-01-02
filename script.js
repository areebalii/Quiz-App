// Local Storage and User Management
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function loginUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    alert('Login successful!');
    loadDashboard();
  } else {
    alert('Invalid username or password!');
  }
}

function registerUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (users[username]) {
    alert('Username already exists!');
  } else {
    users[username] = { password, scores: {} };
    saveUsers();
    alert('Registration successful!');
  }
}

function loadDashboard() {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('dashboard-section').classList.remove('hidden');

  if (currentUser) {
    const welcomeMessage = `Welcome, ${currentUser}!`;
    document.getElementById('welcome-message').textContent = welcomeMessage;
  }

  loadSubjects();
  loadHistory();
  document.getElementById('history-section').classList.add('hidden'); // Hide history on load
}

function logoutUser() {
  currentUser = null;
  document.getElementById('dashboard-section').classList.add('hidden');
  document.getElementById('auth-section').classList.remove('hidden');
  alert('You have been logged out.');
}

// Inline JSON data as a JavaScript object
const subjects = [
  {
    name: "Math",
    levels: {
      easy: [
        { question: "5 - 3 = ?", options: ["1", "2", "3"], answer: "2" },
        { question: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
        { question: "5 * 3 = ?", options: ["1", "2", "15"], answer: "15" }
      ],
      medium: [
        { question: "12 / 4 = ?", options: ["2", "3", "4"], answer: "3" },
        { question: "9 x 3 = ?", options: ["27", "18", "36"], answer: "27" }
      ],
      hard: [
        { question: "15 x 15 = ?", options: ["225", "255", "205"], answer: "225" },
        { question: "sqrt(144) = ?", options: ["12", "14", "10"], answer: "12" }
      ]
    }
  },
  {
    name: "Science",
    levels: {
      easy: [
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus"], answer: "Mars" },
        { question: "Water boils at 100 degrees on which scale?", options: ["Fahrenheit", "Celsius", "Kelvin"], answer: "Celsius" }
      ],
      medium: [
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Go"], answer: "Au" },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], answer: "Carbon Dioxide" }
      ],
      hard: [
        { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo"], answer: "Albert Einstein" },
        { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome"], answer: "Mitochondria" }
      ]
    }
  },
  {
    name: "Geography",
    levels: {
      easy: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], answer: "Paris" },
        { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia"], answer: "Africa" }
      ],
      medium: [
        { question: "Which country has the most natural lakes?", options: ["USA", "Canada", "Russia"], answer: "Canada" },
        { question: "What is the smallest country in the world?", options: ["Monaco", "Malta", "Vatican City"], answer: "Vatican City" }
      ],
      hard: [
        { question: "Mount Everest is part of which mountain range?", options: ["Andes", "Himalayas", "Rockies"], answer: "Himalayas" },
        { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze"], answer: "Nile" }
      ]
    }
  },

];

// Quiz Logic
let currentSubject = null;
let currentLevel = null;
let currentQuestionIndex = 0;
let score = 0;

function loadSubjects() {
  const subjectsDiv = document.getElementById('subjects');
  subjectsDiv.innerHTML = '';

  subjects.forEach(subject => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.textContent = subject.name;
    subjectDiv.onclick = () => showDifficultyOptions(subject);
    subjectsDiv.appendChild(subjectDiv);
  });
}

function showDifficultyOptions(subject) {
  currentSubject = subject;
  document.getElementById('subjects-section').classList.add('hidden');
  document.getElementById('difficulty-section').classList.remove('hidden');
}

function selectDifficulty(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('difficulty-section').classList.add('hidden');
  document.getElementById('questions-section').classList.remove('hidden');
  document.getElementById('history-section').classList.add('hidden'); // Hide history during game
  showQuestion();
}

function checkAnswer(selectedOption) {
  const question = currentSubject.levels[currentLevel][currentQuestionIndex];
  if (selectedOption === question.answer) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

function showResults() {
  if (!users[currentUser].scores) {
    users[currentUser].scores = {};
  }

  if (!users[currentUser].scores[currentSubject.name]) {
    users[currentUser].scores[currentSubject.name] = { easy: 0, medium: 0, hard: 0 };
  }

  users[currentUser].scores[currentSubject.name][currentLevel] += score;

  saveUsers();

  alert(`Quiz completed! Your score: ${score}`);
  document.getElementById('questions-section').classList.add('hidden');
  document.getElementById('subjects-section').classList.remove('hidden');
  loadHistory();
  document.getElementById('history-section').classList.remove('hidden'); // Show history after game ends
}

function loadHistory() {
  const historyTableBody = document.getElementById('history-table').querySelector('tbody');
  historyTableBody.innerHTML = '';

  if (users[currentUser] && users[currentUser].scores) {
    const scores = users[currentUser].scores;

    for (let subject in scores) {
      const subjectScores = scores[subject];
      const totalScore = Object.values(subjectScores).reduce((acc, val) => acc + val, 0);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${subject}</td>
        <td>${subjectScores.easy || 0}</td>
        <td>${subjectScores.medium || 0}</td>
        <td>${subjectScores.hard || 0}</td>
        <td>${totalScore}</td>
      `;
      historyTableBody.appendChild(row);
    }
  } else {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5">No history available.</td>`;
    historyTableBody.appendChild(row);
  }
}

// Timer variables
let timerInterval = null;
let timeLeft = 30;

function startTimer() {
  timeLeft = 30; // Reset the timer to 30 seconds
  document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

  // Clear any previous timer intervals
  clearInterval(timerInterval);

  // Start the timer interval
  timerInterval = setInterval(() => {
    timeLeft--;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft > 20) {
      timerElement.style.color = "#76ff03";
    } else if (timeLeft > 10) {
      timerElement.style.color = "orange";
    } else {
      timerElement.style.color = "red";
    }

    // If time runs out, move to the next question
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the timer
      timeUp(); // Call the function when time is up
    }
  }, 1000);
}

function timeUp() {
  alert('Time is up for this question!');
  currentQuestionIndex++; // Move to the next question
  showQuestion(); // Display the next question
}

function showQuestion() {
  const questions = currentSubject.levels[currentLevel];
  if (currentQuestionIndex >= questions.length) {
    clearInterval(timerInterval); // Stop the timer when quiz ends
    return showResults();
  }

  const question = questions[currentQuestionIndex];
  document.getElementById('question-title').textContent = question.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => {
      clearInterval(timerInterval); // Stop the timer when user selects an answer
      checkAnswer(option);
    };
    optionsDiv.appendChild(button);
  });

  startTimer(); // Start the timer for this question
}

function toggleHistory() {
  const historySection = document.getElementById('history-section');
  historySection.classList.toggle('hidden');
  const button = document.getElementById('history-toggle-btn');
  if (historySection.classList.contains('hidden')) {
    button.textContent = 'Show History';
  } else {
    button.textContent = 'Hide History';
  }
}

function goBackToSubjects() {
  document.getElementById('difficulty-section').classList.add('hidden');
  document.getElementById('subjects-section').classList.remove('hidden');
}

function goBackToDifficulty() {
  document.getElementById('questions-section').classList.add('hidden');
  document.getElementById('difficulty-section').classList.remove('hidden');
  clearInterval(timerInterval); // Stop the timer when going back
}


// Load subjects when the page loads
document.addEventListener('DOMContentLoaded', loadSubjects);

