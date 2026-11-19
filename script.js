const questions = [
  {
    question: "1. 3,5,8,12,...",
    answer: [
      { text: "mamat", correct: false },
      { text: "16", correct: false },
      { text: "17", correct: true },
      { text: "19", correct: false },
    ]
  },

  {
    question: "5-7-10-12-15 seri selanjutnya...",
    answer: [
      { text: "17", correct: true },
      { text: "14", correct: false },
      { text: "15", correct: false },
      { text: "19", correct: false },
    ]
  },

  {
    question: "CEPAT = ....",
    answer: [
      { text: "Lambat", correct: true },
      { text: "Pelan", correct: false },
      { text: "Pantas", correct: false },
      { text: "Gesit", correct: false },
    ]
  },

  {
    question: "EJEK = ....",
    answer: [
      { text: "Akbar", correct: false },
      { text: "Kecil", correct: true },
      { text: "Pendek", correct: false },
      { text: "Kate", correct: false },
    ]
  },
];

const startBtn = document.querySelector('.start')
const navBar = document.querySelector('.navbar')
const app = document.querySelector('.app')
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("btn-next");


app.style.display ='none'
navBar.style.display ='none'

startBtn.addEventListener("click", () => {
  app.style.display = 'block'   
  navBar.style.display ='block'
  startBtn.style.display = 'none'
})





let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
   
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("inCorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore(){
  resetState()
   questionElement.innerHTML = `Your scored: ${score}/${questions.length}`;
   nextButton.innerHTML= "Play again";
   nextButton.style.display = "block";
}

function handlNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", () => {
   if (currentQuestionIndex < questions.length) {
    handlNextButton();
   }else{
    startQuiz();
   }
});

startQuiz();
