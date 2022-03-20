const todoListWrap = document.querySelector("#todo-list-wrap");
const todoForm = todoListWrap.querySelector("#todo-form");
const todoInput = todoListWrap.querySelector("#todo-form .todo-input");
const todoList = todoListWrap.querySelector("#todo-list");
const todoTemplate = todoListWrap.querySelector(".template.todo-wrap");
const todoTooltipTags = todoListWrap.querySelectorAll(".tag-wrap .tooltip .tag");
const todoTagSelector = todoListWrap.querySelector(".tag-wrap .tag.selected");

let todos = []

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const target = event.target.closest(".todo-wrap");
    todos = todos.filter( (todo) => parseInt(target.id) !== todo.id);
    target.remove();
    saveTodos()
}
function updateTodoCheck(event) {
    const target = event.target.closest(".todo-wrap");
    let targetTodoIdx = null;
    for (const [idx, todo] of todos.entries()) {
        if(parseInt(target.id) === todo.id)
        {
            targetTodoIdx = idx;
            break;
        }
    }
    todos[targetTodoIdx].isDone = (!todos[targetTodoIdx].isDone)
    saveTodos()
}

function addTodo(newTodoObj){
    const newTodo = todoTemplate.cloneNode(true);
    const checkIinput = newTodo.querySelector(".check-data");
    const tag = newTodo.querySelector(".tag");
    const content = newTodo.querySelector(".content");
    const deleteBtn = newTodo.querySelector(".delete-btn");

    newTodo.id = newTodoObj.id;
    newTodo.classList.remove(TEMPLATE_CLASSNAME);
    if(newTodoObj.isDone) checkIinput.checked = true;
    tag.classList.add(newTodoObj.tag);

    content.innerText = newTodoObj.text;
    deleteBtn.addEventListener("click", deleteTodo);
    checkIinput.addEventListener("change", updateTodoCheck);

    todoList.appendChild(newTodo);
}
function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodoObj = {
        id: Date.now(),
        text:todoInput.value,
        tag: todoTagSelector.getAttribute("color"),
        isDone: false
    }
    todoInput.value = "";

    todos.push(newTodoObj);
    addTodo(newTodoObj);   
    saveTodos(todos);
}
function updateTagInput(event) {
    const target = event.target;
    const targetColor = target.getAttribute("color");
    const currentColor = todoTagSelector.getAttribute("color");
    if(targetColor == currentColor) return
    todoTagSelector.setAttribute("color", targetColor);
    todoTagSelector.classList.remove(currentColor);
    todoTagSelector.classList.add(targetColor);
}

todoForm.addEventListener("submit", handleTodoSubmit);
for(const tooltipTag of todoTooltipTags) {
    tooltipTag.addEventListener("click", updateTagInput);
}

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(addTodo);
}
