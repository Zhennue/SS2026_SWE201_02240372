# Activity 1: Reactive Task Board

## Overview

This lab guides students through React hooks in one cohesive mini app.

Title: Reactive Task Board: State and Side Effects with Hooks
Duration: 2-3 hours
Audience: B.E. Software Engineering (Year 2)

By the end of this lab, students will use:

- useState for local component state
- useEffect for side effects (localStorage, document title, timers)
- useContext for theme sharing without prop drilling
- useReducer for predictable state transitions
- custom hooks for reusable logic

## Quick Start

1. Open this folder in terminal.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open the URL shown in terminal (usually http://localhost:5173).

## Learning Flow

### Phase 1: useState (Task input)

File focus: `src/components/TaskInput.jsx`

Students should identify:

- `title` and `priority` state
- controlled input/select elements
- clear/reset behavior
- submit callback to parent

Exercise:

- Add validation to block titles shorter than 3 characters.

### Phase 2: useEffect (Side effects)

File focus: `src/App.jsx`, `src/components/LiveClock.jsx`

Students should identify:

- document title syncing with task count
- console logging when task count changes
- timer setup and cleanup in `LiveClock`

Exercise:

- Add another effect to log when filter changes.

### Phase 3: useContext (Theme sharing)

File focus: `src/context/ThemeContext.jsx`, `src/components/ThemeToggleButton.jsx`, `src/components/Header.jsx`

Students should identify:

- context creation and provider
- custom hook `useTheme`
- shared theme state consumed by multiple components

Exercise:

- Make task item borders use theme-specific colors.

### Phase 4: useReducer (Complex task transitions)

File focus: `src/reducers/taskReducer.js`, `src/App.jsx`

Current actions:

- `LOAD_FROM_STORAGE`
- `ADD_TASK`
- `TOGGLE_DONE`
- `EDIT_TASK`
- `CLEAR_COMPLETED`

Exercise:

- Add `DELETE_TASK` action and UI button per task.

### Phase 5: Custom hooks

File focus: `src/hooks/useTasks.js`, `src/hooks/useLocalStorageState.js`

Students should identify:

- reducer + persistence abstraction in `useTasks`
- generic reusable persistence in `useLocalStorageState`

Exercise:

- Replace `useTasks` with `useLocalStorageState` in a simplified App variant and compare both approaches.

## Built-in Extension Tasks Included

- Filtering: All / Active / Completed
- Created-at timestamp with "new" badge (last 5 minutes)
- Live clock with interval and cleanup

## Common Mistakes to Discuss

- Mutating reducer state directly instead of returning new objects/arrays.
- Missing or incorrect effect dependencies.
- Using context hook outside its provider.
- Putting side effects in reducer functions.
- Calling hooks conditionally.

## Suggested Assessment Checklist

A student can:

- explain useState vs useReducer choice
- use useEffect with correct dependencies and cleanup
- build and consume a context provider/hook pair
- write reducer actions and pure transitions
- extract repeated logic into a custom hook

## File Map

- `src/App.jsx`: Main board and hook integration
- `src/components/TaskInput.jsx`: `useState` form component
- `src/components/Header.jsx`: Context consumer + page heading
- `src/components/ThemeToggleButton.jsx`: Theme switcher
- `src/components/LiveClock.jsx`: Timer effect with cleanup
- `src/context/ThemeContext.jsx`: Provider + `useTheme`
- `src/reducers/taskReducer.js`: Reducer and action handling
- `src/hooks/useTasks.js`: Custom hook (reducer + storage sync)
- `src/hooks/useLocalStorageState.js`: Generic localStorage hook
- `src/styles.css`: Intentional visual style for desktop/mobile
