const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "HighText Machine Language", correct: false},
            { text: "HighText and links Markup Language", correct: false},
            { text: "HyperText Markup Language", correct: true},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is -",
        answers: [
            { text: "Head,Title,HTML,body", correct: false},
            { text: "HTML,Body,Title,Head", correct: false},
            { text: "HTML,Head,Body,Title", correct: false},
            { text: "HTML,Head,Title,Body", correct: true},
        ]
    },
    {
        question: "Which of the following element is responsible for making the text bold in HTML?",
        answers: [
            { text: "&lt;pre&gt;", correct: false},
            { text: "&lt;a&gt;", correct: false},
            { text: "&lt;b&gt;", correct: true},
            { text: "&lt;br&gt;", correct: false},
        ]
    },
    {
        question: "Which of the following tag is used for inserting the largest heading in HTML?",
        answers: [
            { text: "&lt;h3&gt;", correct: false},
            { text: "&lt;h1&gt;", correct: true},
            { text: "&lt;h5&gt;", correct: false},
            { text: "&lt;h6&gt;", correct: false},
        ]
    },
    {
        question: "Which of the following tag is used to insert a line-break in HTML?",
        answers: [
            { text: "&lt;br&gt;", correct: true},
            { text: "&lt;a&gt;", correct: false},
            { text: "&lt;pre&gt;", correct: false},
            { text: "&lt;b&gt;", correct: false},
        ]
    },
    {
        question: "How to create an unordered list(a list with the list items in bullets) in HTML?",
        answers: [
            { text: "&lt;ul&gt;", correct: true},
            { text: "&lt;ol&gt;", correct: false},
            { text: "&lt;li&gt;", correct: false},
            { text: "&lt;i&gt;", correct: false},
        ] 
    },
    {
        question: "Which of the following element is responsible for making the text italic in HTML?",
        answers: [
            { text: "&lt;i&gt;", correct: true},
            { text: "&lt;italic&gt;", correct: false},
            { text: "&lt;it&gt;", correct: false},
            { text: "&lt;pre&gt;", correct: false},
        ]
    },
    {
        question: "The &lt;hr&gt; tag in HTML is used for -",
        answers: [
            { text: "new line", correct: false},
            { text: "vertical ruler", correct: false},
            { text: "new paragraph", correct: false},
            { text: "horizontal ruler", correct: true},
        ]
    },
    {
        question: "&lt;input&gt; is-",
        answers: [
            { text: "a format tag", correct: false},
            { text: "an empty tag", correct: true},
            { text: "All of the above", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which tag is used for creating a hyperlink?",
        answers: [
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;href&gt;", correct: false },
            { text: "&lt;url&gt;", correct: false },
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
      questionElement.innerHTML =` You scored ${score} out of ${questions.length}!<br>`;
      let perc = score*10;
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