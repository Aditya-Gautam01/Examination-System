const questions = [
    {
        question: "Which property is used to control the layout of items in a Flex container?",
        answers: [
            { text: "flex-direction", correct: true },
            { text: "display", correct: false },
            { text: "margin", correct: false },
            { text: "width", correct: false },
        ]
    },
    {
        question: "What is the default value of the display property in a div element?",
        answers: [
            { text: "block", correct: true },
            { text: "inline", correct: false },
            { text: "inline-block", correct: false },
            { text: "none", correct: false },
        ]
    },
    {
        question: "Which CSS property allows you to create a grid layout?",
        answers: [
            { text: "grid-template-columns", correct: true },
            { text: "grid-column", correct: false },
            { text: "display: grid", correct: false },
            { text: "align-items", correct: false },
        ]
    },
    {
        question: "In a CSS Grid layout, which property controls the spacing between grid items?",
        answers: [
            { text: "grid-gap", correct: true },
            { text: "gap", correct: false },
            { text: "grid-padding", correct: false },
            { text: "margin", correct: false },
        ]
    },
    {
        question: "Which of the following properties can be used to align items horizontally in Flexbox?",
        answers: [
            { text: "justify-content", correct: true },
            { text: "align-items", correct: false },
            { text: "flex-direction", correct: false },
            { text: "align-self", correct: false },
        ]
    },
    {
        question: "What does the position: absolute; property do in CSS?",
        answers: [
            { text: "Positions the element relative to its nearest positioned ancestor", correct: true },
            { text: "Positions the element relative to the page", correct: false },
            { text: "Positions the element in the center of the container", correct: false },
            { text: "Positions the element at the bottom of its parent", correct: false },
        ]
    },
    {
        question: "Which CSS property is used to control the flow of content in a multi-column layout?",
        answers: [
            { text: "column-count", correct: true },
            { text: "column-gap", correct: false },
            { text: "display: flex", correct: false },
            { text: "column-width", correct: false },
        ]
    },
    {
        question: "What is the default value of the position property in CSS?",
        answers: [
            { text: "static", correct: true },
            { text: "relative", correct: false },
            { text: "absolute", correct: false },
            { text: "fixed", correct: false },
        ]
    },
    {
        question: "Which property can be used to create equal-width columns in a CSS Grid layout?",
        answers: [
            { text: "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));", correct: true },
            { text: "grid-template-rows: 1fr;", correct: false },
            { text: "flex: 1;", correct: false },
            { text: "column-width: 200px;", correct: false },
        ]
    },
    {
        question: "In Flexbox, which property is used to make all flex items the same size?",
        answers: [
            { text: "flex: 1;", correct: true },
            { text: "flex-grow: 1;", correct: false },
            { text: "align-items: center;", correct: false },
            { text: "flex-wrap: wrap;", correct: false },
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
            window.location.href = 'css-flexbox_quiz.php';
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