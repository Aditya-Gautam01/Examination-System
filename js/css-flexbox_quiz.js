if (!localStorage.getItem('htmlTotalScore')) {
    localStorage.setItem('htmlTotalScore', '0');
}
const questions = [
    {
        question: "Which property is used to define the direction of items in a Flex container?",
        answers: [
            { text: "flex-direction", correct: true },
            { text: "justify-content", correct: false },
            { text: "align-items", correct: false },
            { text: "flex-wrap", correct: false },
        ]
    },
    {
        question: "Which value of the flex-direction property arranges items horizontally from left to right?",
        answers: [
            { text: "row", correct: true },
            { text: "column", correct: false },
            { text: "row-reverse", correct: false },
            { text: "column-reverse", correct: false },
        ]
    },
    {
        question: "How can you center all the items inside a Flex container both vertically and horizontally?",
        answers: [
            { text: "justify-content: center; align-items: center;", correct: true },
            { text: "justify-items: center; align-content: center;", correct: false },
            { text: "align-items: center; flex-direction: row;", correct: false },
            { text: "justify-content: center; align-self: center;", correct: false },
        ]
    },
    {
        question: "Which property is used to align items vertically within a Flex container?",
        answers: [
            { text: "align-items", correct: true },
            { text: "align-content", correct: false },
            { text: "justify-items", correct: false },
            { text: "flex-wrap", correct: false },
        ]
    },
    {
        question: "What does the flex-wrap property do in Flexbox?",
        answers: [
            { text: "It controls whether the flex container is a single line or multiple lines", correct: true },
            { text: "It defines the direction of the flex items", correct: false },
            { text: "It defines how items will be aligned inside the container", correct: false },
            { text: "It sets how items will grow or shrink", correct: false },
        ]
    },
    {
        question: "What is the default value of the flex-wrap property in a Flex container?",
        answers: [
            { text: "nowrap", correct: true },
            { text: "wrap", correct: false },
            { text: "wrap-reverse", correct: false },
            { text: "auto", correct: false },
        ]
    },
    {
        question: "Which property is used to control how much space a flex item should take up inside its container?",
        answers: [
            { text: "flex-grow", correct: true },
            { text: "flex-shrink", correct: false },
            { text: "align-self", correct: false },
            { text: "flex-basis", correct: false },
        ]
    },
    {
        question: "What is the purpose of the flex-basis property?",
        answers: [
            { text: "It defines the initial size of a flex item before any space distribution", correct: true },
            { text: "It defines the maximum size a flex item can grow", correct: false },
            { text: "It sets the minimum space an item will shrink", correct: false },
            { text: "It defines the space between flex items", correct: false },
        ]
    },
    {
        question: "What does the justify-content property do in Flexbox?",
        answers: [
            { text: "It aligns flex items along the main axis", correct: true },
            { text: "It aligns flex items along the cross axis", correct: false },
            { text: "It sets the space between flex items", correct: false },
            { text: "It sets how much space items will grow", correct: false },
        ]
    },
    {
        question: "Which value of the align-items property will vertically align items to the top of the container?",
        answers: [
            { text: "flex-start", correct: true },
            { text: "center", correct: false },
            { text: "flex-end", correct: false },
            { text: "baseline", correct: false },
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