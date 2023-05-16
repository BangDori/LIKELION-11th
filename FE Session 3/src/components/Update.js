import React from "react";
import Form from "./Form";

const Update = ({ title, body, onUpdate }) => {
  const handleSubmit = (newTitle, newBody) => onUpdate(newTitle, newBody);

  return <Form title={title} body={body} onSubmit={handleSubmit} />;
};

export default Update;
