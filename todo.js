//Tüm elementleri seçme
const form =document.querySelector("todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list.group");
const firstCardBody=document.querySelector(".card-body")[0];
const secondCardBody=document.querySelector(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos")

eventListeners();

function eventListeners(){//Tüm eventler listenerlar

     form.addEventListene("submit",addTodo);
     document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
     secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e){
    if(e.target.className=="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success","Todo basarıile silindi...");

    }
}
function loadAllTodosToUI(){
let todos=getTodosFromToStorage();
todos.forEach(function(todo) {
    addTodoToUI(todo)
})
}
function addTodo(e){
    const newTodo=todoInput.Value.trim();
    if(newTodo==""){
        /* <div class="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                      </div>*/
        showAlert("danger","Lütfen bit todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","todo başarı ile eklendi....")
    }


    

    e.preventDefault();
}
     function getTodosFromToStorage(){//storage dan bütün Todoları alacak bu fonksiyon
        let todos;
        if( localStorage.getItem("todos")==null){
            todos=[];
        }
        else{
            todos=JSON.parse(localStorage.getItem("todos"));
        }
        return todos;

     }
     function addTodoToStorage(newTodo){
         let todos =getTodoToStorage();
         todos.push(newTodo);
         localStorage.setItem("todos",JSON.stringify(todos));
        
     }
 function showAlert(type,message){

    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    
    firstCardBody.appendChild(alert);

    //setTimeout  metodu
    setTimeout(function(){
        alert.remove();

    },1000);
 }
function addTodoToUI(newTodo){//string  değerini list ıtem olarak UI'ya ekleyecek yani arayüzümüze
     
/*<li class="list-group-item d-flex justify-content-between">
Todo 1
<a href = "#" class ="delete-item">
    <i class = "fa fa-remove"></i>
</a>

</li>
*/

//list Item oluşturma
 const listItem=document.createElement("li");
 //link oluşturma
 const link=document.createElement("a");
 link.href="#";
 link.className="delete-item";
 link.innerHTML=  "< i class = `fa fa-remove`></i>";
 listItem.className="list-group-item d-flex justify-content-between";
 //text node ekleme
 listItem.appendChild(document.createTextNode(newTodo));
 listItem.appendChild(link);

 //Todo List'e list Item 'ı ekleme

 todoList.appendChild(listItem);
 console.log(listItem);
 todoInput.Value="";
}
