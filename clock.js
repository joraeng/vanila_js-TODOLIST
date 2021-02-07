const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date(); // date는 클래스인데 구체적으로는 따로 공부해야함
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}`:seconds
    }`;
}

//init이 제일 처음만든 함수인데 어떤 역할을 하는 친구인지 모르겠음
function init() { 
    getTime();
    setInterval(getTime, 1000);
 }; 

init(); 
