var highScore = 0;
var currentScore = 0;
var highScoreEl = document.querySelector('#high-score-link');
var startButtonEl = document.querySelector('.start-button');
var timerEl = document.querySelector('.timer');
var questionsEl = document.querySelector('#questions');
var choicesEl = document.querySelector('#choices');
var index = 0;
var correctSound = document.querySelector('.correct-sound');
var incorrectSound = document.querySelector('.incorrect-sound');
var buttonDivEl = document.querySelector('.button-div');
var buttonContainer = document.querySelector('.button-container');
var userScore = document.querySelector('#finish');
var playerInfo = document.querySelector('#playerInfo');
var submit = document.querySelector('#submit');
var submitButton;
var a1 = '';
var a2 = '';
var a3 = '';
var a4 = '';
var timeLeft = 75;

var questions = [
  {
    title: 'Question 1: Which is not a valid data type?',
    choices: ['String', 'Boolean', 'Number', 'Word'],
    answer: 'Word',
  },
  {
    title: 'Question 2: What type of statement is used to check a condition?',
    choices: ['If', 'For', 'While', 'Only'],
    answer: 'If',
  },
  {
    title: 'Question 3: If . is to class, then # is to ___?',
    choices: ['Type', 'String', 'id', 'Function'],
    answer: 'id',
  },
  {
    title: 'Question 4: What does the "M" in HTML stand for?',
    choices: ['Make', 'Markup', 'Markdown', 'Media'],
    answer: 'Markup',
  },
  {
    title: 'What is CSS provide for a webpage?',
    choices: ['Styling', 'Content', 'Functionality', 'None of these'],
    answer: 'Styling',
  },
];

highScoreEl.addEventListener('click', function () {
  alert('your high score is ' + highScore);
});

// Timer that counts down from 75
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = 'Time Left: ' + timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '0';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    }
  }, 1000);
}

// start quiz
startButtonEl.addEventListener('click', function () {
  countdown();
  getQuestions();
  var startScreenButton = document.querySelector('.start-button');
  var startScreenWelcome = document.querySelector('.welcome');
  var startScreenInstructions = document.querySelector('.instructions');
  startScreenWelcome.remove();
  startScreenInstructions.remove();
  startScreenButton.remove();
});

// function to get questions
function getQuestions() {
  var currentQ = questions[index];
  questionsEl.textContent = currentQ.title;
  choicesEl.innerHTML = '';
  currentQ.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement('button');
    choiceButton.classList.add('btn', 'btn-primary', 'btn-lg', 'answer-btn');
    choiceButton.setAttribute('value', choice);
    choiceButton.textContent = choice;
    choicesEl.append(choiceButton);
    choiceButton.onclick = answerCheck;
  });
}

// function to check if the correct answer was chosen

function answerCheck() {
  if (this.value !== questions[index].answer) {
    timeLeft -= 10;
    incorrectSound.play();
  } else {
    correctSound.play();
    currentScore += 10;
  }
  index++;
  if (index === questions.length) {
    quizOver();
  } else {
    getQuestions();
  }
}

function quizOver() {
  choicesEl.remove();
  questionsEl.remove();
  userScore.textContent = 'Your final score is:' + currentScore;
  playerInfo.textContent = 'Enter your initials:';
  var scoreInput = document.createElement('input');
  playerInfo.appendChild(scoreInput);
  submitButton = document.createElement('button');
  submitButton.classList.add('btn', 'btn-primary', 'btn-lg', 'submit-btn');
  submitButton.textContent = 'Submit';
  submit.appendChild(submitButton);

  submitButton.addEventListener('click', function () {
    localStorage.setItem('Initials', scoreInput);
  });
}
