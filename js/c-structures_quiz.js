const questions = [
    {
        question: "Which of the following is the correct syntax for an if statement in C?",
        answers: [
            { text: "if x &gt; 10 { }", correct: false},
            { text: "if (x &gt; 10) { }", correct: true},
            { text: "if x &gt; 10 then { }", correct: false},
            { text: "if (x &gt; 10): { }", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: int x = 10; if (x > 5) printf('Hello'); else printf('World');?",
        answers: [
            { text: "World", correct: false},
            { text: "Hello", correct: true},
            { text: "Error", correct: false},
            { text: "Nothing", correct: false},
        ]
    },
    {
        question: "Which loop is guaranteed to execute at least once in C?",
        answers: [
            { text: "for loop", correct: false},
            { text: "while loop", correct: false},
            { text: "do-while loop", correct: true},
            { text: "none of the above", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for a for loop in C?",
        answers: [
            { text: "for (int i = 0; i &lt; 10; i++) { }", correct: true},
            { text: "for (int i = 0 i &lt; 10 i++) { }", correct: false},
            { text: "for (i = 0; i &lt; 10) { }", correct: false},
            { text: "for (i; i &lt; 10; i++) { }", correct: false},
        ]
    },
    {
        question: "What does the break statement do in C?",
        answers: [
            { text: "Exits the current loop or switch statement", correct: true},
            { text: "Skips the current iteration of the loop", correct: false},
            { text: "Exits the program", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for a switch statement in C?",
        answers: [
            { text: "switch (x) { case 1: break; default: break; }", correct: true},
            { text: "switch x { case 1: break; default: break; }", correct: false},
            { text: "switch { x case 1: break; default: break; }", correct: false},
            { text: "switch (x) case 1: break; default: break;", correct: false},
        ]
    },
    {
        question: "What will the following code output: int x = 5; if (x < 10) printf('True'); else printf('False');?",
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
            { text: "Error", correct: false},
            { text: "Nothing", correct: false},
        ]
    },
    {
        question: "Which of the following statements is true about the continue statement in C?",
        answers: [
            { text: "It breaks out of the loop", correct: false},
            { text: "It skips the remaining code in the current iteration and continues to the next iteration", correct: true},
            { text: "It exits the entire program", correct: false},
            { text: "It halts the program execution", correct: false},
        ]
    },
    {
        question: "What is the correct way to write an if-else statement that checks if a number is positive or negative in C?",
        answers: [
            { text: "if (x &gt; 0) printf('Positive'); else printf('Negative');", correct: true},
            { text: "if x &gt; 0: printf('Positive'); else: printf('Negative');", correct: false},
            { text: "if x &gt; 0 printf('Positive') else printf('Negative');", correct: false},
            { text: "if (x &lt; 0) printf('Positive') else printf('Negative');", correct: false},
        ]
    },
    {
        question: "Which of the following keywords can be used with the switch statement to handle multiple cases for a single block?",
        answers: [
            { text: "break", correct: false},
            { text: "continue", correct: false},
            { text: "case", correct: true},
            { text: "goto", correct: false},
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