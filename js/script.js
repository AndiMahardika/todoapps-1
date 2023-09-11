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