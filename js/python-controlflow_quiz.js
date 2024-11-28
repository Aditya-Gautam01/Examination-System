const questions = [
    {
        question: "Which of the following is the correct syntax for an if statement in Python?",
        answers: [
            { text: "if x > 5 then:", correct: false},
            { text: "if x > 5:", correct: true},
            { text: "if (x > 5):", correct: false},
            { text: "if x > 5 then {}:", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = 10; if x > 5: print('Greater') else: print('Smaller')?",
        answers: [
            { text: "Greater", correct: true},
            { text: "Smaller", correct: false},
            { text: "Error", correct: false},
            { text: "None", correct: false},
        ]
    },
    {
        question: "Which Python keyword is used to skip the current iteration of a loop?",
        answers: [
            { text: "continue", correct: true},
            { text: "break", correct: false},
            { text: "pass", correct: false},
            { text: "exit", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: for i in range(3): print(i)?",
        answers: [
            { text: "0 1 2", correct: true},
            { text: "1 2 3", correct: false},
            { text: "0 1", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for a while loop in Python?",
        answers: [
            { text: "while x > 5:", correct: true},
            { text: "while (x > 5):", correct: false},
            { text: "while x > 5 do:", correct: false},
            { text: "while x > 5 then:", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = 5; while x < 8: print(x); x += 1?",
        answers: [
            { text: "5 6 7", correct: true},
            { text: "5 6 7 8", correct: false},
            { text: "5", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "Which of the following statements is used to stop the execution of a loop in Python?",
        answers: [
            { text: "break", correct: true},
            { text: "stop", correct: false},
            { text: "exit", correct: false},
            { text: "halt", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = 5; if x < 10: print('Yes') else: print('No')?",
        answers: [
            { text: "Yes", correct: true},
            { text: "No", correct: false},
            { text: "Error", correct: false},
            { text: "None", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to use an else statement with a loop in Python?",
        answers: [
            { text: "for i in range(5): print(i) else: print('Done')", correct: true},
            { text: "for i in range(5): print(i); else print('Done')", correct: false},
            { text: "for i in range(5): print(i) end else: print('Done')", correct: false},
            { text: "for i in range(5): print(i) else print('Done')", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = 0; while x < 3: print(x); x += 2?",
        answers: [
            { text: "0 2", correct: true},
            { text: "0 1 2", correct: false},
            { text: "0", correct: false},
            { text: "Error", correct: false},
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
            window.location.href = 'python-ds_quiz.php';
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