document.addEventListener(`DOMContentLoaded`,function(){
    const submitForm = document.querySelector(`#form`);

    submitForm.addEventListener(`submit`,function(event){
        event.preventDefault();
        addTodo();
    })
})

function addTodo(){
    const textTodo = document.querySelector(`#title`);
    const timeStamp = document.querySelector(`#date`);

    const generateID = generateId();
    const todoOject = generateTodoOject(generateID, textTodo, timeStamp, false);
    todos.pusj(todoOject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}


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