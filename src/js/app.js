// Get DOM elements
const input = document.querySelector(".todo__input");
const addBtn = document.querySelector(".todo__btn");
const todoList = document.querySelector(".todo-list");
const headerTitle = document.querySelector(".header__title");

// Get API data
function getData() {
  for (let i = 0; i < 3; i++) {
    createTodo();
  }

  let todo = document.getElementsByClassName("todo-item__input");

  for (let i = 0; i < 3; i++) {
    let apiUrl = "http://www.boredapi.com/api/activity/";
    fetch(apiUrl).then((response) =>
      response
        .json()
        .then((activityObject) => (todo[i].value = activityObject.activity))
    );
  }
}

function createTodo() {
  // Create DOM elements
  const todoItem = document.createElement("li");
  const todoItemInput = document.createElement("input");
  const todoItemComplete = document.createElement("button");
  const todoItemTrash = document.createElement("button");
  const completeBtn = document.createElement("i");
  const trashBtn = document.createElement("i");

  // Add a class to every created element
  todoItem.classList.add("todo-item");
  todoItemInput.classList.add("todo-item__input");
  todoItemComplete.classList.add("todo-item__complete");
  todoItemTrash.classList.add("todo-item__trash");
  completeBtn.classList.add("fas", "fa-check");
  trashBtn.classList.add("fas", "fa-trash");

  // Append created elements to DOM
  todoItem.appendChild(todoItemInput);
  todoItem.appendChild(todoItemComplete);
  todoItemComplete.appendChild(completeBtn);
  todoItem.appendChild(todoItemTrash);
  todoItemTrash.appendChild(trashBtn);
  todoList.appendChild(todoItem);

  // Set main input value to todo item value
  todoItemInput.value = input.value;
  input.value = "";

  // Add functionality to complete button
  todoItemComplete.addEventListener("click", () => {
    todoItemInput.classList.toggle("completed");
  });

  todoItemTrash.addEventListener("click", deleteTodo);
}

function addTodo(e) {
  // Prevent default button event
  e.preventDefault();

  createTodo();
}

// Remove todo
function deleteTodo(e) {
  const item = e.target.parentElement;

  if (item.classList[0] === "todo-item__trash") {
    const todo = item.parentElement;
    todo.classList.add("fall");

    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
}

// Set current greeting
function setGreeting() {
  const index = Math.floor(Math.random() * 10);

  const greetings = [
    "Aloha",
    "Hi mate",
    "What's up",
    "Hiiii",
    "Hello",
    "G'day",
    "Peek-a-boo",
    "Howdy-doody",
    "Ahoy",
    "Konnichiwa",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const emojis = [
    "🙃🥁",
    "😍🥂",
    "😌☕️",
    "😁🍍",
    "😜🍕",
    "🤗🍪",
    "😎🍹",
    "🤠🪃",
    "🥸🎬",
    "😊🍫",
  ];

  // Set current date
  const now = new Date();

  // Set current day
  const currentDay = days[now.getDay()];

  headerTitle.textContent = `${greetings[index]}, it's ${currentDay} ${emojis[index]}`;
}

// Invoke functions on page load
setGreeting();
getData();

// Listen elements
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo;
  }
});
