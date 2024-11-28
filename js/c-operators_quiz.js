const questions = [
    {
        question: "Which operator is used to add two numbers in C?",
        answers: [
            { text: "&&", correct: false},
            { text: "+", correct: true},
            { text: "=", correct: false},
            { text: "*", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: int x = 5, y = 3; printf('%d', x / y);?",
        answers: [
            { text: "1", correct: true},
            { text: "1.6667", correct: false},
            { text: "15", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "Which operator is used for logical AND in C?",
        answers: [
            { text: "&", correct: false},
            { text: "&&", correct: true},
            { text: "|", correct: false},
            { text: "||", correct: false},
        ]
    },
    {
        question: "What is the result of the following expression: 5 % 2?",
        answers: [
            { text: "2", correct: false},
            { text: "1", correct: true},
            { text: "3", correct: false},
            { text: "0", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct operator for 'not equal to' in C?",
        answers: [
            { text: "!=" , correct: true},
            { text: "&lt;&gt;", correct: false},
            { text: "==", correct: false},
            { text: "&gt;&lt;", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: int x = 5; printf('%d', ++x);?",
        answers: [
            { text: "5", correct: false},
            { text: "6", correct: true},
            { text: "4", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct operator for logical OR in C?",
        answers: [
            { text: "&", correct: false},
            { text: "||", correct: true},
            { text: "|", correct: false},
            { text: "&&", correct: false},
        ]
    },
    {
        question: "What does the bitwise AND operator (&) do in C?",
        answers: [
            { text: "Performs logical AND", correct: false},
            { text: "Performs bit-by-bit AND operation", correct: true},
            { text: "Performs logical OR", correct: false},
            { text: "Performs bit-by-bit OR operation", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for using the conditional (ternary) operator in C?",
        answers: [
            { text: "condition ? expr1 : expr2", correct: true},
            { text: "condition expr1 : expr2", correct: false},
            { text: "condition ? (expr1, expr2)", correct: false},
            { text: "expr1 ? condition : expr2", correct: false},
        ]
    },
    {
        question: "What does the increment operator (++) do in C?",
        answers: [
            { text: "Increases the value of a variable by 2", correct: false},
            { text: "Increases the value of a variable by 1", correct: true},
            { text: "Decreases the value of a variable by 1", correct: false},
            { text: "Multiplies the value of a variable by 2", correct: false},
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
            window.location.href = 'c-structures_quiz.php';
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