const questions = [
    {
        question: "What is the correct way to declare a variable in Python?",
        answers: [
            { text: "let x = 10", correct: false},
            { text: "var x = 10", correct: false},
            { text: "x = 10", correct: true},
            { text: "int x = 10", correct: false},
        ]
    },
    {
        question: "Which of the following is a valid Python comment?",
        answers: [
            { text: "# This is a comment", correct: true},
            { text: "// This is a comment", correct: false},
            { text: "/* This is a comment */", correct: false},
            { text: "comment This is a comment", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: print(2 * 3)?",
        answers: [
            { text: "5", correct: false},
            { text: "6", correct: true},
            { text: "23", correct: false},
            { text: "TypeError", correct: false},
        ]
    },
    {
        question: "Which of the following is used for defining a function in Python?",
        answers: [
            { text: "function myFunction()", correct: false},
            { text: "def myFunction()", correct: true},
            { text: "func myFunction()", correct: false},
            { text: "method myFunction()", correct: false},
        ]
    },
    {
        question: "How do you create a list in Python?",
        answers: [
            { text: "list = ()", correct: false},
            { text: "list = []", correct: true},
            { text: "list = {}", correct: false},
            { text: "list = < > ", correct: false},
        ]
    },
    {
        question: "Which operator is used for exponentiation in Python?",
        answers: [
            { text: "", correct: true},
            { text: "^^", correct: false},
            { text: "^^^", correct: false},
            { text: "exp", correct: false},
        ]
    },
    {
        question: "What is the correct way to define a string variable in Python?",
        answers: [
            { text: "string = 'Hello World'", correct: true},
            { text: "string = Hello World", correct: false},
            { text: "string = (Hello World)", correct: false},
            { text: "string = <Hello World>", correct: false},
        ]
    },
    {
        question: "How do you write a multi-line comment in Python?",
        answers: [
            { text: "# This is a comment", correct: false},
            { text: '"""This is a multi-line comment"""', correct: true},
            { text: "/* This is a multi-line comment */", correct: false},
            { text: "// This is a multi-line comment", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for an if-else statement in Python?",
        answers: [
            { text: "if x > 5 then: ... else: ...", correct: false},
            { text: "if x > 5: ... else ...", correct: false},
            { text: "if x > 5 { ... } else { ... }", correct: false},
            { text: "if x > 5: ... else: ...", correct: true},
        ]
    },
    {
        question: "Which of the following is used to import a module in Python?",
        answers: [
            { text: "import math", correct: true},
            { text: "#import math", correct: false},
            { text: "module math", correct: false},
            { text: "use math", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    hideNextQuizButton();
}

function hideNextQuizButton() {
    const nextQuizBtn = document.getElementById("next-quiz-btn");
    if (nextQuizBtn) {
        nextQuizBtn.style.display = "none"; 
    }
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore()
{
      resetState();
      questionElement.innerHTML =` You scored ${score} out of ${questions.length}!<br>`;
      let perc = score*10;
      if(score>=8){
        questionElement.innerHTML += `Congratulations. <br>Score = ${perc}%`;
      }
      else if(score>=5){
        questionElement.innerHTML +=` Good Work. <br>Score = ${perc}%`;
      }
      else{
        questionElement.innerHTML +=` <br>You can do better. <br> Score = ${perc}% <br>Try Again`;
      }
      nextButton.innerHTML = "Attempt Again";
      nextButton.style.display = "block";
      createNextQuizButton();
}
function createNextQuizButton() {
    let nextQuizBtn = document.getElementById("next-quiz-btn");
    
    if (!nextQuizBtn) {
        nextQuizBtn = document.createElement("button");
        nextQuizBtn.id = "next-quiz-btn";
        nextQuizBtn.innerHTML = "Attempt Next Quiz";
        nextQuizBtn.onclick = () => {
            window.location.href = 'python-controlflow_quiz.php';
        };
        document.querySelector(".quiz-container").appendChild(nextQuizBtn); 
    }

    nextQuizBtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();