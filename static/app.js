const spinner = '<img src="https://loading.io/spinners/spin/index.ajax-spinner-gif.gif">';
let quote = '';
let author = '';
let newQuoteBtn = document.getElementById("newQuote");
let text = document.getElementById("text");
let authTxt = document.getElementById("author")
const quoteUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

newQuoteBtn.addEventListener("click", handleNewQuote);

function handleNewQuote() {
    displaySpinner();
    fetchQuote()
        .then(data => displayQuote(data))
        .catch(error => console.error("Oops...Something went wrong", error));
}

function displaySpinner() {
    text.innerHTML = `${spinner}`;
}

function fetchQuote() {
    fetch(quoteUrl, {cache: "no-store"})
        .then(response => response.json())
}

function displayQuote(data) {
    const author = data[0].title;
    const quote = data[0].content;
    text.innerHTML = `${quote}`;
    authTxt.innerHTML = ` - ${author}`
}

