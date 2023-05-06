const titleContainer = document.querySelector(".title-container");
const titleBtn = document.querySelector("#startBtn");
const questionContainer = document.querySelector(".question-container");
const question = document.querySelector("#question");
const type = document.querySelector("#type");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const EI = document.querySelector("#EI");
const SN = document.querySelector("#SN");
const TF = document.querySelector("#TF");
const JS = document.querySelector("#JP");
const pro = document.querySelector(".progress-bar");
const MBTI = document.querySelector("#mbti");
const explain = document.querySelector("#explain");
const image = document.querySelector("#result-img");
const resultContainer = document.querySelector(".result-container");
const progressNumber = document.querySelector(".progress-number");
const resetBtn = document.querySelector("#resetBtn");

const START = "start"; // 시작
const RESULT = "result"; // 결과
const RESET = "reset"; // 초기화

const questions = {
  1: {
    title: "모임에서 나의 역할은?",
    type: "EI",
    A: "주로 분위기를 이끈다.", // E
    B: "리액션을 해주며 즐긴다.", // I
  },
  2: {
    title: "모임 후 아무도 없는 집에 돌아오면",
    type: "EI",
    A: "외롭다.", // E
    B: "편안하다.", // I
  },
  3: {
    title: "우울해서 집에 있으면",
    type: "EI",
    A: "더 우울해짐", // E
    B: "우울함이 해소되어 사라짐", // I
  },
  4: {
    title: "노래 들을 때 더 좋아하는 것은?",
    type: "SN",
    A: "가사", // N
    B: "멜로디", // S
  },
  5: {
    title: "풍선을 보면 떠오르는 생각은?",
    type: "SN",
    A: "풍선 타고 날아 보고 싶다.", // N
    B: "불기 힘들다.", // S
  },
  6: {
    title: "내일 지구가 멸망한다면?",
    type: "SN",
    A: "뭐부터 해야 하지?", // N
    B: "그럴리가 없다.", // S
  },
  7: {
    title: "누군가 본인을 싫어하는 것을 알았을 때 반응은?",
    type: "TF",
    A: "? 왜 나를 싫어하지? 싫어하든지 말든지", // T
    B: "나를 왜 싫어하지...?ㅠㅠ 내가 기분나쁘게 한 적 있나?", // F
  },
  8: {
    title: "난 니가 그냥 좋아",
    type: "TF",
    A: "나를 왜?", // T
    B: "감동이야..", // F
  },
  9: {
    title: "자기야 우리 헤어져",
    type: "TF",
    A: "알겠어.. 근데 이유가 뭐야?", // T
    B: "내가 잘못했어. 다시 잘해보자", // F
  },
  10: {
    title: "약속시간이 변경되었을 때",
    type: "JP",
    A: "화가 난다.", // J
    B: "그러려니 한다.", // P
  },
  11: {
    title: "친구가 갑자기 전화했을 때",
    type: "JP",
    A: "받지 않는다.", // J
    B: "받는다", // P
  },
  12: {
    title: "여행은?",
    type: "JP",
    A: "계획짜고 1박2일", // J
    B: "무계획 무박2일", // P
  },
};
const results = {
  ISTJ: { animal: "거북이", img: "turtle.png" },
  ISFJ: { animal: "코뿔소", img: "rhinoceros.png" },
  INFJ: { animal: "팬더", img: "panda.png" },
  INTJ: { animal: "호랑이", img: "tiger.png" },
  ISTP: { animal: "뱀", img: "snake.png" },
  ISFP: { animal: "고양이", img: "cat.png" },
  INFP: { animal: "물개", img: "seal.png" },
  INTP: { animal: "부엉이", img: "owl.png" },
  ESTP: { animal: "하이에나", img: "hyena.png" },
  ESFP: { animal: "돌고래", img: "dolphin.png" },
  ENFP: { animal: "침팬지", img: "chimpanzee.png" },
  ENTP: { animal: "앵무새", img: "parrot.png" },
  ESTJ: { animal: "늑대", img: "wolf.png" },
  ESFJ: { animal: "코끼리", img: "elephant.png" },
  ENFJ: { animal: "강아지", img: "dog.png" },
  ENTJ: { animal: "사자", img: "lion.png" },
};

let questionNum = 1;
let mbti = "";

const changePage = (move) => {
  switch (move) {
    case START:
      titleContainer.style.display = "none";
      questionContainer.style.display = "block";
      break;
    case RESULT:
      questionContainer.style.display = "none";
      resultContainer.style.display = "block";
      break;
    case RESET:
      titleContainer.style.display = "flex";
      resultContainer.style.display = "none";
      break;
    default:
      break;
  }
};

const updateQuestion = () => {
  if (questionNum === 13) {
    changePage(RESULT);

    mbti += Number(EI.value) > 2 ? "E" : "I";
    mbti += Number(SN.value) > 2 ? "S" : "N";
    mbti += Number(TF.value) > 2 ? "T" : "F";
    mbti += Number(JP.value) > 2 ? "J" : "P";

    MBTI.textContent = mbti;
    image.setAttribute("src", `img/${results[mbti].img}`);
    explain.textContent = `당신의 MBTI는 ${mbti}이며 ${results[mbti].animal}와 유사합니다!`;

    return;
  }

  question.textContent = questions[questionNum].title;
  type.textContent = questions[questionNum].type;
  yesBtn.textContent = questions[questionNum].A;
  noBtn.textContent = questions[questionNum].B;
  pro.style.width = `calc(100/12 * ${questionNum - 1}%)`;
  progressNumber.textContent = `${questionNum}/12`;

  questionNum++;
};

titleBtn.addEventListener("click", () => {
  changePage(START);
  updateQuestion();
});

yesBtn.addEventListener("click", () => {
  switch (type.textContent) {
    case "EI":
      EI.value = Number(EI.value) + 1;
      break;
    case "SN":
      SN.value = Number(SN.value) + 1;
      break;
    case "TF":
      TF.value = Number(TF.value) + 1;
      break;
    case "JP":
      JP.value = Number(JP.value) + 1;
      break;
    default:
      break;
  }

  updateQuestion();
});

noBtn.addEventListener("click", updateQuestion);

resetBtn.addEventListener("click", () => {
  questionNum = 1;
  mbti = "";
  EI.value = 0;
  SN.value = 0;
  TF.value = 0;
  JP.value = 0;
  progressNumber.textContent = `${questionNum}/12`;

  changePage(RESET);
});
