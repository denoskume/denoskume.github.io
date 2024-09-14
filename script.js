function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("content").innerHTML = this.responseText;
    };
    xhttp.open("GET", `${page}.html`, true);
    xhttp.send();
}

// Load Home content by default when the page is first loaded
window.onload = function() {
    loadContent('home'); // This will load 'home.html' by default
};