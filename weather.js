const weather = document.querySelector(".js-weather");

const API_KEY = "2e7114d6360600e877ca81ec916f47f0";
const COORDS = 'coords';

function getWeather(lat, lng){
    //데이터를 얻는 방법은 fetch를 쓰면 됨
    //fetch()안에는 가져올 데이터가 들어가면 됨
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`) //이렇게 하면 API key를 통해서 무리한 요청은 할 수 없게끔 확인함
    .then((response)=>{
        return response.json(); //이걸 왜하는지는 모르겠는데 다른 강의까지 다 봐야 이해가 되는 수준인가봄
    }).then ((json)=>{
        const temperature = json.main.temp; //날씨 정보
        const place =json.name; //지역이름??
        weather.innerText = `${temperature} @ ${place}`; // html의 weather 클래스를 가진 span안에 innerText로 날씨+위치 정보를 넣어줌
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude = position.coords.latitude ;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //key와 value 값이 같을때는 이렇게 작성
        longitude
    };
    saveCoords(coordsObj);
    //아마 getCurrentPosition 함수에서 자동으로 인수를 넘기나봄
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log('Cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError) //좌표를 가져오는데 성공한 경우 실행하는 함수와 
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords(); //좌표요청
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();