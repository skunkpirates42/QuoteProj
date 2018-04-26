const spinner = '<img src="https://loading.io/spinners/spin/index.ajax-spinner-gif.gif">'
const quoteUrl = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1/${Date.now()}`;
let quote = '';
let author = '';
let newQuoteBtn = document.getElementById("newQuote");
let text = document.getElementById("text");



newQuoteBtn.addEventListener("click", getQuote);

function getQuote() {
    displaySpinner();
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            author = data[0].title;
            quote = data[0].content;
            text.innerHTML = `${quote} - ${author}`; 
        })
        .catch(error => console.error("Oops...Something went wrong"));
}

function displaySpinner() {
    text.innerHTML = `${spinner}`;
}