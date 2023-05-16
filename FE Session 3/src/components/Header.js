import React from "react";

const Header = ({ title, onChangeMode }) => (
  <div>
    <h1>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onChangeMode("WELCOME");
        }}
      >
        {title}
      </a>
    </h1>
  </div>
);

export default Header;
