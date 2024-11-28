const questions = [
    {
        question: "Which tag is used to define an HTML form?",
        answers: [
            { text: "&lt;form&gt;", correct: true},
            { text: "&lt;input&gt;", correct: false},
            { text: "&lt;button&gt;", correct: false},
            { text: "&lt;fieldset&gt;", correct: false},
        ]
    },
    {
        question: "Which attribute is used to specify where to send the form data when the form is submitted",
        answers: [
            { text: "method", correct: false},
            { text: "target", correct: false},
            { text: "enctype", correct: false},
            { text: "action", correct: true},
        ]
    },
    {
        question: "What is the default method used to send form data?",
        answers: [
            { text: "POST", correct: false},
            { text: "PUT", correct: false},
            { text: "GET", correct: true},
            { text: "PATCH", correct: false},
        ]
    },
    {
        question: "Which attribute is used to define a form control's name in an HTML form?",
        answers: [
            { text: "id", correct: false },
            { text: "name", correct: true },
            { text: "value", correct: false },
            { text: "type", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a checkbox in an HTML form?",
        answers: [
            { text: "&lt;input type='checkbox'&gt;", correct: true },
            { text: "&lt;checkbox&gt;", correct: false },
            { text: "&lt;form type='checkbox'&gt;", correct: false },
            { text: "&lt;input type='radio'&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to create a dropdown list in an HTML form?",
        answers: [
            { text: "&lt;select&gt;", correct: true},
            { text: "&lt;input&gt;", correct: false},
            { text: "&lt;dropdown&gt;", correct: false},
            { text: "&lt;option&gt;", correct: false},
        ] 
    },
    {
        question: "What is the purpose of the &lt;textarea&gt tag in HTML forms?",
        answers: [
            { text: "To define a large text input area", correct: true },
            { text: "To define a single-line text input", correct: false },
            { text: "To define a button", correct: false },
            { text: "To create a checkbox", correct: false },
        ]
    },
    {
        question: "Which attribute is used to specify the action to be performed when a form is submitted?",
        answers: [
            { text: "action", correct: true },
            { text: "method", correct: false },
            { text: "type", correct: false },
            { text: "enctype", correct: false },
        ]
    },
    {
        question: "Which input type is used to create a password field in HTML?",
        answers: [
            { text: "&lt;input type='text'&gt;", correct: false },
            { text: "&lt;input type='password'&gt;", correct: true },
            { text: "&lt;input type='passwordField'&gt;", correct: false },
            { text: "&lt;input type='hidden'&gt;", correct: false },
        ]
    },
    {
        question: "Which attribute is used to make a form field required in HTML?",
        answers: [
            { text: "required", correct: true },
            { text: "mandatory", correct: false },
            { text: "obligatory", correct: false },
            { text: "valid", correct: false },
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
            window.location.href = 'html-elements_quiz.php';
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