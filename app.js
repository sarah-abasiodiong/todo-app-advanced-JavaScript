const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListContainer = document.querySelector('#todo-list');

//Array to store our todos - A fake database
let todoStore = [
    {id: '7878', text: 'Buy Milk', completed: false},
    {id: '7879', text: 'Clean the Kitchen', completed: false},
    {id: '7880', text: 'Drink Water', completed: false},
];

let todoState = 'add';
let editedItemId ="";

function renderTodos(todoArray) {
    if (todoArray.length ===0) {
        todoListContainer.innerHTML =`<p class="no-todos">You have nothing to do</p>`
    }else {
        todoListContainer.innerHTML = todoArray.map(todo => `<p class="todo ${todo.completed ? 'completed' : 'not-completed'}">
        <span>${todo.text}</span>
        <i>Completed</i>
        <button id="${todo.id}">del</button>
                 </p>`)
         .join('');

    }
//Deleting todos
    let allDelBtns = document.querySelectorAll('.todo button')
    allDelBtns.forEach(btn =>{
        btn.addEventListener('click', function(){
            deleteTodos(btn.id);
        })
    })
//marking todos as completed
    let allTodos = document.querySelectorAll('.todo');
    allTodos.forEach(item =>{
        item.addEventListener('click', function (){
            markAsComplete(item.querySelector('span').innerHTML);
        })
    })
    //select a todo to be edited
    allTodos.forEach(item =>{
        item.addEventListener('dblclick', function (){
            todoState = 'edit';
            todoInput.value = item.querySelector('span').innerHTML;
            editedItemId = item.querySelector('button').id;
        })
    })
}
renderTodos(todoStore)

//Function to create a new item
function createNewTodo(event) {
    event.preventDefault();

    if (todoInput.value.trim() !== "") {

        for (let index = 0; index < todoStore.length; index++) {
            let todo = todoStore[index];
            if (todo.text.toLowerCase() === todoInput.value.toLowerCase()) {
                alert(`This todo item already exists with the ID '${todo.id}'. You cannot add a duplicate todo items.`);
                todoInput.value ="";
                return false;
            }
        }

        const newTodo ={
            id: todoStore.length ? (todoStore[todoStore.length -1] .id * 1 +1).toString() : '7878',
            text: todoInput.value,
            completed: false,
        }
        todoInput.value ='';
        todoStore.push(newTodo);
        renderTodos(todoStore);

    }else{
        alert('invalid Todo Value')
    }

    
}

todoForm.addEventListener('submit', function (event){
    if (todoState === 'add') {
        createNewTodo(event);
    }else {
       editTodos(event, editedItemId);
    }
});

function editTodos(event, id) {
    event.preventDefault();
    let newList = todoStore.map(todo =>{
        if (todo.id === id) {
            return{...todo, text: todoInput.value}
        } else{
            return todo
        }
    })

    todoStore = newList;
    renderTodos(todoStore);
    todoInput.value = "";
    todoState = 'add';
}

function deleteTodos(id) {
    let newList = todoStore.filter
    (todo => todo.id !==id);
    todoStore =newList;
    renderTodos(todoStore)
}

function markAsComplete(text) {
    let newList = todoStore.map(todo =>{
        if (todo.text === text){
            return{...todo, completed: !todo.completed}
        } else {
            return todo
        }
    })
    todoStore = newList;
    renderTodos(todoStore);
}