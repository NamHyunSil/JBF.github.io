const quotes = [
    {
        quote: "When you go through hardships and decide not to surrender, that is strength.",
        author: "Arnold Schwarzenegger",
    },
    {
        quote: "I’ve failed over and over and over again in my life and that is why I succeed.",
        author: "Michael Jordan",
    },
    {
        quote: "If you don’t get out of the box you’ve been raised in, you won’t understand how much bigger the world is.",
        author: "Angelina Jolie",
    },
    {
        quote: "It is better to fail in originality than to succeed in imitation.",
        author: "Herman Melville",
    },
    {
        quote: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill",
    },
    {
        quote: "All progress takes place outside the comfort zone.",
        author: "Michael John Bobak",
    },
    {
        quote: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau",
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        author: "Albert Schweitzer",
    },
    {
        quote: "Success seems to be connected with action. Successful people keep moving.",
        author: "Conrad Hilton",
    },
    {
        quote: "In order to succeed, we must first believe that we can.",
        author: "Nikos Kazantzakis",
    }
]

const quoteBkgImg = ["0.jpg", 
                    "1.jpg", 
                    "2.jpg", 
                    "3.jpg", 
                    "4.jpg", 
                    "5.jpg", 
                    "6.jpg", 
                    "7.jpg", 
                    "8.jpg",
                    "9.jpg",
                    "10.jpg",
                ]
                

                
const quoteWrap = document.querySelector("#quote-wrap");
const quoteBkg = quoteWrap.querySelector("#quote-bkg");
const content = quoteWrap.querySelector("#quote .content");
const author = quoteWrap.querySelector("#quote .author");



const chosenImage = quoteBkgImg[Math.floor(Math.random() * quoteBkgImg.length)];
quoteBkg.style.backgroundImage = `url('data/quotes_bkg/${chosenImage}')`;


const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];

content.innerText = chosenQuote.quote;
author.innerText = chosenQuote.author;