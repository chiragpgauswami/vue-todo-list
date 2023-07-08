<script setup>
import { onMounted, ref } from "vue";

onMounted(() => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  } else {
    todos.value = [];
  }
});

const todos = ref([]);
const todo = ref("");

const handleFormSubmit = (e) => {
  e.preventDefault();

  if (todo.value !== "") {
    todos.value.push({
      id: Math.floor(Math.random() * 100000),
      text: todo.value.trim(),
      checked: false,
    });
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }

  todo.value = "";
};

const handleCheckTodo = (id) => {
  const newTodos = [...todos.value];
  const todo = newTodos.find((todo) => todo.id === id);
  todo.checked = !todo.checked;
  todos.value = newTodos;
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const handleDeleteTodo = (e, id) => {
  const item = e.target;
  const todo = item.parentElement;

  // delete todo
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    todo.addEventListener("animationend", () => {
      const newTodos = todos.value.filter((todo) => todo.id !== id);
      todos.value = newTodos;
      localStorage.setItem("todos", JSON.stringify(newTodos));
    });
  }
};

const filterTodo = (e) => {
  const value = e.target.value;
  switch (value) {
    case "all":
      todos.value = JSON.parse(localStorage.getItem("todos"));
      break;
    case "completed":
      todos.value = JSON.parse(localStorage.getItem("todos")).filter(
        (todo) => todo.checked === true
      );
      break;
    case "uncompleted":
      todos.value = JSON.parse(localStorage.getItem("todos")).filter(
        (todo) => todo.checked === false
      );
      break;
    default:
      return;
  }
};

// // Selectors

// onMounted(() => {
//   // Event Listeners

//   document.addEventListener("DOMContentLoaded", getTodos);
//   document.querySelector(".todo-list").addEventListener("click", deleteCheck);
//   document.querySelector(".filter-todo").addEventListener("change", filterTodo);
// });

// // Functions

// const createComponents = (value) => {
//   // Create div
//   const todoDiv = document.createElement("div");
//   todoDiv.classList.add("todo");

//   // Create li
//   const newTodo = document.createElement("li");
//   newTodo.innerText = value;
//   newTodo.classList.add("todo-item");
//   todoDiv.appendChild(newTodo);

//   // Create Completed button
//   const completedButton = document.createElement("button");
//   completedButton.innerHTML = "<i class='fas fa-check'></i>";
//   completedButton.classList.add("check-btn");
//   todoDiv.appendChild(completedButton);

//   // Create Trash button
//   const trashButton = document.createElement("button");
//   trashButton.innerHTML = "<i class='fas fa-trash'></i>";
//   trashButton.classList.add("trash-btn");
//   todoDiv.appendChild(trashButton);

//   // Append all
//   document.querySelector(".todo-list").appendChild(todoDiv);
// };

// const addTodo = (e) => {
//   // Validate and prevent refresh
//   e.preventDefault();
//   if (!todoInput.value) return;

//   // Creating all components
//   createComponents(todoInput.value);

//   // Add todo to local storage
//   saveLocalTodos(todoInput.value);

//   // Clear and focus Input
//   todoInput.value = "";
// };

// const deleteCheck = (e) => {
//   const item = e.target;
//   const todo = item.parentElement;

//   // delete todo
//   if (item.classList[0] === "trash-btn") {
//     todo.classList.add("fall");
//     todo.addEventListener("animationend", () => {
//       removeLocalTodos(todo);
//       todo.remove();
//     });
//   }

//   // completed todo
//   if (item.classList[0] === "check-btn") todo.classList.toggle("completed");
// };

// const filterTodo = (e) => {
//   const value = e.target.value;
//   const todos = document.querySelector(".todo-list").childNodes;

//   todos.forEach((todo) => {
//     switch (value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }

//         break;
//       case "uncompleted":
//         if (!todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       default:
//         return;
//     }
//   });
// };

// const saveLocalTodos = (todo) => {
//   // Check
//   let todos;

//   // if it HAS already an item, get it
//   if (localStorage.getItem("todos") !== null) {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   } else {
//     todos = [];
//   }

//   todos.push(todo);
//   localStorage.setItem("todos", JSON.stringify(todos));
// };

// const getTodos = () => {
//   let todos;

//   // if it HAS already an item, get it
//   if (localStorage.getItem("todos") !== null) {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   } else {
//     todos = [];
//   }

//   todos.forEach((todo) => {
//     createComponents(todo);
//   });
// };

// const removeLocalTodos = (todo) => {
//   let todos;

//   if (localStorage.getItem("todos") !== null) {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   } else {
//     todos = [];
//   }

//   const todoIndex = todo.children[0].innerText;
//   todos.splice(todos.indexOf(todoIndex), 1);
//   localStorage.setItem("todos", JSON.stringify(todos));
// };
</script>

<template>
  <main>
    <div className="App">
      <header>
        <h1>TODO List</h1>
      </header>

      <form @submit.prevent="handleFormSubmit">
        <input type="text" class="todo-input" v-model="todo" maxlength="40" />
        <button class="todo-button" type="button" @click="handleFormSubmit">
          <FontAwesomeIcon icon="fas fa-plus-square" />
        </button>
        <div class="select">
          <select name="todos" class="filter-todo" @change="filterTodo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div class="todo-container">
        <ul class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            :class="{
              todo: true,
              ' completed': todo.checked,
            }"
          >
            <li class="todo-item">{{ todo.text }}</li>
            <button class="check-btn" @click="handleCheckTodo(todo.id)">
              <font-awesome-icon icon="check" />
            </button>
            <button
              class="trash-btn"
              @click="(e) => handleDeleteTodo(e, todo.id)"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </ul>
      </div>
    </div>
  </main>
</template>
