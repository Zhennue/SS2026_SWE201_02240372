import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = `Tasks: ${tasks.length}`;
    console.log(`Task count updated: ${tasks.length}`);
  }, [tasks.length]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.done);
      case "completed":
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleEditTask = (taskId) => {
    const current = tasks.find((task) => task.id === taskId);
    if (!current) {
      return;
    }

    const nextTitle = window.prompt("Edit task title", current.title);
    if (!nextTitle || !nextTitle.trim()) {
      return;
    }

    dispatch({ type: "EDIT_TASK", id: taskId, title: nextTitle.trim() });
  };

  const boardClass = `task-board ${theme}`;

  return (
    <div className={boardClass}>
      <div className="ambient-shape" aria-hidden="true" />
      <main className="board-card">
        <Header />

        <TaskInput
          onAddTask={(task) => {
            dispatch({ type: "ADD_TASK", task: { ...task, done: false } });
          }}
        />

        <section className="toolbar">
          <p>Total tasks: {tasks.length}</p>
          <div className="toolbar-actions">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            >
              Clear completed
            </button>
          </div>
        </section>

        <ul className="task-list">
          {filteredTasks.map((task) => {
            const isNew = Date.now() - task.createdAt <= 5 * 60 * 1000;
            return (
              <li key={task.id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_DONE", id: task.id })
                    }
                  />
                  <span className={task.done ? "done" : ""}>
                    {task.title} ({task.priority})
                  </span>
                </label>
                <div className="task-meta">
                  {isNew && <span className="new-badge">new</span>}
                  <button type="button" onClick={() => handleEditTask(task.id)}>
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
