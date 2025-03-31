// Function to toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    updateIcon(); // Change the icon based on mode
}

// Function to update the mode icon
function updateIcon() {
    const modeIcon = document.getElementById("modeIcon");
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun'); // Change to sun icon for dark mode
    } else {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon'); // Change to moon icon for light mode
    }
}

// Handle sign up form submission
function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Add functionality to save user data (e.g., AJAX request or local storage)
    alert(`Account created!\nUsername: ${username}\nEmail: ${email}`);
    // Redirect to login page or another page after sign-up
    window.location.href = "../login/login.html"; // Redirect after signup
}

// Attach the signup handler to the form
document.getElementById("signupForm").addEventListener("submit", handleSignUp);