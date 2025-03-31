// Open the login modal
document.getElementById("profileLogo").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("loginModal").style.display = "block"; // Show the login modal
});

// Close the login modal when the close button is clicked
document.getElementById("closeLoginModal").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "none"; // Hide the login modal
});

// Close the login modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the login modal
    }
});