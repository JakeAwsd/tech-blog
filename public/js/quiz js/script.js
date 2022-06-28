var questionIndex = 0;
var timeLeft = questions.length * 15;
var timeInterval;

let polScore = 0;
let entScore = 0;
let truScore = 0;
let spoScore = 0;

var totalScore;

var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('startBtn');
var submitBtn = document.getElementById('submit');
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {

  // hide start menu
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  timerEl.textContent = "Time: " + questions.length * 15;
  questionsEl.removeAttribute("class");

  // console.log("retrieveQuestion");
  retrieveQuestion();

  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    // console.log("timeLeft: " + timeLeft);

  if(timeInterval === 0 || timeLeft <= 0) {
    setInterval(timeInterval);
    endquiz();
    // console.log("timeInterval: " + timeInterval);

    }
    // if(timeLeft < 0) {

    // }
  }, 1000);
}

function retrieveQuestion() {
  var currentQuestion = questions[questionIndex];

  var mainEl = document.getElementById("question-main");
  mainEl.textContent = currentQuestion.title
  answersEl.innerHTML = "";

  //Create buttons
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + "." + choice;

    // attach click event listener to each choice
    choiceNode.addEventListener("click", function() {
      guess(choice);
      check(choice);
    });
    
    // display on the page
    answersEl.appendChild(choiceNode);
  })
};

function guess(choice) {
  // console.log(questions[questionIndex].answer);
  // console.log(this.value);
  if (choice !== questions[questionIndex].answer) {
// Subtracts time for getting an answer wrong
    timeLeft -= 15;

    if (timeLeft <= 0) {
      timeLeft = 0;
    }

    timerEl.textContent = "Time: " + timeLeft;

    // feedbackEl.textContent = "wrong!";
    // console.log("wrong!");
  } else {
    // feedbackEl.textContent = "Correct!";
    // console.log("Correct!");
  }

// feedbackEl.setAttribute("class", "divider");

// setTimeout(function() {

//   feedbackEl.setAttribute("class", "hide");

// }, 1000);

questionIndex++;
// if (questionIndex >= 5) {
// return 0;
// } 

  if (questionIndex === questions.length) {
    endquiz();
  } else {
    retrieveQuestion();
  }
}

function check(choice) {

  // question 1
  if (choice == "Newb-Alert") {
    entScore++;
  } else {
    truScore++;
    spoScore++;
    polScore++;
  }

  // question 2
  if (choice == "Anything Stephen King") {
    truScore++;
  }
  if (choice == "Historical or Current Events") {
    polScore++;    
  }
  if (choice == "Book? Hand over the remote!") {
    entScore++;    
  }
  if (choice == "Sports Illustrated") {
    spoScore++;    
  }

  // Question 3
  if (choice == "Goodnight, and Good Luck") {
    polScore++;    
  }
  if (choice == "Remember the Titans") {
    spoScore++;    
  }
  if (choice == "Yes Man") {
    entScore++;
  }
  if (choice == "Texas Chainsaw Massacre") {
    truScore++;

  }

  // Question 4
  if (choice == "New Girl") {
    entScore++;
  }
  if (choice == "Criminal Minds") {
    truScore++;
  }
  if (choice == "Winning Time: The Rise of the Lakers Dynasty") {
    spoScore++; 
  }
  if (choice == "Scandal") {
    polScore++;    
  }

  // Question 5
  if (choice == "Literature/ Theatre") {
    entScore++;
  }
  if (choice == "Biology/ Chemistry") {
    truScore++;
  }
  if (choice == "GYM/ Health") {
    spoScore++; 
  }
  if (choice == "History/ Debate") {
    polScore++;  
  }

  // Question 6
  if (choice == "Educators/ Politicians") {
    polScore++;  
  }
  if (choice == "Actors/ Comedians") {
    entScore++;
  }
  if (choice == "Investegators/ Serial Killers") {
    truScore++;
  }
  if (choice == "Athlete/ Sports Anchor") {
    spoScore++; 
  }

  // Question 7
  if (choice == "Movie theatre") {
    entScore++;
  }
  if (choice == "Sports Event") {
    spoScore++; 
  }

  // Question 8
  if (choice == "Museum") {
    polScore++;  
  }
  if (choice == "Escape Room") {
    truScore++;
  }

  // Question 9
  if (choice == "Light Hearted") {
    spoScore++; 
    entScore++;
  }
  if (choice == "Serious") {
    truScore++;
    polScore++;  
  }
  console.log(`truescore: ${truScore}`);
  console.log(`truescore: ${polScore}`);
  console.log(`spoScore: ${spoScore}`);
  console.log(`entScore: ${entScore}`);
}

function endquiz() {

  clearInterval(timeInterval);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("intrest");
  finalScoreEl.textContent = truScore;

    // hide questions section
    var questionsEl = document.getElementById("questions");
    questionsEl.setAttribute("class", "hide");

    timerEl.textContent = "Quiz Ended";    
}

function saveScore() {
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: timeLeft,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkKey(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

startBtn.addEventListener("click", function() {
  startQuiz();
});

submitBtn.addEventListener("click", function() {
  saveScore();
});

submitBtn.addEventListener("onkeyup", function() {
  checkKey();
});
