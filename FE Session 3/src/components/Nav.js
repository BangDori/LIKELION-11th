import React from "react";

const Nav = ({ topics, onChangeMode }) => (
  <div>
    <ol>
      {topics.map((topic) => (
        <li key={topic.id}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onChangeMode(topic.id);
            }}
          >
            {topic.title}
          </a>
        </li>
      ))}
    </ol>
  </div>
);

export default Nav;
