import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      priority,
      done: false,
      createdAt: Date.now(),
    });

    setTitle("");
    setPriority("normal");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
      <button type="button" onClick={() => setTitle("")}>
        Clear
      </button>

      <p className="preview">
        Preview: <strong>{title || "(empty)"}</strong> (priority: {priority})
      </p>
    </form>
  );
}

export default TaskInput;
