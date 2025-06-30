// Selecting forms and buttons
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Login Fetch
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } else {
            alert(data.message);
        }
    });
});

// Signup Fetch
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const surname = document.getElementById('signup-surname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('User created successfully!');
            // Optionally switch to login form automatically
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            isLogin = true;
        } else {
            alert(data.message);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupFormElement');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const surname = document.getElementById('signupSurname').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful!');
                console.log('User registered:', data);
                // Optionally redirect to login or dashboard
                window.location.href = '/login';
            } else {
                alert(data.message || 'Signup failed.');
                console.error('Error:', data.message);
            }
        } catch (error) {
            alert('Network error, please try again later.');
            console.error('Network error:', error);
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Signup Form Listener (if you added it before)
    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const surname = document.getElementById('signupSurname').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, surname, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Signup successful!');
                    window.location.href = '/login';
                } else {
                    alert(data.message || 'Signup failed.');
                }
            } catch (error) {
                alert('Network error, please try again later.');
            }
        });
    }

    // Login Form Listener
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save token in localStorage
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    // Redirect to dashboard
                    window.location.href = '/dashboard';
                } else {
                    alert(data.message || 'Login failed.');
                }
            } catch (error) {
                alert('Network error, please try again later.');
            }
        });
    }
});



