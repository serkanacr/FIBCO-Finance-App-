// Get DOM elements
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const overlay = document.getElementById('overlay');

// State variables
let isMenuOpen = false;
let isProfileOpen = false;

// Event listeners with proper event handling
hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleProfile();
});

overlay.addEventListener('click', closeAllMenus);

// Menu toggle functions
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburgerBtn.classList.toggle('active', isMenuOpen);
    navMenu.classList.toggle('active', isMenuOpen);
    overlay.classList.toggle('active', isMenuOpen || isProfileOpen);
    
    // Close profile menu if open
    if (isProfileOpen) {
        isProfileOpen = false;
        profileBtn.classList.remove('active');
        profileDropdown.classList.remove('active');
    }
}

function toggleProfile() {
    isProfileOpen = !isProfileOpen;
    profileBtn.classList.toggle('active', isProfileOpen);
    profileDropdown.classList.toggle('active', isProfileOpen);
    overlay.classList.toggle('active', isMenuOpen || isProfileOpen);
    
    // Close hamburger menu if open
    if (isMenuOpen) {
        isMenuOpen = false;
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

function closeAllMenus() {
    isMenuOpen = false;
    isProfileOpen = false;
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    profileBtn.classList.remove('active');
    profileDropdown.classList.remove('active');
    overlay.classList.remove('active');
}

// Profile menu functionality
const profileItems = document.querySelectorAll('.profile-item');
profileItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = item.getAttribute('data-action');
        console.log('Profile action clicked:', action); // Debug log
        handleProfileAction(action);
        closeAllMenus();
    });
});

function handleProfileAction(action) {
    switch(action) {
        case 'profile':
            console.log('Opening Profile');
            alert('Profile Settings\n\nThis would open your profile page with:\n- Personal information\n- Avatar upload\n- Account details');
            break;
        case 'settings':
            console.log('Opening Settings');
            alert('Settings\n\nThis would open settings with:\n- Theme preferences\n- Notification settings\n- Currency settings\n- Privacy options');
            break;
        case 'logout':
            console.log('Logging out');
            if (confirm('Are you sure you want to log out?')) {
                alert('Logged out successfully!\n\nIn a real app, this would:\n- Clear session data\n- Redirect to login page\n- Clear local storage');
            }
            break;
    }
}

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const page = item.getAttribute('data-page');
        console.log('Navigation clicked:', page); // Debug log
        navigateToPage(page);
        closeAllMenus();
    });
});

function navigateToPage(page) {
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    const activeItem = document.querySelector(`[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // In a real application, you would handle routing here
    switch(page) {
        case 'dashboard':
            console.log('Navigating to Dashboard');
            break;
        case 'add-transaction':
            console.log('Navigating to Add Transaction');
            showAddTransactionModal();
            break;
        case 'analytics':
            console.log('Navigating to Spending Analytics');
            break;
        case 'crypto':
            console.log('Navigating to Crypto Monitoring');
            break;
    }
}

// Mock function for showing add transaction modal
function showAddTransactionModal() {
    alert('Add Transaction Modal\n\nIn a real application, this would open a form to add new transactions with fields like:\n- Amount\n- Category\n- Description\n- Date\n- Type (Income/Expense)');
}

// Dashboard data
let transactions = [];
let balance = 0;

// Initialize dashboard
function initializeDashboard() {
    updateBalance();
    updateTransactionsList();
    updateExpenseChart();
    updateUpcomingPayments();
}

function updateBalance() {
    const balanceElement = document.getElementById('totalBalance');
    const changeElement = document.getElementById('balanceChange');
    
    if (balanceElement) {
        balanceElement.textContent = `$${balance.toFixed(2)}`;
    }
    
    if (changeElement) {
        if (balance > 0) {
            changeElement.style.display = 'inline-flex';
        } else {
            changeElement.style.display = 'none';
        }
    }
}

function updateTransactionsList() {
    const listElement = document.getElementById('transactionsList');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    if (!listElement) return;
    
    if (transactions.length === 0) {
        listElement.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No Transactions Yet</h3>
                <p>Start tracking your finances by adding your first transaction. It could be income, expenses, or transfers.</p>
                <a href="#" class="cta-button" onclick="navigateToPage('add-transaction')">Add First Transaction</a>
            </div>
        `;
        if (viewAllBtn) viewAllBtn.style.display = 'none';
    } else {
        if (viewAllBtn) viewAllBtn.style.display = 'block';
        // Implementation for showing actual transactions would go here
    }
}

function updateExpenseChart() {
    const chartContainer = document.getElementById('chartContainer');
    const canvas = document.getElementById('expenseChart');
    
    if (!chartContainer || !canvas) return;
    
    const emptyState = chartContainer.querySelector('.empty-state');
    
    if (transactions.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        canvas.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        canvas.style.display = 'block';
        // Initialize chart with actual data
    }
}

function updateUpcomingPayments() {
    const paymentsElement = document.getElementById('upcomingPayments');
    
    if (!paymentsElement) return;
    
    // For now, show empty state - in real app, check for scheduled payments
    paymentsElement.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⏰</div>
            <h3>No Scheduled Payments</h3>
            <p>Set up recurring payments and reminders to never miss a bill again.</p>
            <a href="#" class="cta-button" onclick="navigateToPage('add-transaction')">Schedule Payments</a>
        </div>
    `;
}

// View all transactions function
function viewAllTransactions() {
    console.log('Viewing all transactions');
    // In real app, this would navigate to full transaction history
}

// Close menus on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (isMenuOpen || isProfileOpen)) {
        closeAllMenus();
    }
});

// Close menus when clicking outside (but not on menu items)
document.addEventListener('click', (e) => {
    // Check if click is on menu buttons
    if (hamburgerBtn.contains(e.target) || profileBtn.contains(e.target)) {
        return; // Let the button handlers deal with it
    }
    
    // Check if click is inside menus
    if (navMenu.contains(e.target) || profileDropdown.contains(e.target)) {
        return; // Don't close when clicking inside menus
    }
    
    // Close menus if clicked outside
    closeAllMenus();
});

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    
    // Add floating animation to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('float-animation');
    });
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    .float-animation {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);