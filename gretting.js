const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event) { //input 에 누군가 값을 입력했을 때 동작하는 함수
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);    
    saveName(currentValue); 
}


function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) { //form을 지우고, greeting을 불러오며 greeting에 내가 원하는 텍스트를 넣는 함수
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}


function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();