/**
 * Schools Page Script
 * Handles school program form submission
 */

/**
 * Form validation and submission
 */
function initializeSchoolForm() {
    const form = document.getElementById('schoolForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const schoolName = document.getElementById('schoolName').value;
        const location = document.getElementById('schoolLocation').value;
        const students = document.getElementById('schoolStudents').value;
        const activityType = document.getElementById('activityType').value;

        // Validation
        if (!schoolName || !location || !students || !activityType) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (students < 10) {
            showMessage('We work with schools of at least 10 students', 'error');
            return;
        }

        // Simulate form submission
        console.log('📝 School Session Request:', {
            schoolName,
            location,
            students,
            activityType,
            timestamp: new Date().toLocaleString()
        });

        // Reset form and show success
        form.reset();
        showMessage('✅ Thank you! We\'ll contact you within 2-3 business days to arrange the session.', 'success');
    });
}

/**
 * Show form message
 */
function showMessage(message, type) {
    const messageEl = document.getElementById('schoolMessage');
    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.style.color = type === 'success' ? '#4CAF50' : '#FF6B6B';

    setTimeout(() => {
        messageEl.textContent = '';
    }, 5000);
}

/**
 * Initialize Schools page
 */
function initializeSchoolsPage() {
    console.log('🏫 Initializing Schools Page...');

    initializeSchoolForm();

    console.log('✅ Schools Page Initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSchoolsPage);
} else {
    initializeSchoolsPage();
}
