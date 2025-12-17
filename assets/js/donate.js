/**
 * Donation Page Script
 * ====================
 * Handles donation form logic, amount calculations, and payment processing
 */

let selectedAmount = 0;

/**
 * Initialize donation form
 */
function initializeDonationForm() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const donationForm = document.getElementById('donationForm');

    // Amount button click handlers
    amountButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectedAmount = parseFloat(button.getAttribute('data-amount'));

            // Update active state
            amountButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Clear custom amount
            if (customAmountInput) {
                customAmountInput.value = '';
            }

            updateDonationSummary();
        });
    });

    // Custom amount input handler
    if (customAmountInput) {
        customAmountInput.addEventListener('input', (e) => {
            const customValue = parseFloat(e.target.value) || 0;
            if (customValue > 0) {
                selectedAmount = customValue;
                amountButtons.forEach(btn => btn.classList.remove('active'));
            }
            updateDonationSummary();
        });
    }

    // Form submission
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
}

/**
 * Update donation summary (amount + fees)
 */
function updateDonationSummary() {
    const donationAmountDisplay = document.getElementById('donationAmountDisplay');
    const processingFeeDisplay = document.getElementById('processingFee');
    const totalAmountDisplay = document.getElementById('totalAmount');

    if (!selectedAmount || selectedAmount <= 0) {
        if (donationAmountDisplay) donationAmountDisplay.textContent = '$0.00';
        if (processingFeeDisplay) processingFeeDisplay.textContent = '$0.00';
        if (totalAmountDisplay) totalAmountDisplay.textContent = '$0.00';
        return;
    }

    // Calculate processing fee (2.2% + $0.30)
    const processingFee = (selectedAmount * 0.022) + 0.30;
    const total = selectedAmount + processingFee;

    if (donationAmountDisplay) {
        donationAmountDisplay.textContent = '$' + selectedAmount.toFixed(2);
    }
    if (processingFeeDisplay) {
        processingFeeDisplay.textContent = '$' + processingFee.toFixed(2);
    }
    if (totalAmountDisplay) {
        totalAmountDisplay.textContent = '$' + total.toFixed(2);
    }
}

/**
 * Handle donation form submission
 */
function handleDonationSubmit(e) {
    e.preventDefault();

    // Validate amount
    if (!selectedAmount || selectedAmount <= 0) {
        alert('Please select or enter a donation amount.');
        return;
    }

    // Get form data
    const donorName = document.getElementById('donorName').value.trim();
    const donorEmail = document.getElementById('donorEmail').value.trim();
    const donorMessage = document.getElementById('donorMessage').value.trim();
    const donationType = document.querySelector('input[name="donationType"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const newsletter = document.getElementById('newsletter').checked;

    // Validate required fields
    if (!donorName) {
        alert('Please enter your full name.');
        return;
    }
    if (!donorEmail) {
        alert('Please enter your email address.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Build donation object
    const donationData = {
        amount: selectedAmount,
        donorName: donorName,
        donorEmail: donorEmail,
        donorMessage: donorMessage,
        donationType: donationType,
        paymentMethod: paymentMethod,
        newsletter: newsletter,
        timestamp: new Date().toISOString()
    };

    console.log('Donation submitted:', donationData);

    // Simulate payment processing
    processPayment(donationData);
}

/**
 * Process payment (in production, this would integrate with a payment gateway)
 */
function processPayment(donationData) {
    const donateBtn = document.getElementById('donateBtn');
    const originalText = donateBtn.textContent;

    // Disable button and show processing state
    donateBtn.disabled = true;
    donateBtn.textContent = 'Processing...';

    // Simulate API call delay
    setTimeout(() => {
        // In production, integrate with Stripe, PayPal, or similar
        console.log('Payment gateway integration would happen here');

        // Show success message
        showSuccessMessage(donationData);

        // Reset button
        donateBtn.disabled = false;
        donateBtn.textContent = originalText;
    }, 2000);
}

/**
 * Show success message after donation
 */
function showSuccessMessage(donationData) {
    const formSection = document.querySelector('.donate-form-section');

    const successHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h5>Thank You for Your Donation!</h5>
            <p>We've received your donation of <strong>$${donationData.amount.toFixed(2)}</strong>.</p>
            <p>A confirmation email has been sent to <strong>${donationData.donorEmail}</strong>.</p>
            ${donationData.donationType === 'monthly' ? '<p class="mb-0">Your monthly donation will start next month. Thank you for becoming a Water Conservation Champion!</p>' : '<p class="mb-0">Thank you for supporting water conservation efforts!</p>'}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Insert success message at top of form
    const form = document.getElementById('donationForm');
    form.insertAdjacentHTML('beforebegin', successHTML);

    // Reset form
    document.getElementById('donationForm').reset();
    selectedAmount = 0;
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
    updateDonationSummary();

    // Scroll to success message
    document.querySelector('.alert-success').scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Store donation in localStorage for analytics
    saveDonationRecord(donationData);
}

/**
 * Save donation record to localStorage
 */
function saveDonationRecord(donationData) {
    try {
        let donations = JSON.parse(localStorage.getItem('nileguardDonations')) || [];
        donations.push(donationData);
        localStorage.setItem('nileguardDonations', JSON.stringify(donations));
        console.log('Donation record saved');
    } catch (error) {
        console.warn('Could not save donation record:', error);
    }
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeDonationForm();
});


