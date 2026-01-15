/**
 * Learn Page Script
 * Handles charts and quiz functionality
 */

let currentQuestion = 0;
let score = 0;
let globalUsageChart = null;
let stressChart = null;

// Hook section scroll functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollButtons = document.querySelectorAll('.scroll-to-section');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initialize page elements
    initializeGlobalUsageChart();
    initializeStressChart();
    setupQuiz();
    setupMap();
    animateStats();
});

const quizData = [
    {
        question: 'What percentage of Earth\'s water is freshwater?',
        options: ['3%', '10%', '25%', '50%'],
        correct: 0
    },
    {
        question: 'How much water does Egypt get from the Nile River?',
        options: ['50%', '75%', '90%', '100%'],
        correct: 2
    },
    {
        question: 'How many people lack access to safe drinking water?',
        options: ['100 million', '500 million', '1 billion', '2 billion'],
        correct: 3
    },
    {
        question: 'What is the recommended shower duration to save water?',
        options: ['10 minutes', '5 minutes', '15 minutes', '2 minutes'],
        correct: 1
    },
    {
        question: 'How much water can a leaking faucet waste per year?',
        options: ['500 gallons', '3,000 gallons', '10,000 gallons', '50,000 gallons'],
        correct: 1
    }
];

/**
 * Initialize global water usage chart
 */
function initializeGlobalUsageChart() {
    const ctx = document.getElementById('globalUsageChart');
    if (!ctx) return;

    globalUsageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Agriculture', 'Industry', 'Domestic'],
            datasets: [{
                data: [70, 19, 11],
                backgroundColor: ['#95E1D3', '#4ECDC4', '#44A08D'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 12, family: "'Poppins', sans-serif" },
                        padding: 15
                    }
                }
            }
        }
    });
}

/**
 * Initialize water stress index chart
 */
function initializeStressChart() {
    const ctx = document.getElementById('stressChart');
    if (!ctx) return;

    stressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Middle East & N. Africa', 'South Asia', 'East Asia', 'Sub-Saharan Africa', 'Europe'],
            datasets: [{
                label: 'Water Stress (%)',
                data: [55, 38, 28, 22, 15],
                backgroundColor: '#FF6B6B',
                borderColor: '#DD0000',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: true,
                    labels: { font: { family: "'Poppins', sans-serif" } }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { font: { family: "'Poppins', sans-serif" } }
                },
                y: {
                    ticks: { font: { family: "'Poppins', sans-serif" } }
                }
            }
        }
    });
}

/**
 * Initialize quiz functionality
 */
function initializeQuiz() {
    const quizCard = document.getElementById('quizCard');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    const optionC = document.getElementById('optionC');
    const optionD = document.getElementById('optionD');
    const nextQuestion = document.getElementById('nextQuestion');
    const getReward = document.getElementById('getReward');
    const quizProgress = document.getElementById('quizProgress');

    if (!quizCard) return;

    function displayQuestion() {
        if (currentQuestion >= quizData.length) {
            showQuizComplete();
            return;
        }

        const question = quizData[currentQuestion];
        quizCard.innerHTML = `
            <h4>Question ${currentQuestion + 1} of ${quizData.length}</h4>
            <p>${question.question}</p>
        `;

        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        quizProgress.style.width = progress + '%';

        optionA.textContent = question.options[0];
        optionB.textContent = question.options[1];
        optionC.textContent = question.options[2];
        optionD.textContent = question.options[3];

        [optionA, optionB, optionC, optionD].forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.style.pointerEvents = 'auto';
        });

        optionA.onclick = () => checkAnswer(0);
        optionB.onclick = () => checkAnswer(1);
        optionC.onclick = () => checkAnswer(2);
        optionD.onclick = () => checkAnswer(3);

        nextQuestion.style.display = 'none';
        getReward.style.display = 'none';
    }

    function checkAnswer(selected) {
        const question = quizData[currentQuestion];
        const options = [optionA, optionB, optionC, optionD];

        options.forEach(btn => btn.style.pointerEvents = 'none');

        if (selected === question.correct) {
            options[selected].classList.add('correct');
            score++;

            if (window.gsap) {
                gsap.to(options[selected], { scale: 1.05, duration: 0.3 });
            }
        } else {
            options[selected].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }

        currentQuestion++;

        if (currentQuestion >= quizData.length) {
            getReward.style.display = 'block';
            getReward.textContent = `Get Certificate (${score}/${quizData.length})`;
        } else {
            nextQuestion.style.display = 'block';
        }
    }

    function showQuizComplete() {
        const percentage = (score / quizData.length) * 100;
        let message = '';

        if (percentage === 100) message = 'Perfect! You\'re a Water Expert! 🌟';
        else if (percentage >= 80) message = 'Excellent! You know a lot about water! 👏';
        else if (percentage >= 60) message = 'Good job! Keep learning 📚';
        else message = 'Keep practicing! Water conservation is important 💧';

        quizCard.innerHTML = `
            <h4>Quiz Complete! 🎉</h4>
            <p>You scored <strong>${score} out of ${quizData.length}</strong></p>
            <p>${message}</p>
        `;

        if (window.gsap) {
            gsap.from(quizCard, { scale: 0.8, opacity: 0, duration: 0.5, ease: 'elastic.out' });
        }
    }

    nextQuestion.addEventListener('click', displayQuestion);
    getReward.addEventListener('click', () => {
        const doc = new window.html2pdf.HTML2PDF();
        const certificateHTML = `
            <div style="text-align: center; padding: 40px; font-family: Arial;">
                <h1 style="color: #1E90FF; margin-bottom: 20px;">🏆 Certificate of Achievement</h1>
                <p style="font-size: 18px; margin: 20px 0;">This is to certify that</p>
                <h2 style="color: #00BFFF; margin: 20px 0;">Water Guardian</h2>
                <p style="font-size: 16px; margin: 20px 0;">Has successfully completed the Blue Future Water Knowledge Quiz</p>
                <p style="font-size: 14px; margin: 20px 0;">Score: ${score} out of ${quizData.length}</p>
                <p style="font-size: 12px; color: #666; margin-top: 40px;">${new Date().toLocaleDateString()}</p>
                <p style="margin-top: 30px;">🌊 Keep protecting our water! 🌊</p>
            </div>
        `;
        doc.setOptions({ margin: 10 });
        doc.html(certificateHTML);
        doc.save('NileGuard_Certificate.pdf');
    });

    displayQuestion();
}

/**
 * Initialize Learn page
 */
function initializeLearnPage() {
    console.log('📚 Initializing Learn Page...');

    initializeGlobalUsageChart();
    initializeStressChart();
    initializeQuiz();

    console.log('✅ Learn Page Initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLearnPage);
} else {
    initializeLearnPage();
}
