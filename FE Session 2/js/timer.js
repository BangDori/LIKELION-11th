const clock = document.getElementById("clock");

/**
 * 현재 시간 생성 함수
 * @returns 현재 시간, 분, 초
 */
function makeTimer() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, 0);
  const min = date.getMinutes().toString().padStart(2, 0);
  const sec = date.getSeconds().toString().padStart(2, 0);

  return { hour, min, sec };
}

// 타이머 활성화
const timer = setInterval(() => renderTimer(), 1000);

// 시간을 렌더링 해주기 위한 함수
export const renderTimer = () => {
  const { hour, min, sec } = makeTimer();
  clock.textContent = `${hour}:${min}:${sec}`;
};
