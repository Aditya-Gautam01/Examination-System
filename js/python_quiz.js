const questions = [
    {
        question: "Who developed Python Programming Language?",
        answers: [
            { text: "Wick van Rossum", correct: false},
            { text: "Rasmus Lerdorf", correct: false},
            { text: "Guido van Rossum", correct: true},
            { text: "Niene stom", correct: false},
        ]
    },
    {
        question: "Which type of Programming does Python support",
        answers: [
            { text: "object-oriented programming", correct: false},
            { text: "structured programming", correct: false},
            { text: "functional programming", correct: false},
            { text: "all of the above mentioned", correct: true},
        ]
    },
    {
        question: "Is Python case sensitive when dealing with identifiers?",
        answers: [
            { text: "No", correct: false},
            { text: "Machine dependent", correct: false},
            { text: "Yes", correct: true},
            { text: "None of the above mentioned", correct: false},
        ]
    },
    {
        question: "Which of the following is correct extension of the Python file?",
        answers: [
            { text: ".python", correct: false},
            { text: ".py", correct: true},
            { text: ".pl", correct: false},
            { text: ".p", correct: false},
        ]
    },
    {
        question: "Is Python code is compiled or interpreted?",
        answers: [
            { text: "Python code is both compiled or interpreted", correct: true},
            { text: "Python code is neither compiled nor interpreted", correct: false},
            { text: "Python code is only compiled", correct: false},
            { text: "Python code is only interpreted", correct: false},
        ]
    },
    {
        question: "All keywords in Python are in-",
        answers: [
            { text: "Capitalized", correct: false},
            { text: "lower case", correct: false},
            { text: "UPPER CASE", correct: false},
            { text: "None of the above mentioned", correct: true},
        ] 
    },
    {
        question: 'What will be the value of the following Python expression <br> 4 + 3 % 5',
        answers: [
            { text: "7", correct: true},
            { text: "2", correct: false},
            { text: "4", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "Which of the following is used to define a block of code in Python language?",
        answers: [
            { text: "Brackets", correct: false},
            { text: "Key", correct: false},
            { text: "Indentation", correct: true},
            { text: "All of the above mentioned", correct: false},
        ]
    },
    {
        question: "Which keyword is used for function in Python language",
        answers: [
            { text: "function", correct: false},
            { text: "def", correct: true},
            { text: "fun", correct: false},
            { text: "define", correct: false},
        ]
    },
    {
        question: 'What will be the output of the following Python code?<br><pre>num1 = 5\nnum2 = 10\nresult = num1 + num2\nprint(result)</pre>',
        answers: [
            { text: "15", correct: true },
            { text: "5", correct: false },
            { text: "10", correct: false },
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