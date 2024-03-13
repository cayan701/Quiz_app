const questions = [
    {
        question: "Something",
        answers: [
            { text: "Shark", correct: false },
            { text: "Shark", correct: true },
            { text: "Shark", correct: false },
            { text: "Shark", correct: false },
        ]
    },
    {
        question: "hey",
        answers: [
            { text: "Shark", correct: false },
            { text: "Shark", correct: true },
            { text: "Shark", correct: false },
            { text: "Shark", correct: false },
        ]
    },
    {
        question: "why",
        answers: [
            { text: "Shark", correct: false },
            { text: "Shark", correct: true },
            { text: "Shark", correct: false },
            { text: "Shark", correct: false },
        ]
    },
    {
        question: "how",
        answers: [
            { text: "Shark", correct: false },
            { text: "Shark", correct: true },
            { text: "Shark", correct: false },
            { text: "Shark", correct: false },
        ]
    },
    {
        question: "what",
        answers: [
            { text: "Shark", correct: false },
            { text: "Shark", correct: true },
            { text: "Shark", correct: false },
            { text: "Shark", correct: false },
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;  

    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestion + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', (e) => {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            if(isCorrect) {
                selectedBtn.classList.add('correct');
                score++;
            } else {
                selectedBtn.classList.add('incorrect');
            }

            Array.from(answerButton.children).forEach((button) => {
                if(button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
                button.disabled = true;
            })

            nextButton.style.display = 'block';
        })
    })
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function displayScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        displayScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startGame();
    }

})

startGame();