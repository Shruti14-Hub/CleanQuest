async function compareImages() {
  const imgUrlBefore = document.getElementById("imageBefore").value;
  const imgUrlAfter = document.getElementById("imageAfter").value;
  const resultContainer = document.getElementById("result");
  const comparisonResult = document.getElementById("comparisonResult");

  resultContainer.style.display = "block";
  comparisonResult.innerHTML = "Processing...";

  if (!imgUrlBefore || !imgUrlAfter) {
      comparisonResult.innerHTML = "Please provide both image URLs.";
      return;
  }

  try {
      const response = await fetch("http://localhost:5000/compare_images", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              img_url_before: imgUrlBefore,
              img_url_after: imgUrlAfter
          })
      });

      const data = await response.json();

      if (data.status === "success") {
          comparisonResult.innerHTML = `<strong>Result:</strong> ${data.comparison_result}`;
      } else {
          comparisonResult.innerHTML = `<strong>Error:</strong> ${data.message}`;
      }
  } catch (error) {
      comparisonResult.innerHTML = "Failed to connect to the server. Please try again.";
  }
}

document.getElementById("compareButton").addEventListener("click", compareImages);