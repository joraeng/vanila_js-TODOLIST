const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    //나눠서 파일을 작업할 때, 상수,변수 이름이 같지 않도록 조심해야함 
    //작은 모듈을 만들어 분리시키는 과정은 노드 아카데미 유튜브 클론에서 다룸

const TODOS_LS = 'toDos';

const toDos = []; //할 일을 추가할 때마다 이 배열에 추가되도록

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li"); //지금까지는 쿼리 셀렉터만 사용했는데, 이번엔 html에서 필요한것을 얻어오는게 아니라 js에서 html에 생성한다(생기는 위치는???)
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌"; //Elemnt.value , innerText 차이 -> 문서 보는게 정확, 강의에선 value -> innerText로 바꿨음
    span.innerText = text; //subit 함수에서 입력받은 인자를 넣어줌
    li.appendChild(span) //뭔가를 부모 element 안에 넣는것, span 을 li안에 넣어줌, appendChild 호출 순서에 따라 위치도 달라짐
    li.appendChild(delBtn);// li 안에는 내용(span)과 버튼(delBtn)이 있고,
    li.id = newId;
    toDoList.appendChild(li); // li는 toDoList클래스를 가진 ul 안에 생김
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //배열안에 ojb를 넣고
    saveToDos();  // localStorage에 저장한다
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);  //여기까지만 하면, 누군가 입력을 했을 때, 값이 지워지지 않고 새로고침되지 않고 로컬스토리지에 저장만됨 , 저장후 텍스트는 사라지게 해야함
    toDoInput.value =""; //
}



function loadToDos() { 
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){ //null이 아니라면 불러올 수 있는데 그게 text임  
        // console.log(loadedToDos);                                                          // loaded는 로컬스토리지에 저장된 값들을 가져오는것, 이때는 string이다가
        const parsedToDos = JSON.parse(loadedToDos);                                         //parse해주면 object로 변환됨
        parsedToDos.forEach((toDo)=> {
            paintToDo(toDo.text);
        });//forEach는 array에 담겨있는 것들 각각에 한번씩 함수를 실행시킴

    }
}

function init() {
    loadToDos(); //뭔가를 load하는데 그것은 local 스토리지에서 온것
    toDoForm.addEventListener("submit",handleSubmit);
};


init(); 