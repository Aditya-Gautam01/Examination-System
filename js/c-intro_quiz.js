const questions = [
    {
        question: "What is the correct syntax to print a message in C?",
        answers: [
            { text: "echo('Hello World')", correct: false},
            { text: "print('Hello World')", correct: false},
            { text: "printf('Hello World')", correct: true},
            { text: "cout << 'Hello World';", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to define the main function in C?",
        answers: [
            { text: "main() {}", correct: false},
            { text: "void main() {}", correct: false},
            { text: "int main() {}", correct: true},
            { text: "void main { }", correct: false},
        ]
    },
    {
        question: "Which header file is needed to use the printf() function in C?",
        answers: [
            { text: "#include &lt;stdlib.h&gt;", correct: false},
            { text: "#include &lt;stdio.h&gt;", correct: true},
            { text: "#include &lt;string.h&gt", correct: false},
            { text: "#include &lt;math.h&gt;", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax for declaring an integer variable in C?",
        answers: [
            { text: "int 5 x;", correct: false},
            { text: "int x;", correct: true},
            { text: "integer x;", correct: false},
            { text: "x int;", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: int x = 5; printf('%d', x);?",
        answers: [
            { text: "5", correct: true},
            { text: "x", correct: false},
            { text: "Error", correct: false},
            { text: "undefined", correct: false},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable in C?",
        answers: [
            { text: "==", correct: false},
            { text: "=", correct: true},
            { text: "+=", correct: false},
            { text: "&&", correct: false},
        ]
    },
    {
        question: "What is the size of an integer variable in C (on most systems)?",
        answers: [
            { text: "1 byte", correct: false},
            { text: "2 bytes", correct: false},
            { text: "4 bytes", correct: true},
            { text: "8 bytes", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to comment a single line in C?",
        answers: [
            { text: "// This is a comment", correct: true},
            { text: "# This is a comment", correct: false},
            { text: "/* This is a comment */", correct: false},
            { text: "&lt;!-- This is a comment --&gt;", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct structure of a C program?",
        answers: [
            { text: "function main() { }", correct: false},
            { text: "int main() { }", correct: true},
            { text: "void main() { }", correct: false},
            { text: "int main[] { }", correct: false},
        ]
    },
    {
        question: "Which command is used to compile a C program in the terminal?",
        answers: [
            { text: "gcc program.c", correct: true},
            { text: "compile program.c", correct: false},
            { text: "make program.c", correct: false},
            { text: "run program.c", correct: false},
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
            window.location.href = 'c-operators_quiz.php';
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