const loginWrap = document.querySelector("#login-wrap");
const loginForm = loginWrap.querySelector("#login-form");
const loginInput = loginWrap.querySelector("#login-form .text-data");
const greeting = loginWrap.querySelector("#greeting");

const headerWrap = document.querySelector("#header-wrap");
const logoutBtn = headerWrap.querySelector(".logout-btn");

const mainWrap = document.querySelector("#main-wrap");
const titleUsername = mainWrap.querySelector("#title-wrap #username");


let savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername == null) {
    loginWrap.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit)
}
else {
    enterMainPage();
}


function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);   
    enterMainPage();
}

function showGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerHTML = `Hello ${username}`;
}
function enterMainPage() {
    titleUsername.innerText = localStorage.getItem(USERNAME_KEY);;   
    mainWrap.classList.remove(HIDDEN_CLASSNAME);
    loginWrap.classList.add(HIDDEN_CLASSNAME);
}

function logout(event) {
    localStorage.removeItem(USERNAME_KEY);
    mainWrap.classList.add(HIDDEN_CLASSNAME);
    loginWrap.classList.remove(HIDDEN_CLASSNAME);
}
logoutBtn.addEventListener("click", logout)