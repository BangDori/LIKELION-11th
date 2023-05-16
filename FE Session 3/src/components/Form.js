import React, { useState } from "react";

const Form = ({ title, body, onSubmit }) => {
  const [enteredTitle, setEnteredTitle] = useState(title || "");
  const [enteredBody, setEnteredBody] = useState(body || "");

  const handleChangTitle = (e) => setEnteredTitle(e.target.value);
  const handleChangeBody = (e) => setEnteredBody(e.target.value);

  /**
   * Topic 제출
   * @param {Event} e
   * @returns 빈 칸 존재시
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredTitle.trim().length === 0 || enteredBody.trim().length === 0) {
      alert("빈 칸이 존재합니다.");
      return;
    }

    onSubmit(enteredTitle, enteredBody);
    setEnteredTitle("");
    setEnteredBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          placeholder="Input Title ..."
          value={enteredTitle}
          onChange={handleChangTitle}
        />
      </p>
      <p>
        <textarea
          cols={21}
          rows={10}
          placeholder="Input Body ..."
          value={enteredBody}
          onChange={handleChangeBody}
        />
      </p>
      <button>등록하기</button>
    </form>
  );
};

export default Form;
