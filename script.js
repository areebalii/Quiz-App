// Local Storage and User Management
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Show Login Section
function showLogin() {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('login-section').classList.remove('hidden');
}

// Show Register Section
function showRegister() {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('auth-section').classList.remove('hidden');
}

function loginUser() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    loadDashboard();
  } else {
    alert('Invalid username or password!');
  }
}

function registerUser() {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert('All fields are required!');
    return;
  }

  if (users[username]) {
    alert('Username already exists!');
    return;
  }

  users[username] = { email, password, scores: {} };
  saveUsers();
  alert('Registration successful! Please log in.');
  showLogin(); // Automatically redirect to login section after registration
}

function loadDashboard() {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('dashboard-section').classList.remove('hidden');

  if (currentUser) {
    const welcomeMessage = `Welcome, ${currentUser}!`;
    document.getElementById('welcome-message').textContent = welcomeMessage;
  }

  loadSubjects();
}

function logoutUser() {
  currentUser = null;
  document.getElementById('dashboard-section').classList.add('hidden');
  document.getElementById('auth-section').classList.remove('hidden');
  alert('You have been logged out.');
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
        { question: "10 / 2 = ?", options: ["2", "5", "10"], answer: "5" },
        { question: "3 + 6 = ?", options: ["9", "8", "10"], answer: "9" },
        { question: "4 x 2 = ?", options: ["6", "8", "10"], answer: "8" }
      ],
      medium: [
        { question: "12 / 4 = ?", options: ["2", "3", "4"], answer: "3" },
        { question: "9 x 3 = ?", options: ["27", "18", "36"], answer: "27" },
        { question: "14 - 7 = ?", options: ["6", "7", "8"], answer: "7" },
        { question: "25 + 30 = ?", options: ["50", "55", "60"], answer: "55" },
        { question: "8 x 7 = ?", options: ["48", "56", "64"], answer: "56" }
      ],
      hard: [
        { question: "15 x 15 = ?", options: ["225", "255", "205"], answer: "225" },
        { question: "sqrt(144) = ?", options: ["12", "14", "10"], answer: "12" },
        { question: "What is 3^4?", options: ["27", "64", "81"], answer: "81" },
        { question: "1000 / 25 = ?", options: ["50", "40", "25"], answer: "40" },
        { question: "Solve: 50 + (10 x 5)", options: ["100", "150", "200"], answer: "100" }
      ]
    }
  },
  {
    name: "Science",
    levels: {
      easy: [
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus"], answer: "Mars" },
        { question: "Water boils at 100 degrees on which scale?", options: ["Fahrenheit", "Celsius", "Kelvin"], answer: "Celsius" },
        { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "HO2"], answer: "H2O" },
        { question: "What do humans breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Oxygen" },
        { question: "What is the largest organ in the human body?", options: ["Heart", "Skin", "Brain"], answer: "Skin" }
      ],
      medium: [
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Go"], answer: "Au" },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], answer: "Carbon Dioxide" },
        { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome"], answer: "Mitochondria" },
        { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Neptune"], answer: "Saturn" },
        { question: "What is the pH of pure water?", options: ["7", "6", "8"], answer: "7" }
      ],
      hard: [
        { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo"], answer: "Albert Einstein" },
        { question: "What is the chemical formula for ozone?", options: ["O3", "O2", "CO2"], answer: "O3" },
        { question: "What particle has no charge?", options: ["Proton", "Neutron", "Electron"], answer: "Neutron" },
        { question: "What is the study of fungi called?", options: ["Mycology", "Botany", "Zoology"], answer: "Mycology" },
        { question: "What is the speed of light in vacuum?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s"], answer: "300,000 km/s" }
      ]
    }
  },
  {
    name: "Geography",
    levels: {
      easy: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], answer: "Paris" },
        { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia"], answer: "Africa" },
        { question: "What is the largest ocean?", options: ["Atlantic", "Pacific", "Indian"], answer: "Pacific" },
        { question: "Which country has the most people?", options: ["India", "USA", "China"], answer: "China" },
        { question: "Which country is famous for the Eiffel Tower?", options: ["Germany", "Italy", "France"], answer: "France" }
      ],
      medium: [
        { question: "Which country has the most natural lakes?", options: ["USA", "Canada", "Russia"], answer: "Canada" },
        { question: "What is the smallest country in the world?", options: ["Monaco", "Malta", "Vatican City"], answer: "Vatican City" },
        { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: "Canberra" },
        { question: "Which US state is the Grand Canyon located in?", options: ["Nevada", "Arizona", "Utah"], answer: "Arizona" },
        { question: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka"], answer: "Tokyo" }
      ],
      hard: [
        { question: "Mount Everest is part of which mountain range?", options: ["Andes", "Himalayas", "Rockies"], answer: "Himalayas" },
        { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze"], answer: "Nile" },
        { question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctic"], answer: "Antarctic" },
        { question: "What is the capital of Iceland?", options: ["Reykjavik", "Oslo", "Copenhagen"], answer: "Reykjavik" },
        { question: "What is the highest waterfall in the world?", options: ["Niagara", "Angel Falls", "Victoria Falls"], answer: "Angel Falls" }
      ]
    }
  },
  {
    name: "History",
    levels: {
      easy: [
        { question: "Who was the first President of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], answer: "George Washington" },
        { question: "What year did World War II end?", options: ["1945", "1939", "1950"], answer: "1945" },
        { question: "Who discovered America in 1492?", options: ["Christopher Columbus", "Vasco da Gama", "Marco Polo"], answer: "Christopher Columbus" },
        { question: "What ancient civilization built the Pyramids?", options: ["Romans", "Greeks", "Egyptians"], answer: "Egyptians" },
        { question: "Who was known as the Iron Lady?", options: ["Margaret Thatcher", "Indira Gandhi", "Golda Meir"], answer: "Margaret Thatcher" }
      ],
      medium: [
        { question: "In what year was the Declaration of Independence signed?", options: ["1776", "1783", "1800"], answer: "1776" },
        { question: "Who was the last Tsar of Russia?", options: ["Nicholas II", "Peter the Great", "Alexander III"], answer: "Nicholas II" },
        { question: "What empire was ruled by Genghis Khan?", options: ["Mongol Empire", "Ottoman Empire", "Roman Empire"], answer: "Mongol Empire" },
        { question: "Which war was fought between the North and South regions in the U.S.?", options: ["Civil War", "World War I", "Revolutionary War"], answer: "Civil War" },
        { question: "Who was the British Prime Minister during World War II?", options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee"], answer: "Winston Churchill" }
      ],
      hard: [
        { question: "What year was the fall of the Berlin Wall?", options: ["1989", "1991", "1985"], answer: "1989" },
        { question: "Who was the ruler of the Holy Roman Empire in 800 AD?", options: ["Charlemagne", "Otto the Great", "Henry IV"], answer: "Charlemagne" },
        { question: "What battle marked the end of Napoleon's rule?", options: ["Waterloo", "Austerlitz", "Leipzig"], answer: "Waterloo" },
        { question: "What dynasty built the Great Wall of China?", options: ["Qin", "Han", "Tang"], answer: "Qin" },
        { question: "Which treaty ended World War I?", options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Ghent"], answer: "Treaty of Versailles" }
      ]
    }
  },
  {
    name: "Literature",
    levels: {
      easy: [
        { question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen"], answer: "William Shakespeare" },
        { question: "What is the name of Sherlock Holmes' assistant?", options: ["Watson", "Moriarty", "Lestrade"], answer: "Watson" },
        { question: "What is the name of the boy in 'The Jungle Book'?", options: ["Mowgli", "Tarzan", "Baloo"], answer: "Mowgli" },
        { question: "Who wrote 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Jane Austen", "Emily Brontë"], answer: "Jane Austen" },
        { question: "Which author wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury"], answer: "George Orwell" }
      ],
      medium: [
        { question: "Who wrote 'The Great Gatsby'?", options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck"], answer: "F. Scott Fitzgerald" },
        { question: "What is the first book of the Bible?", options: ["Genesis", "Exodus", "Psalms"], answer: "Genesis" },
        { question: "What is the real name of Mark Twain?", options: ["Samuel Clemens", "John Clemens", "Mark Samuel"], answer: "Samuel Clemens" },
        { question: "What epic poem did Homer write?", options: ["The Iliad", "Beowulf", "The Odyssey"], answer: "The Iliad" },
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Toni Morrison", "J.D. Salinger"], answer: "Harper Lee" }
      ],
      hard: [
        { question: "What Shakespeare play features the line 'To be or not to be'?", options: ["Hamlet", "Macbeth", "Othello"], answer: "Hamlet" },
        { question: "What is the title of Dante's famous work?", options: ["Divine Comedy", "Paradise Lost", "Inferno"], answer: "Divine Comedy" },
        { question: "Who wrote 'War and Peace'?", options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov"], answer: "Leo Tolstoy" },
        { question: "Who wrote 'The Canterbury Tales'?", options: ["Geoffrey Chaucer", "John Milton", "John Keats"], answer: "Geoffrey Chaucer" },
        { question: "What is the name of the whale in 'Moby Dick'?", options: ["Moby Dick", "Ahab", "Nantucket"], answer: "Moby Dick" }
      ]
    }
  },
  {
    name: "Technology",
    levels: {
      easy: [
        { question: "What does CPU stand for?", options: ["Central Processing Unit", "Central Power Unit", "Core Processing Unit"], answer: "Central Processing Unit" },
        { question: "Which company created the iPhone?", options: ["Samsung", "Apple", "Google"], answer: "Apple" },
        { question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "HyperText Transfer Package", "High Transfer Technology"], answer: "HyperText Transfer Protocol" },
        { question: "What is the binary code for the number 2?", options: ["10", "01", "11"], answer: "10" },
        { question: "What is the most popular programming language in 2023?", options: ["Python", "JavaScript", "Java"], answer: "Python" }
      ],
      medium: [
        { question: "Who invented the World Wide Web?", options: ["Tim Berners-Lee", "Steve Jobs", "Bill Gates"], answer: "Tim Berners-Lee" },
        { question: "What year was Facebook launched?", options: ["2004", "2008", "2006"], answer: "2004" },
        { question: "What does GPU stand for?", options: ["Graphics Processing Unit", "General Processing Unit", "Graphical Processing Utility"], answer: "Graphics Processing Unit" },
        { question: "Which language is used for AI development?", options: ["Python", "C#", "HTML"], answer: "Python" },
        { question: "What is the most commonly used database language?", options: ["SQL", "MongoDB", "PostgreSQL"], answer: "SQL" }
      ],
      hard: [
        { question: "What is the name of the first computer virus?", options: ["Creeper", "ILOVEYOU", "Morris Worm"], answer: "Creeper" },
        { question: "What does IoT stand for?", options: ["Internet of Things", "Integration of Technology", "Internet of Technology"], answer: "Internet of Things" },
        { question: "What year was the first email sent?", options: ["1971", "1980", "1969"], answer: "1971" },
        { question: "What is blockchain primarily used for?", options: ["Cryptocurrency", "AI", "Data Storage"], answer: "Cryptocurrency" },
        { question: "What is the world's most powerful supercomputer in 2023?", options: ["Frontier", "Fugaku", "Summit"], answer: "Frontier" }
      ]
    }
  },
  {
    name: "Sports",
    levels: {
      easy: [
        { question: "How many players are there in a football (soccer) team?", options: ["10", "11", "12"], answer: "11" },
        { question: "What sport is known as 'America's pastime'?", options: ["Basketball", "Baseball", "Football"], answer: "Baseball" },
        { question: "What color is the jersey of the Tour de France winner?", options: ["Yellow", "Green", "Blue"], answer: "Yellow" },
        { question: "How many points is a touchdown worth in American football?", options: ["6", "5", "7"], answer: "6" },
        { question: "What is the national sport of Japan?", options: ["Sumo Wrestling", "Baseball", "Karate"], answer: "Sumo Wrestling" }
      ],
      medium: [
        { question: "Which country has won the most FIFA World Cups?", options: ["Germany", "Brazil", "Italy"], answer: "Brazil" },
        { question: "What is the highest governing body in cricket?", options: ["ICC", "FIFA", "NBA"], answer: "ICC" },
        { question: "Who holds the record for the most Olympic gold medals?", options: ["Michael Phelps", "Usain Bolt", "Carl Lewis"], answer: "Michael Phelps" },
        { question: "What is the diameter of a basketball hoop in inches?", options: ["18", "20", "16"], answer: "18" },
        { question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "Japan"], answer: "Brazil" }
      ],
      hard: [
        { question: "Who won the first ever FIFA World Cup in 1930?", options: ["Brazil", "Uruguay", "Argentina"], answer: "Uruguay" },
        { question: "What sport uses the terms 'love' and 'deuce'?", options: ["Tennis", "Badminton", "Squash"], answer: "Tennis" },
        { question: "What year was the first modern Olympic Games held?", options: ["1896", "1900", "1888"], answer: "1896" },
        { question: "Who is known as 'The King of Football'?", options: ["Pelé", "Maradona", "Messi"], answer: "Pelé" },
        { question: "Which golfer has won the most major championships?", options: ["Tiger Woods", "Jack Nicklaus", "Arnold Palmer"], answer: "Jack Nicklaus" }
      ]
    }
  },
  {
    name: "Music",
    levels: {
      easy: [
        { question: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince"], answer: "Michael Jackson" },
        { question: "Which instrument has 88 keys?", options: ["Piano", "Guitar", "Violin"], answer: "Piano" },
        { question: "What is the national anthem of the United States?", options: ["America the Beautiful", "Star-Spangled Banner", "God Bless America"], answer: "Star-Spangled Banner" },
        { question: "What is the highest male singing voice?", options: ["Bass", "Tenor", "Baritone"], answer: "Tenor" },
        { question: "Which country is known for the traditional dance Flamenco?", options: ["Italy", "Spain", "Portugal"], answer: "Spain" }
      ],
      medium: [
        { question: "Which composer wrote the 'Moonlight Sonata'?", options: ["Mozart", "Beethoven", "Bach"], answer: "Beethoven" },
        { question: "What is Lady Gaga's real name?", options: ["Stefani Germanotta", "Stephanie Meyer", "Sia Furler"], answer: "Stefani Germanotta" },
        { question: "What is the term for a piece of music performed without instruments?", options: ["Acapella", "Orchestra", "Symphony"], answer: "Acapella" },
        { question: "What was Elvis Presley's first hit?", options: ["Jailhouse Rock", "Hound Dog", "Heartbreak Hotel"], answer: "Heartbreak Hotel" },
        { question: "Who wrote 'The Four Seasons'?", options: ["Antonio Vivaldi", "Johann Bach", "Franz Schubert"], answer: "Antonio Vivaldi" }
      ],
      hard: [
        { question: "What year was Beethoven's 9th Symphony composed?", options: ["1824", "1801", "1815"], answer: "1824" },
        { question: "Who was the lead singer of Queen?", options: ["Freddie Mercury", "Brian May", "Roger Taylor"], answer: "Freddie Mercury" },
        { question: "Which composer went deaf later in life?", options: ["Beethoven", "Mozart", "Chopin"], answer: "Beethoven" },
        { question: "Who was known as the 'Queen of Jazz'?", options: ["Ella Fitzgerald", "Billie Holiday", "Nina Simone"], answer: "Ella Fitzgerald" },
        { question: "Which artist has the most Grammy Awards?", options: ["Beyoncé", "Stevie Wonder", "Taylor Swift"], answer: "Beyoncé" }
      ]
    }
  },
  {
    name: "Art",
    levels: {
      easy: [
        { question: "Who painted the 'Mona Lisa'?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"], answer: "Leonardo da Vinci" },
        { question: "What are primary colors?", options: ["Red, Yellow, Blue", "Green, Blue, White", "Black, White, Grey"], answer: "Red, Yellow, Blue" },
        { question: "What type of paint is water-based?", options: ["Oil", "Acrylic", "Watercolor"], answer: "Watercolor" },
        { question: "What is the art of folding paper called?", options: ["Origami", "Calligraphy", "Papier-mâché"], answer: "Origami" },
        { question: "Which artist is known for 'Starry Night'?", options: ["Van Gogh", "Monet", "Picasso"], answer: "Van Gogh" }
      ],
      medium: [
        { question: "Which museum is home to the 'Mona Lisa'?", options: ["The Louvre", "The Met", "The British Museum"], answer: "The Louvre" },
        { question: "Who painted the ceiling of the Sistine Chapel?", options: ["Michelangelo", "Raphael", "Donatello"], answer: "Michelangelo" },
        { question: "What is the term for art created in public spaces?", options: ["Street Art", "Cubism", "Abstract"], answer: "Street Art" },
        { question: "Which artist is famous for his Blue Period?", options: ["Picasso", "Matisse", "Cézanne"], answer: "Picasso" },
        { question: "What is the term for painting on wet plaster?", options: ["Fresco", "Encaustic", "Tempera"], answer: "Fresco" }
      ],
      hard: [
        { question: "What year was the Louvre established?", options: ["1793", "1802", "1750"], answer: "1793" },
        { question: "Which artist is known for the painting 'The Persistence of Memory'?", options: ["Salvador Dalí", "René Magritte", "Paul Klee"], answer: "Salvador Dalí" },
        { question: "Which art movement did Claude Monet belong to?", options: ["Impressionism", "Cubism", "Surrealism"], answer: "Impressionism" },
        { question: "What is the art term for shading with dots?", options: ["Pointillism", "Cross-Hatching", "Stippling"], answer: "Pointillism" },
        { question: "Who sculpted 'The Thinker'?", options: ["Auguste Rodin", "Bernini", "Canova"], answer: "Auguste Rodin" }
      ]
    }
  }
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

const showHistoryBtn = document.getElementById("show-history-btn");
const historySection = document.getElementById("history-section");

showHistoryBtn.addEventListener("click", () => {
  // Toggle the visibility of the history section
  historySection.classList.toggle("hidden");
});