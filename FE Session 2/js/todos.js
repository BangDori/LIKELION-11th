export const todos = [];
let todoId = 1; // todo 아이디 (고유값)

/**
 * Todo 생성 함수
 * @param {String} todo 할 일
 * @returns 유효성 검사 실패 및 중복시 에러 반환
 */
export function createTodo(todo) {
  // 유효성 검사
  if (!validateTodo(todo)) {
    alert("Validation Error");
    return;
  }

  // 중복되는 요소가 하나라도 존재하는지 검사
  const isDuplicate = todos.some((t) => t.text === todo);
  if (isDuplicate) {
    alert("Duplication Error");
    return;
  }

  // 할일 목록에 추가
  todos.unshift({
    id: todoId++,
    text: todo,
    isDone: false,
  });
}

/**
 * Todo 토글 함수
 * @param {Number} id 토글 처리할 id
 */
export function toggleTodo(id) {
  todos.filter((todo) =>
    todo.id === Number(id) ? (todo.isDone = !todo.isDone) : todo.isDone
  );
}

/**
 * Todo 수정 함수
 * @param {Number} id 수정할 id
 * @param {String} text 할 일
 * @returns
 */
export function updateTodo(id, text) {
  // 유효성 검사
  if (!validateTodo(text)) {
    alert("Validation Error");
    return;
  }

  // 중복되는 요소가 하나라도 존재하는지 검사
  const isDuplicate = todos.some((t) => t.text === text && t.id !== Number(id));
  if (isDuplicate) {
    alert("Duplication Error");
    return;
  }

  todos.filter((todo) =>
    todo.id === Number(id) ? (todo.text = text) : todo.text
  );
}

/**
 * Todo 삭제 함수
 * @param {Number} id 삭제할 id
 */
export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === Number(id));
  todos.splice(index, 1);
}

/**
 * TodoList 삭제 함수
 * @returns 삭제할 항목이 없다면 에러 반환
 */
export function deleteAll() {
  if (todos.length === 0) {
    alert("Empty Todos");
    return;
  }

  todos.splice(0);
}

/**
 * Todo 입력에 대한 유효성 검증을 위한 함수
 * @param {String} todo 할 일
 * @returns 유효성 검증 여부
 */
function validateTodo(todo) {
  if (todo.trim().length === 0) return false;
  return true;
}
