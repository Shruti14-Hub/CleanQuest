document.addEventListener("DOMContentLoaded", () => {
    let score = 0;  // Initialize score
    const scoreDisplay = document.getElementById("score");
    const redeemButton = document.createElement("button");
    redeemButton.textContent = "Redeem Points";
    redeemButton.classList.add("redeem-btn");
    redeemButton.onclick = redeemPoints;
    document.body.appendChild(redeemButton);

    // Simulated external function to get cleanliness percentage from images
    async function getCleanlinessPercentageFromImages() {
        // Replace this with actual logic to calculate percentage from images
        return new Promise((resolve) => {
            setTimeout(() => {
                let percentage = Math.floor(Math.random() * 21) + 80; // Random % between 80 and 100
                resolve(percentage);
            }, 1000);
        });
    }

    async function updateScore() {
        let percentage = await getCleanlinessPercentageFromImages();
        console.log(`Cleanliness Percentage: ${percentage}%`);

        let points = 0;
        if (percentage >= 90 && percentage < 95) {
            points = 15;
        } else if (percentage >= 95) {
            points = 20;
        } else if (percentage >= 80) {
            points = 10;
        }

        score += points;
        scoreDisplay.textContent = score;
        checkRedemption();
    }

    function checkRedemption() {
        if (score >= 500) {
            redeemButton.style.display = "block";
        } else {
            redeemButton.style.display = "none";
        }
    }

    function redeemPoints() {
        alert("Congratulations! You've redeemed a voucher.");
        score = 0;  // Reset score after redemption
        scoreDisplay.textContent = score;
        redeemButton.style.display = "none";
    }

    updateScore();  // Call function to update score initially
});