function loadContent(page) {
    // Create an XMLHttpRequest to fetch the content dynamically
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // Insert the loaded content into the 'content' div
        document.getElementById("content").innerHTML = this.responseText;
    };
    // Load the respective page (e.g., home.html, about.html, etc.)
    xhttp.open("GET", `${page}.html`, true);
    xhttp.send();
}

