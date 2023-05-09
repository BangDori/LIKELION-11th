import { activeEventListener } from "./event.js";
import { renderTimer } from "./timer.js";

// 초기화 함수
const init = () => {
  // 시간 활성화
  renderTimer();

  // 이벤트리스너 활성화
  activeEventListener();
};

init();
