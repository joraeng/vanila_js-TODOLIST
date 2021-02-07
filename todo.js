const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    //나눠서 파일을 작업할 때, 상수,변수 이름이 같지 않도록 조심해야함 
    //작은 모듈을 만들어 분리시키는 과정은 노드 아카데미 유튜브 클론에서 다룸

const TODOS_LS = 'toDos';

function paintToDo(text){
    const li = document.createElement("li"); //지금까지는 쿼리 셀렉터만 사용했는데, 이번엔 html에서 필요한것을 얻어오는게 아니라 js에서 html에 생성한다(생기는 위치는???)
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌"; //Elemnt.value , innerText 차이 -> 문서 보는게 정확, 강의에선 value -> innerText로 바꿨음
    const span = document.createElement("span");
    span.innerText = text; //subit 함수에서 입력받은 인자를 넣어줌
    li.appendChild(span) //뭔가를 부모 element 안에 넣는것, span 을 li안에 넣어줌
    li.appendChild(delBtn);// li 안에는 내용(span)과 버튼(delBtn)이 있고,
    toDoList.appendChild(li); // li는 toDoList클래스를 가진 ul 안에 생김
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);  //여기까지만 하면, 누군가 입력을 했을 때, 값이 지워지지 않고 새로고침되지 않고 로컬스토리지에 저장만됨 , 저장후 텍스트는 사라지게 해야함
    toDoInput.value =""; //
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if (toDos === null){

    }
}

function init() {
    loadToDos(); //뭔가를 load하는데 그것은 local 스토리지에서 온것
    toDoForm.addEventListener("submit",handleSubmit);
};


init(); 