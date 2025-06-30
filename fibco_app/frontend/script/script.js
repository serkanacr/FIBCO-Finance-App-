window.addEventListener('scroll', () => {
    const card = document.querySelector('.glass-card');
    const transactionsContainer = document.querySelector('.transactions');
    const hiddenTransactions = document.querySelectorAll('.transaction.hidden');

    // Check if elements exist before using them
    if (card && transactionsContainer) {
        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardPosition < windowHeight - 100) {
            transactionsContainer.style.maxHeight = '500px'; // Expands to show all

            hiddenTransactions.forEach((transaction, index) => {
                setTimeout(() => {
                    transaction.classList.add('show');
                }, index * 200); // Staggered animation
            });
        }
    }
});

// Wait for page to fully load
window.addEventListener('load', () => {
    console.log('Page fully loaded');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideUpElements = entry.target.querySelectorAll('.slide-up');
                slideUpElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('show');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    const financeSection = document.querySelector('.finance-section');
    if (financeSection) {
        observer.observe(financeSection);
        console.log('Observer attached successfully');
    } else {
        console.log('Finance section not found');
    }
});

document.addEventListener('DOMContentLoaded', function() {
            // Get all required elements
            const formBox = document.getElementById('formBox');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const formTitle = document.getElementById('formTitle');
            const switchToSignup = document.getElementById('switchToSignup');
            const switchToLogin = document.getElementById('switchToLogin');

            // Debug: Check if all elements are found
            console.log('Elements found:', {
                formBox: !!formBox,
                loginForm: !!loginForm,
                signupForm: !!signupForm,
                formTitle: !!formTitle,
                switchToSignup: !!switchToSignup,
                switchToLogin: !!switchToLogin
            });

            // Function to switch to signup mode
            function showSignupForm() {
                console.log('Switching to signup');
                loginForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
                formTitle.textContent = 'SIGN UP';
                formBox.classList.add('signup-mode');
            }

            // Function to switch to login mode
            function showLoginForm() {
                console.log('Switching to login');
                signupForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                formTitle.textContent = 'LOG IN';
                formBox.classList.remove('signup-mode');
            }

            // Add event listeners
            if (switchToSignup) {
                switchToSignup.addEventListener('click', function(e) {
                    e.preventDefault();
                    showSignupForm();
                });
            }

            if (switchToLogin) {
                switchToLogin.addEventListener('click', function(e) {
                    e.preventDefault();
                    showLoginForm();
                });
            }

            // Optional: Add form submission handlers
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = document.getElementById('loginEmail').value;
                    const password = document.getElementById('loginPassword').value;
                    console.log('Login attempt:', { email, password });
                    // Add your login logic here
                });
            }

            if (signupForm) {
                signupForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = document.getElementById('signupName').value;
                    const surname = document.getElementById('signupSurname').value;
                    const email = document.getElementById('signupEmail').value;
                    const password = document.getElementById('signupPassword').value;
                    console.log('Signup attempt:', { name, surname, email, password });
                    // Add your signup logic here
                });
            }
        });



const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate slide-up elements
                    entry.target.querySelectorAll('.slide-up').forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('show');
                        }, index * 200);
                    });

                    // Animate donut chart
                    setTimeout(() => {
                        animateDonutChart();
                    }, 800);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        // Donut chart animation
        function animateDonutChart() {
            const segments = document.querySelectorAll('.donut-segment');
            const legendItems = document.querySelectorAll('.legend-item');
            
            // Sample data (percentages)
            const data = [30, 25, 20, 15, 10]; // Food, Transport, Shopping, Utilities, Entertainment
            const colors = ['#0D0D67', '#1F7EA1', '#4CAF50', '#FF9800', '#E91E63'];
            
            let cumulativePercentage = 0;
            const circumference = 2 * Math.PI * 75; // 75 is the radius
            
            segments.forEach((segment, index) => {
                const percentage = data[index];
                const strokeDasharray = (percentage / 100) * circumference;
                const strokeDashoffset = -cumulativePercentage * circumference / 100;
                
                setTimeout(() => {
                    segment.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
                    segment.style.strokeDashoffset = strokeDashoffset;
                    segment.classList.add('animate');
                    
                    // Animate legend item
                    if (legendItems[index]) {
                        legendItems[index].classList.add('animate');
                    }
                }, index * 300);
                
                cumulativePercentage += percentage;
            });
        }

        // Initialize observer
        document.addEventListener('DOMContentLoaded', () => {
            const analyticsSection = document.querySelector('.analytics-section');
            if (analyticsSection) {
                observer.observe(analyticsSection);
            }
        });


const cryptoObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const cryptoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    
                    // Trigger animations with slight delays
                    setTimeout(() => {
                        const title = section.querySelector('h2');
                        if (title) title.classList.add('animate');
                    }, 100);
                    
                    setTimeout(() => {
                        const paragraph = section.querySelector('p');
                        if (paragraph) paragraph.classList.add('animate');
                    }, 300);
                    
                    setTimeout(() => {
                        const features = section.querySelectorAll('.features li');
                        features.forEach(feature => feature.classList.add('animate'));
                    }, 500);
                    
                    setTimeout(() => {
                        const button = section.querySelector('.cta-button');
                        if (button) button.classList.add('animate');
                    }, 700);
                    
                    setTimeout(() => {
                        const monitor = section.querySelector('.crypto-monitor');
                        if (monitor) monitor.classList.add('animate');
                    }, 900);
                    
                    // Stop observing once animated
                    cryptoObserver.unobserve(entry.target);
                }
            });
        }, cryptoObserverOptions);

        // Start observing when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const cryptoSection = document.querySelector('.crypto-section');
            if (cryptoSection) {
                cryptoObserver.observe(cryptoSection);
            }
        });

        // Fallback: trigger animations if user is already in view
        window.addEventListener('load', () => {
            const cryptoSection = document.querySelector('.crypto-section');
            if (cryptoSection) {
                const rect = cryptoSection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    // Trigger all animations immediately if already in view
                    cryptoSection.querySelector('h2')?.classList.add('animate');
                    cryptoSection.querySelector('p')?.classList.add('animate');
                    cryptoSection.querySelectorAll('.features li').forEach(li => li.classList.add('animate'));
                    cryptoSection.querySelector('.cta-button')?.classList.add('animate');
                    cryptoSection.querySelector('.crypto-monitor')?.classList.add('animate');
                }
            }
        });

const summariesObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const summariesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    
                    // Trigger animations with slight delays
                    setTimeout(() => {
                        const title = section.querySelector('h2');
                        if (title) title.classList.add('animate');
                    }, 100);
                    
                    setTimeout(() => {
                        const paragraph = section.querySelector('p');
                        if (paragraph) paragraph.classList.add('animate');
                    }, 250);
                    
                    setTimeout(() => {
                        const features = section.querySelectorAll('.sumfeatures li');
                        features.forEach(feature => feature.classList.add('animate'));
                    }, 400);
                    
                    
                    setTimeout(() => {
                        const dashboard = section.querySelector('.reports-dashboard');
                        if (dashboard) dashboard.classList.add('animate');
                    }, 550);
                    
                    // Stop observing once animated
                    summariesObserver.unobserve(entry.target);
                }
            });
        }, summariesObserverOptions);

        // Start observing when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const summariesSection = document.querySelector('.summaries-section');
            if (summariesSection) {
                summariesObserver.observe(summariesSection);
            }
        });

        // Fallback: trigger animations if user is already in view
        window.addEventListener('load', () => {
            const summariesSection = document.querySelector('.summaries-section');
            if (summariesSection) {
                const rect = summariesSection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    // Trigger all animations immediately if already in view
                    summariesSection.querySelector('h2')?.classList.add('animate');
                    summariesSection.querySelector('p')?.classList.add('animate');
                    summariesSection.querySelectorAll('.sumfeatures li').forEach(li => li.classList.add('animate'));
                    summariesSection.querySelector('.reports-dashboard')?.classList.add('animate');
                }
            }
        });

