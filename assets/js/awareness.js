/**
 * Awareness Page Script
 */

let currentQuestion = 0;
let score = 0;

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

    const questions = window.dummyData.quizQuestions;

    function displayQuestion() {
        if (currentQuestion >= questions.length) {
            showQuizComplete();
            return;
        }

        const question = questions[currentQuestion];
        quizCard.innerHTML = `
            <h4>Question ${currentQuestion + 1} of ${questions.length}</h4>
            <p>${question.question}</p>
        `;

        const progress = ((currentQuestion + 1) / questions.length) * 100;
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
        const question = questions[currentQuestion];
        const options = [optionA, optionB, optionC, optionD];

        options.forEach(btn => btn.style.pointerEvents = 'none');

        if (selected === question.correct) {
            options[selected].classList.add('correct');
            score++;

            gsap.to(options[selected], {
                scale: 1.05,
                duration: 0.3
            });
        } else {
            options[selected].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }

        currentQuestion++;

        if (currentQuestion >= questions.length) {
            getReward.style.display = 'block';
            getReward.textContent = `Get Certificate (${score}/${questions.length})`;
        } else {
            nextQuestion.style.display = 'block';
        }
    }

    function showQuizComplete() {
        quizCard.innerHTML = `
            <h4>Quiz Complete! 🎉</h4>
            <p>You scored <strong>${score} out of ${questions.length}</strong></p>
            <p>${getResultMessage()}</p>
        `;

        gsap.from(quizCard, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: 'elastic.out'
        });
    }

    function getResultMessage() {
        const percentage = (score / questions.length) * 100;

        if (percentage === 100) return 'Perfect! You\'re a Water Expert! 🌟';
        if (percentage >= 80) return 'Excellent! You know a lot about water! 👏';
        if (percentage >= 60) return 'Good job! Keep learning about water conservation 📚';
        return 'Keep practicing! Water conservation is important 💧';
    }

    nextQuestion.addEventListener('click', displayQuestion);
    getReward.addEventListener('click', generateCertificate);

    displayQuestion();
}

function generateCertificate() {
    const doc = new window.html2pdf.HTML2PDF();

    const certificateHTML = `
        <div style="text-align: center; padding: 40px; font-family: Arial;">
            <h1 style="color: #1E90FF; margin-bottom: 20px;">🏆 Certificate of Achievement</h1>
            <p style="font-size: 18px; margin: 20px 0;">This is to certify that</p>
            <h2 style="color: #00BFFF; margin: 20px 0;">Water Guardian</h2>
            <p style="font-size: 16px; margin: 20px 0;">Has successfully completed the NileGuard Water Knowledge Quiz</p>
            <p style="font-size: 14px; margin: 20px 0;">Score: ${score} out of ${window.dummyData.quizQuestions.length}</p>
            <p style="font-size: 12px; color: #666; margin-top: 40px;">${new Date().toLocaleDateString()}</p>
            <p style="margin-top: 30px;">🌊 Keep protecting our water! 🌊</p>
        </div>
    `;

    doc.setOptions({ margin: 10 });
    doc.html(certificateHTML);
    doc.save('NileGuard_Certificate.pdf');

    console.log('✅ Certificate generated');
}

function initializeWaterCycleAnimation() {
    gsap.timeline({ repeat: -1 })
        .to('.evaporation-arrows', { opacity: 1, duration: 2 })
        .to('.evaporation-arrows', { opacity: 0.3, duration: 2 });

    gsap.timeline({ repeat: -1 })
        .to('.cloud-1', { x: 20, duration: 4, ease: 'sine.inOut' })
        .to('.cloud-1', { x: 0, duration: 4, ease: 'sine.inOut' });

    gsap.timeline({ repeat: -1, delay: 0.5 })
        .to('.cloud-2', { x: -15, duration: 4, ease: 'sine.inOut' })
        .to('.cloud-2', { x: 0, duration: 4, ease: 'sine.inOut' });

    console.log('✅ Water cycle animation initialized');
}

function initializeTipCardsAnimations() {
    gsap.utils.toArray('.tip-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out'
        });
    });
}

function initializeAwarenessPage() {
    console.log('📚 Initializing Awareness Page...');

    initializeQuiz();
    initializeWaterCycleAnimation();
    initializeTipCardsAnimations();

    console.log('✅ Awareness Page Initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAwarenessPage);
} else {
    initializeAwarenessPage();
}
