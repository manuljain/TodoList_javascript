//selectors 

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//eventlistners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//functions
function addtodo(event){
    event.preventDefault();
    //create  todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    //create list 
    const newtodo =document.createElement("li");
    newtodo.innerText = todoInput.value;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //create checkmark button
    const completebutton = document.createElement("button");
    completebutton.innerHTML='<li class ="fas fa-check"></li>'
    completebutton.classList.add("completebutton");
    tododiv.appendChild(completebutton);

    //create trash button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML='<li class ="fas fa-trash "></li>'
    trashbutton.classList.add("trashbutton");
    tododiv.appendChild(trashbutton);

    //append tododiv in todoList
    todoList.appendChild(tododiv);

    //clear input value
    todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    //delete
    if(item.classList[0] === 'trashbutton'){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove()
        });
    }

    //checkmark
    if(item.classList[0] === 'completebutton'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "Uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    // CHECK ...do we already have things
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo){
    
    // CHECK ...do we already have things
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //create  todo div
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo");

        //create list 
        const newtodo =document.createElement("li");
        newtodo.innerText = todo;
        newtodo.classList.add("todo-item");
        tododiv.appendChild(newtodo);

        //create checkmark button
        const completebutton = document.createElement("button");
        completebutton.innerHTML='<li class ="fas fa-check"></li>'
        completebutton.classList.add("completebutton");
        tododiv.appendChild(completebutton);

        //create trash button
        const trashbutton = document.createElement("button");
        trashbutton.innerHTML='<li class ="fas fa-trash "></li>'
        trashbutton.classList.add("trashbutton");
        tododiv.appendChild(trashbutton);

        //append tododiv in todoList
        todoList.appendChild(tododiv);

    });
}

function removeLocalTodos(todo){

    // CHECK ...do we already have things
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}