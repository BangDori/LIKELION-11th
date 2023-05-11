import {
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
  todos,
  toggleTodo,
} from "./todos.js";

const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const enter = document.querySelector(".enter");
const leftItems = document.querySelector(".left-items");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clear = document.getElementById("clear");

const ALL = "all"; // all 모드
const ACTIVE = "acitve"; // ACTIVE 모드
const COMPLETED = "completed";
let mode = "all"; // 현재 모드
let count = 0; // 할일의 개수

// 현재 렌더링되어 있는 TodoList 제거
function clearRendering() {
  count = 0;
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  leftItems.textContent = `🥕 오늘 할 일이 ${count}개 남았습니다 🥕`;
}

// TodoList 렌더링
function renderTodoList() {
  todos.forEach((todo) => {
    // 남은 할 일의 수 추가
    if (!todo.isDone) count++;

    // 모드에 따라 변경되는 View
    switch (mode) {
      case ACTIVE:
        if (todo.isDone) return;
        break;
      case COMPLETED:
        if (!todo.isDone) return;
        break;
      default:
        break;
    }

    const todoItem = document.createElement("div");
    todo.isDone // todo가 완료된 상태라면 checked 클래스를 추가
      ? todoItem.setAttribute("class", "todo-item checked")
      : todoItem.setAttribute("class", "todo-item");
    todoItem.setAttribute("id", todo.id);

    const checkbox = document.createElement("button");
    checkbox.setAttribute("class", "checkbox");
    checkbox.textContent = "✔︎";

    const content = document.createElement("input");
    content.setAttribute("class", "content");
    content.setAttribute("value", todo.text);
    content.disabled = true; // 입력 막기

    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delBtn");
    delBtn.textContent = "❌";

    todoItem.appendChild(checkbox);
    todoItem.appendChild(content);
    todoItem.appendChild(delBtn);

    todoList.appendChild(todoItem);
  });

  leftItems.textContent = `🥕 오늘 할 일이 ${count}개 남았습니다 🥕`;
}

// TodoList 렌더링
function reRenderTodoList() {
  clearRendering();
  renderTodoList();
}

/**
 * 화면에 보여질 모드를 선택하는 함수
 * @param {String} param 선택한 모드
 */
function selectButton(param) {
  mode = param;
  document.querySelector(".selected").classList.remove("selected");

  switch (param) {
    case ALL:
      all.classList.add("selected");
      break;
    case ACTIVE:
      active.classList.add("selected");
      break;
    case COMPLETED:
      completed.classList.add("selected");
      break;
    default:
      break;
  }
}

// 이벤트 리스너들을 활성화 시키는 함수
export function activeEventListener() {
  todoInput.focus(); // UX 향상

  // Create to Enter
  todoInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      createTodo(todoInput.value);
      todoInput.value = "";
      reRenderTodoList();
    }
  });

  // Create to Click
  enter.addEventListener("click", () => {
    createTodo(todoInput.value);
    todoInput.value = "";
    reRenderTodoList();
  });

  // Update
  todoList.addEventListener("dblclick", (e) => {
    if (e.target.className === "content") {
      const prevText = e.target.value;

      e.target.classList.add("edit-input");
      e.target.disabled = false;
      e.target.focus();

      e.target.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // enter 키를 입력할 경우 검증 후 업데이트
          updateTodo(e.target.parentElement.id, e.target.value);
          reRenderTodoList();

          e.target.classList.remove("edit-input");
          e.target.disabled = true;
        } else if (e.key === "Escape") {
          // esc 키를 입력할 경우, 업데이트 정보 제거
          e.target.classList.remove("edit-input");
          e.target.disabled = false;
          e.target.value = prevText;
          e.target.blur();
        }
      });
    }
  });

  // Toggle & Delete
  todoList.addEventListener("click", (e) => {
    if (e.target.className === "checkbox") {
      // toggleTodo
      toggleTodo(e.target.parentElement.id);
      reRenderTodoList();
    } else if (e.target.className === "delBtn") {
      // Delete
      deleteTodo(e.target.parentElement.id);
      reRenderTodoList();
    }
  });

  // Delete All
  clear.addEventListener("click", () => {
    deleteAll();
    clearRendering();
  });

  // All todos render
  all.addEventListener("click", (e) => {
    selectButton(ALL);
    reRenderTodoList();
  });

  // Active todos render
  active.addEventListener("click", (e) => {
    selectButton(ACTIVE);
    reRenderTodoList();
  });

  // Completed todos render
  completed.addEventListener("click", (e) => {
    selectButton(COMPLETED);
    reRenderTodoList();
  });
}
