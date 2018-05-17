const spinner = '<img src="https://loading.io/spinners/spin/index.ajax-spinner-gif.gif">';
const newQuoteBtn = document.getElementById("newQuote");
const text = document.getElementById("text");
const authTxt = document.getElementById("author");
const twtIcon = document.getElementById("twitUrl");
const body = document.querySelector("html");
const quoteBox = document.querySelector("quoteBox");
const quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
let twtUrl = '';
let author;
let quote;
let currentColor;


newQuoteBtn.addEventListener("click", handleNewQuote);

twtIcon.style.color = "#333";
newQuoteBtn.style.backgroundColor = "#333";
body.style.backgroundColor = "#333";

function handleNewQuote() {
    displaySpinner();
    fetchQuote()
        .then(data => {
            displayQuote(data)
            updateUrls(data)
        });
    changeColor();
}

function displaySpinner() {
    text.innerHTML = spinner;
    authTxt.innerText = "";
}

function fetchQuote() {
    return new Promise((resolve, reject) => {
        fetch(quoteUrl, {cache: "no-store"})
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => console.error("Oops...Something went wrong", error));
    });
}

function displayQuote(data) {
    author = data[0].title;
    quote = data[0].content;
    text.innerHTML = `${quote}`;
    authTxt.innerHTML = ` - ${author}`;
}

function updateUrls(data) {
    author = data[0].title;
    quote = data[0].content
        .replace("<p>", "").replace("</p>", "")
        .replace(/"&#8217;"/g, "'").replace(/"&#8211;"/g, "-")
        .replace(/"&#8230;"/g, "...").replace(/"&#8220;"/g, "\"")
        .replace(/"&#8221;"/g, "\"");
    twtUrl = `https://twitter.com/intent/tweet?hashtags=quotes&text="${encodeURIComponent(`${quote}" by ${author}`)}`;
    twtIcon.setAttribute("href", twtUrl);
}

function changeColor() {
    currentColor = randomColor();
    body.style.color = currentColor;
    body.style.backgroundColor = currentColor;
    newQuoteBtn.style.backgroundColor = currentColor;
    twtIcon.style.color = currentColor;
    body.style.transition = "background-color 2.5s, color 2.5s";
    newQuoteBtn.style.transition = "background-color 2.5s";
    twtIcon.style.transition = "color 2.5s";
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

  