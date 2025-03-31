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

// Handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate the input fields
    if (username && password) {
        // Redirect to welcome.html after successful login
        window.location.href = "../mainpage/homepage.html";
    } else {
        // Show an error message for invalid credentials
        alert("Please enter valid credentials.");
    }
}