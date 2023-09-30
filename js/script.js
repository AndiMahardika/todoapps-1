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
    saveData();
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

    if(todoOject.isCompleted){
        const undoBuuton = document.createElement(`button`);
        undoBuuton.classList.add(`undo-button`);

        undoBuuton.addEventListener(`click`,function(){
            undoTaskFromCompleted(todoOject.id);
        })

        const trashButton = document.createElement(`button`);
        trashButton.classList.add(`trash-button`);

        trashButton.addEventListener(`click`, function(){
            removeTaskFromCompleted(todoOject.id);
        })

        container.append(undoBuuton, trashButton);
    } else {
        const checkButton = document.createElement(`button`);
        checkButton.classList.add(`check-button`);

        checkButton.addEventListener(`click`,function(){
            addTaskToCompleted(todoOject.id);
            // console.log(todoOject.id)
        });

        container.append(checkButton);
    }

    return container;
}

function addTaskToCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTodo(todoId){
    for (const todoItem of todos) {
        if(todoItem.id == todoId){
            return todoItem;
        }
    }
    return null;
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
 
  if (todoTarget === -1) return;
 
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
 
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
 
  if (todoTarget == null) return;
 
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
 
  return -1;
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById(`todos`);
    uncompletedTODOList.innerHTML = ``;

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if(!todoItem.isCompleted){
            uncompletedTODOList.appendChild(todoElement);
        } else {
            completedTODOList.append(todoElement);
        }
    }
});

// Storage
function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}