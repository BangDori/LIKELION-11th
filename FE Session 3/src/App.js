import { useState } from "react";
import { Header, Nav, Article, Create, Update } from "./components/Index";

const WELCOME = "WELCOME";
const READ = "READ";
const CREATE = "CREATE";
const UPDATE = "UPDATE";

const App = () => {
  const [mode, setMode] = useState(WELCOME);
  const [selectedId, setSelectedId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: "HTML", body: "HTML is markup language." },
    { id: 2, title: "CSS", body: "CSS is awesome." },
    { id: 3, title: "JavaScript", body: "JavaScript is programming language." },
  ]);

  /**
   * Topic 클릭
   * @param {Number} topicId 선택한 Topic id
   */
  const handleTopicClick = (topicId) => {
    setSelectedId(topicId);
    setMode(READ);
  };

  /**
   * Topic 생성
   * @param {String} title 제목
   * @param {String} body 본문
   */
  const handleCreate = (title, body) => {
    setTopics((prevTopics) => [...prevTopics, { id: nextId, title, body }]);
    setNextId((prevId) => prevId + 1);
    setMode(WELCOME);
  };

  /**
   * Topic 수정
   * @param {String} title 수정된 제목
   * @param {String} body 수정된 본문
   */
  const handleUpdate = (title, body) => {
    const newTopics = topics.map((topic) =>
      topic.id === selectedId ? { ...topic, title, body } : topic
    );

    setTopics(newTopics);
    setMode(WELCOME);
  };

  let content = null;
  let contextControl = null;
  let topic = null;

  switch (mode) {
    case WELCOME:
      content = <Article title="Welcome" body="Hello, WEB" />;
      break;
    case READ:
      topic = topics.find((topic) => topic.id === selectedId);
      content = <Article title={topic.title} body={topic.body} />;
      contextControl = (
        <li>
          <a
            href={"/update/" + selectedId}
            onClick={(e) => {
              e.preventDefault();
              setMode(UPDATE);
            }}
          >
            Update
          </a>
        </li>
      );
      break;
    case CREATE:
      content = <Create onCreate={handleCreate} />;
      break;
    case UPDATE:
      topic = topics.find((topic) => topic.id === selectedId);
      content = (
        <Update title={topic.title} body={topic.body} onUpdate={handleUpdate} />
      );
      break;
    default:
      break;
  }

  return (
    <div>
      <Header
        title="React"
        onChangeMode={() => {
          setMode(WELCOME);
          setSelectedId(null);
        }}
      />
      <Nav topics={topics} onChangeMode={handleTopicClick} />

      {content}

      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode(CREATE);
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
};

export default App;
