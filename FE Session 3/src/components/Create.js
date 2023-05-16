import React from "react";
import Form from "./Form";

const Create = ({ onCreate }) => {
  const handleSubmit = (title, body) => onCreate(title, body);

  return <Form onSubmit={handleSubmit} />;
};

export default Create;
