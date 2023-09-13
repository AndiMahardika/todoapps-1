const todos = [];
const RENDER_EVENT = `render_todo`;

document.addEventListener(`DOMContentLoaded`,function(){
    const submitForm = document.getElementById(`form`);

    submitForm.addEventListener(`submit`,function(event){
        event.preventDefault();
        addTodo();
    })
})

function addTodo(){
    const textTodo = document.getElementById(`title`).value;
    const timeStamp = document.getElementById(`date`).value;

    const generateID = generateId();
    const todoOject = generateTodoOject(generateID, textTodo, timeStamp, false);
    todos.push(todoOject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId(){
    return +new Date();
}

function generateTodoOject(id, task, timestamp, isCompleted){
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById(`todos`);
    uncompletedTODOList.innerHTML = ``;

    for (const todoItem of todos) {
        const todoElemet = makeTodo(todoItem);
        uncompletedTODOList.appendChild(todoElemet);
    }

  });

function makeTodo(todoOject){
    const textTitle = document.createElement(`h2`);
    textTitle.innerText = todoOject.task;

    const textTimeStamp = document.createElement(`p`);
    textTimeStamp.innerText = todoOject.timeStamp;

    const textContainer = document.createElement(`div`);
    textContainer.classList.add(`inner`);
    textContainer.appendChild(textTitle, textTimeStamp);

    const container = document.createElement(`div`);
    container.classList.add(`item`, `shadow`);
    container.appendChild(textContainer);
    container.setAttribute(`id`, `todo-${todoOject.id}`)

    return container;
}