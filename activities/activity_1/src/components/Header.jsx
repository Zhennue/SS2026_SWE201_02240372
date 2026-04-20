import React from "react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import Clock from "./LiveClock";

function Header() {
  const { theme } = useTheme();

  return (
    <header className={`board-header ${theme}`}>
      <div>
        <h1>Reactive Task Board</h1>
        <p>State and side effects with React hooks</p>
      </div>
      <div className="header-tools">
        <Clock />
        <ThemeToggleButton />
      </div>
    </header>
  );
}

export default Header;
