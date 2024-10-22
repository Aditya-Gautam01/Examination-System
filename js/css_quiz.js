const questions = [
    {
        question: "The full form of CSS is?",
        answers: [
            { text: "Cascading Style Sheets", correct: true},
            { text: "Coloured Special Sheets", correct: false},
            { text: "Colour and Style Sheets", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "How can we change the background color of an element?",
        answers: [
            { text: "color", correct: false},
            { text: "background-color", correct: true},
            { text: "Both A and B", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: " In how many ways can CSS be written in?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
        ]
    },

    {
        question: 'What type of CSS is the following code snippet?<br> &lt;h1 style="color:blue;"&gt;A Blue Heading&lt;/h1&gt',
        answers: [
            { text: "Inline", correct: true },
            { text: "Internal", correct: false },
            { text: "External", correct: false },
            { text: "None of these", correct: false },
        ]
    },
    {
        question: "What type of CSS is generally recommended for designing large web pages?",
        answers: [
            { text: "External", correct: true},
            { text: "Inline", correct: false},
            { text: "Internal", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used to declare internal CSS?",
        answers: [
            { text: "&lt;style&gt;", correct: true},
            { text: "&lt;link&gt;", correct: false},
            { text: "&lt;script&gt;", correct: false},
            { text: "None of these", correct: false},
        ] 
    },
    {
        question: "Can negative values be allowed in padding property?",
        answers: [
            { text: "Yes", correct: false},
            { text: "No", correct: true},
            { text: "Depends on property", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to select all h1 headers in a div element?",
        answers: [
            { text: "div h1", correct: true},
            { text: "div-h1", correct: false},
            { text: "h1", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "Which of the following are parts of the CSS box model?",
        answers: [
            { text: "Margins", correct: false},
            { text: "Borders", correct: false},
            { text: "Padding", correct: false},
            { text: "all of the above", correct: true},
        ]
    },
    {
        question: "How are custom fonts defined using CSS?",
        answers: [
            { text: "@font-face rule", correct: true },
            { text: "Custom fonts cannot be defined", correct: false },
            { text: "src tags", correct: false },
            { text: "None of these", correct: false },
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

function showScore(){
      resetState();
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
      let perc = (score/questions.length)*100;
      if(score>=8){
        questionElement.innerHTML += `Congratulations. <br>Score = ${perc}%`;
      }
      else if(score>=5){
        questionElement.innerHTML += `Good Work. <br>Score = ${perc}%`;
      }
      else{
        questionElement.innerHTML += `<br>You can do better. <br> Score = ${perc}% <br>Try Again`;
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