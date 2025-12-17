/**
 * Community Page Script
 * Handles ambassador form and displays current ambassadors
 */

// Placeholder ambassadors data
const ambassadorsData = [
    { name: 'Fatima Ahmed', age: 16, country: 'Egypt', motivation: 'Passionate about protecting the Nile', avatar: '👩‍🦰' },
    { name: 'Omar Hassan', age: 17, country: 'Egypt', motivation: 'Water champion in my school', avatar: '👨‍🦱' },
    { name: 'Leila Mansour', age: 15, country: 'Egypt', motivation: 'Inspired by nature conservation', avatar: '👩‍🦳' },
    { name: 'Karim Ibrahim', age: 18, country: 'Sudan', motivation: 'Fighting water scarcity in Africa', avatar: '👨‍🦲' },
    { name: 'Noor Samir', age: 16, country: 'Egypt', motivation: 'Youth for sustainable water', avatar: '👩‍🦰' },
    { name: 'Ahmed Saleh', age: 17, country: 'Egypt', motivation: 'Environmental activist', avatar: '👨‍🦳' }
];

/**
 * Form validation and submission
 */
function initializeAmbassadorForm() {
    const form = document.getElementById('ambassadorForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('ambasName').value;
        const age = document.getElementById('ambasAge').value;
        const country = document.getElementById('ambasCountry').value;
        const motivation = document.getElementById('ambasMotive').value;

        // Validation
        if (!name || !age || !country || !motivation) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (age < 13) {
            showMessage('You must be at least 13 years old', 'error');
            return;
        }

        // Add to ambassadors list
        const newAmbassador = {
            name,
            age,
            country,
            motivation,
            avatar: ['👩', '👨'][Math.floor(Math.random() * 2)]
        };

        ambassadorsData.push(newAmbassador);
        displayAmbassadors();

        // Reset form and show success
        form.reset();
        showMessage('🎉 Welcome to the team! Check the ambassadors list below.', 'success');
    });
}

/**
 * Display current ambassadors
 */
function displayAmbassadors() {
    const container = document.getElementById('ambassadorsList');
    if (!container) return;

    container.innerHTML = ambassadorsData.map((amb, index) => `
        <div class="ambassador-card" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.1}s;">
            <div class="ambassador-avatar">${amb.avatar}</div>
            <div class="ambassador-name">${amb.name}</div>
            <div class="ambassador-role">${amb.country} • Age ${amb.age}</div>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 1rem;">"${amb.motivation}"</p>
        </div>
    `).join('');
}

/**
 * Show form message
 */
function showMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.style.color = type === 'success' ? '#4CAF50' : '#FF6B6B';

    setTimeout(() => {
        messageEl.textContent = '';
    }, 5000);
}

/**
 * Initialize Community page
 */
function initializeCommunityPage() {
    console.log('🤝 Initializing Community Page...');

    initializeAmbassadorForm();
    displayAmbassadors();

    console.log('✅ Community Page Initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommunityPage);
} else {
    initializeCommunityPage();
}
