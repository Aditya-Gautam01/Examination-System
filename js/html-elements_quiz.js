const questions = [
    {
        question: "Which tag is used to define a paragraph in HTML?",
        answers: [
            { text: "&lt;p&gt;", correct: true },
            { text: "&lt;div&gt;", correct: false },
            { text: "&lt;span&gt;", correct: false },
            { text: "&lt;section&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a line break in HTML?",
        answers: [
            { text: "&lt;br&gt;", correct: true },
            { text: "&lt;hr&gt;", correct: false },
            { text: "&lt;break&gt;", correct: false },
            { text: "&lt;div&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a hyperlink in HTML?",
        answers: [
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;href&gt;", correct: false },
            { text: "&lt;url&gt;", correct: false }
        ]
    },
    {
        question: "Which element is used to define an unordered list in HTML?",
        answers: [
            { text: "&lt;ul&gt;", correct: true },
            { text: "&lt;ol&gt;", correct: false },
            { text: "&lt;li&gt;", correct: false },
            { text: "&lt;list&gt;", correct: false }
        ]
    },
    {
        question: "Which element is used to define a list item in HTML?",
        answers: [
            { text: "&lt;li&gt;", correct: true },
            { text: "&lt;ul&gt;", correct: false },
            { text: "&lt;ol&gt;", correct: false },
            { text: "&lt;item&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a table in HTML?",
        answers: [
            { text: "&lt;table&gt;", correct: true },
            { text: "&lt;td&gt;", correct: false },
            { text: "&lt;tr&gt;", correct: false },
            { text: "&lt;thead&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a table row in HTML?",
        answers: [
            { text: "&lt;tr&gt;", correct: true },
            { text: "&lt;th&gt;", correct: false },
            { text: "&lt;td&gt;", correct: false },
            { text: "&lt;table&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define an image in HTML?",
        answers: [
            { text: "&lt;img&gt;", correct: true },
            { text: "&lt;picture&gt;", correct: false },
            { text: "&lt;image&gt;", correct: false },
            { text: "&lt;src&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define the header section of a document in HTML?",
        answers: [
            { text: "&lt;header&gt;", correct: true },
            { text: "&lt;head&gt;", correct: false },
            { text: "&lt;nav&gt;", correct: false },
            { text: "&lt;section&gt;", correct: false }
        ]
    },
    {
        question: "Which tag is used to define a block of text as a quotation in HTML?",
        answers: [
            { text: "&lt;blockquote&gt;", correct: true },
            { text: "&lt;q&gt;", correct: false },
            { text: "&lt;quote&gt;", correct: false },
            { text: "&lt;citation&gt;", correct: false }
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