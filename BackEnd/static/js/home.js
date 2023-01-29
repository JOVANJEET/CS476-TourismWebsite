window.addEventListener("resize", function() {
    // Get the width of the screen
    var screenWidth = window.innerWidth;
    // Check the screen width and adjust the content accordingly
    if (screenWidth > 768) {
        // Show elements for larger screens
        document.getElementById("large-screen-element").style.display = "block";
    } else {
        // Hide elements for smaller screens
        document.getElementById("large-screen-element").style.display = "none";
    }
});
// Get the width of the screen
var screenWidth = window.innerWidth;

// Check the screen width and adjust the content accordingly
if (screenWidth > 768) {
    // Show elements for larger screens
    document.getElementById("large-screen-element").style.display = "block";
} else {
    // Hide elements for smaller screens
    document.getElementById("large-screen-element").style.display = "none";
}
