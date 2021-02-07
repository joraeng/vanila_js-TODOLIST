const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    //나눠서 파일을 작업할 때, 상수,변수 이름이 같지 않도록 조심해야함 
    //작은 모듈을 만들어 분리시키는 과정은 노드 아카데미 유튜브 클론에서 다룸

const TODOS_LS = 'toDos';


let toDos = []; //할 일을 추가할 때마다 이 배열에 추가되도록, local storage에서 toDos라는 항목 안에 모든 toDo들이 저장되어야함

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //html을 여기서 지웠음

    const cleanToDos = toDos.filter((toDo)=> { //제일 헷갈리는건 여기서 toDo 매개변수에 인수로는 뭐가 들어가느냐 인데... 아마 배열 안의 item들이겠지?
        return toDo.id !== parseInt(li.id); // li는 지우려는 아이템, 그런데 string으로 비교하게 되니까 숫자로 바꿔줘야함
    }); //이제 로컬 스토리지 내용도 fitering된 array로 바꿔줘야함
    toDos = cleanToDos //이 작업을 위해 배열은 let으로
    saveToDos(); //이걸 해주지 않으면 배열내용이 바뀌었어도 로컬 스토리지에는 반영안됨
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li"); //지금까지는 쿼리 셀렉터만 사용했는데, 이번엔 html에서 필요한것을 얻어오는게 아니라 js에서 html에 생성한다(생기는 위치는???)
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌"; //Elemnt.value , innerText 차이 -> 문서 보는게 정확, 강의에선 value -> innerText로 바꿨음
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text; //subit 함수에서 입력받은 인자를 넣어줌
    li.appendChild(delBtn);// li 안에는 내용(span)과 버튼(delBtn)이 있고,
    li.appendChild(span) //뭔가를 부모 element 안에 넣는것, span 을 li안에 넣어줌, appendChild 호출 순서에 따라 위치도 달라짐
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
        const parsedToDos = JSON.parse(loadedToDos); 
        parsedToDos.forEach((toDo)=> { //parse된 모든 obj들에 paint함수를 적용
            paintToDo(toDo.text);
        });//forEach는 array에 담겨있는 것들 각각에 한번씩 함수를 실행시킴

    }
}

function init() {
    loadToDos(); //뭔가를 load하는데 그것은 local 스토리지에서 온것
    toDoForm.addEventListener("submit",handleSubmit);
};


init(); 