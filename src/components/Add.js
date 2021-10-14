import React, { useContext, useState } from "react";
import { mainContext } from "../contexts/MainContext";

const Add = () => {
  const [todo, setTodo] = useState({
    id: Date.now(),
    title: "",
  });

  const { addTodo } = useContext(mainContext);

  function handleChange(e) {
    setTodo({
      ...todo,
      title: e.target.value,
    });
  }

  function handleClick() {
    addTodo(todo);
    setTodo({
      id: Date.now(),
      title: "",
    });
  }
  return (
    <div>
      <div>
        <input onChange={handleChange} type="text" />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default Add;
