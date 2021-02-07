const body = document.querySelector("body");

const IMG_NUMBER = 5;



function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage"); //우리가 만든 이미지에 클래스를 넣어줌
    body.prepend(image);
}

function genRandom() { //math를 사용해서 랜덤숫자를 받아올 예정, 소수점은 버려야하니까 floor사용 
    const number = Math.floor(Math.random() * IMG_NUMBER); //*n 으로 몇부터 몇까지의 숫자를 원하는지 정할 수 있음
    return number;
}

function init (){
    const randomNumer = genRandom();
    paintImage(randomNumer);
}

init();
