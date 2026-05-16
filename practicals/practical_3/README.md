# Student Profile App — Line-by-Line Code Explanation

---

## 1. `index.ts` — App Entry Point

```ts
import { registerRootComponent } from 'expo';
```
Imports a function from Expo that registers the root component of the app.

```ts
import App from './App';
```
Imports the main screen component from `App.tsx`.

```ts
registerRootComponent(App);
```
Tells React Native: "This is where the app starts." It internally calls `AppRegistry.registerComponent('main', () => App)` and sets up the Expo environment for both Expo Go and native builds.

---

## 2. `src/types/Student.ts` — TypeScript Types

```ts
export interface Student {
```
Defines a TypeScript **interface** called `Student`. An interface is a contract — it describes what fields an object must have and what type each field is.

```ts
  id: string;
```
The student's unique ID. The server creates and assigns this automatically (e.g. `"1"`, `"42"`).

```ts
  name: string;
```
The student's full name (e.g. `"Abebe Kebede"`).

```ts
  rollNo: string;
```
The university roll/registration number (e.g. `"BEse/2001/14"`).

```ts
  department: string;
```
The name of the student's department.

```ts
  email: string;
```
The student's email address.

```ts
  year: number;
```
The current academic year as a number (1–7).

```ts
  avatar: string;
```
A URL pointing to the student's profile photo.

```ts
export type CreateStudentInput = Omit<Student, "id">;
```
Creates a new type that is **exactly like `Student` but without the `id` field**. Used when creating or updating a student, because the server generates the `id` — you don't provide it yourself. `Omit<A, B>` is a built-in TypeScript helper that removes field `B` from type `A`.

---

## 3. `src/utils/auth.ts` — Authentication

```ts
const AUTH_URL = "https://reqres.in/api";
```
The base URL for the login API. `reqres.in` is a free fake API used for testing authentication flows.

```ts
let authToken: string | null = null;
```
A module-level variable that stores the login token after the user logs in. `string | null` means it can be a string (when logged in) or `null` (when not logged in). This lives in memory — it's lost when the app restarts.

```ts
export async function login(email: string, password: string): Promise<string> {
```
Defines an async function called `login` that takes an email and password, sends them to the server, and returns the token string. `async` means it can use `await` inside. `Promise<string>` means it eventually resolves to a string.

```ts
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
```
Sends an HTTP POST request to `/login`. `JSON.stringify()` converts the email/password object into a JSON string so it can travel over the network. `await` pauses here until the server responds.

```ts
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed. Check your credentials.");
  }
```
If the server returned an error (e.g. status 400 for wrong credentials), reads the error message from the response and throws it as an Error so the caller can catch it.

```ts
  const data = await response.json();
  authToken = data.token;
  return data.token;
```
Parses the JSON response (which looks like `{ "token": "QpwL5tke4Pnpja7X" }`), saves the token to the module variable, and returns it to the caller.

```ts
export function getToken(): string | null {
  return authToken;
}
```
Returns the currently stored token (or `null` if not logged in). Used by `studentApi.ts` to attach the token to API requests.

```ts
export function logout(): void {
  authToken = null;
}
```
Clears the token — effectively logs the user out of the app.

```ts
export function isAuthenticated(): boolean {
  return authToken !== null;
}
```
Returns `true` if a token exists (user is logged in), `false` otherwise.

---

## 4. `src/api/studentApi.ts` — API Layer

```ts
import { Student, CreateStudentInput } from "../types/Student";
import { getToken } from "../utils/auth";
```
Imports the TypeScript types and the `getToken` function so API calls can include the auth token.

```ts
const BASE_URL = "https://69ecd736af4ff533142b7203.mockapi.io";
```
The base URL for the student data API. This is a MockAPI.io project — a free service that acts as a fake backend with a real database.

```ts
function getHeaders(): { [key: string]: string } {
```
Defines a helper function that builds and returns the HTTP headers for every request. The return type `{ [key: string]: string }` means an object where every key and value are strings.

```ts
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
```
Starts with the `Content-Type` header, which tells the server the request body is JSON.

```ts
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
```
Gets the auth token. If one exists, adds it as an `Authorization` header using the standard `Bearer` format. The server can use this to verify the user's identity.

```ts
async function sendRequest<T>(url: string, options?: RequestInit): Promise<T> {
```
A generic helper function. `<T>` is a **type parameter** — it lets TypeScript know what type the response will be (e.g. `Student`, `Student[]`). `options?` means the options are optional. `RequestInit` is the built-in type for `fetch` options.

```ts
  const response = await fetch(url, {
    ...options,
    headers: getHeaders(),
  });
```
Calls `fetch` with the given URL and options. `...options` spreads in any extra settings (like `method: "POST"`). The headers are always added on top.

```ts
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
```
If the server responds with an error code (4xx or 5xx), throws an error. Otherwise, parses and returns the JSON body as type `T`.

```ts
export async function getAllStudents(): Promise<Student[]> {
  return sendRequest<Student[]>(`${BASE_URL}/students`);
}
```
Makes a GET request to `/students` and returns an array of all students. `Promise<Student[]>` means it resolves to an array of Student objects.

```ts
export async function getStudentById(id: string): Promise<Student> {
  return sendRequest<Student>(`${BASE_URL}/students/${id}`);
}
```
Makes a GET request to `/students/{id}` and returns a single student.

```ts
export async function createStudent(studentData: CreateStudentInput): Promise<Student> {
  return sendRequest<Student>(`${BASE_URL}/students`, {
    method: "POST",
    body: JSON.stringify(studentData),
  });
}
```
Makes a POST request to create a new student. Sends the student data in the request body as JSON. The server creates the record, assigns an `id`, and returns the full Student object.

```ts
export async function updateStudent(id: string, studentData: CreateStudentInput): Promise<Student> {
  return sendRequest<Student>(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(studentData),
  });
}
```
Makes a PUT request to replace a student's data entirely. The `id` goes in the URL to identify which student to update.

```ts
export async function deleteStudent(id: string): Promise<void> {
  await sendRequest(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
}
```
Makes a DELETE request to remove a student from the database. `Promise<void>` means the function doesn't return any value — it just completes (or throws an error).

---

## 5. `src/components/StudentCard.tsx` — Card Component

```ts
interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onPress: (student: Student) => void;
}
```
Defines the props (inputs) the card component needs:
- `student` — the data to display
- `onEdit` — called when "Edit" button is tapped
- `onDelete` — called when user confirms deletion
- `onPress` — called when anywhere on the card is tapped

```ts
function handleDelete() {
  Alert.alert(
    "Delete Student",
    `Are you sure you want to delete ${student.name}?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(student.id) },
    ],
  );
}
```
Shows a native confirmation popup before deleting. If the user taps "Cancel", nothing happens. If they tap "Delete", it calls `onDelete` with the student's ID. This prevents accidental deletions.

```ts
<TouchableOpacity style={styles.card} onPress={() => onPress(student)}>
```
Wraps the entire card in a pressable container. When tapped anywhere on the card, it calls `onPress` with the student — which triggers a details popup in `App.tsx`.

```ts
<Image source={{ uri: student.avatar }} style={styles.avatar} />
```
Displays the student's profile photo. `uri` means it loads the image from a remote URL.

```ts
<View style={styles.info}>
  <Text style={styles.name}>{student.name}</Text>
  <Text style={styles.department}>{student.department}</Text>
</View>
```
The middle section of the card showing the student's name in bold and their department below it. `flex: 1` in the styles makes this section grow to fill the available horizontal space.

```ts
<TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(student)}>
```
The blue "Edit" button. `[styles.button, styles.editButton]` applies two style objects — base button styles plus edit-specific (blue) color.

```ts
borderRadius: 25,
```
Makes the avatar image a perfect circle (half of the 50px width/height).

```ts
elevation: 3,
```
Adds a drop shadow on Android. On iOS the shadow is done with `shadowColor`, `shadowOffset`, etc.

---

## 6. `src/components/StudentForm.tsx` — Form Component

```ts
interface StudentFormProps {
  initialData?: Student | null;
  onSubmit: (data: CreateStudentInput) => void;
  onCancel: () => void;
  loading: boolean;
}
```
`initialData?` — the `?` means this prop is optional. When provided, the form pre-fills with that student's data (edit mode). When absent, the form starts empty (add mode). `loading` controls whether the submit button shows a spinner.

```ts
const [name, setName] = useState("");
const [rollNo, setRollNo] = useState("");
// ...
```
Each form field has its own state variable. `useState("")` initializes each as an empty string. When the user types, `setName` etc. update the state and React re-renders the input with the new value.

```ts
const [errors, setErrors] = useState<{ [field: string]: string }>({});
```
Stores validation errors as an object, e.g. `{ name: "Name is required", email: "Enter a valid email" }`. Starts empty (no errors).

```ts
useEffect(() => {
  if (initialData) {
    setName(initialData.name);
    setRollNo(initialData.rollNo);
    // ...
  }
}, [initialData]);
```
`useEffect` runs after the component renders. The `[initialData]` dependency array means it only runs when `initialData` changes. If editing a student, this fills all the form fields with their current data.

```ts
function validate(): boolean {
  const newErrors: { [field: string]: string } = {};

  if (!name.trim()) newErrors.name = "Name is required";
```
`.trim()` removes leading/trailing spaces. If the field is empty after trimming, an error message is stored for that field.

```ts
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email address";
  }
```
A **regular expression** that checks if the email looks valid. `\S+` means "one or more non-whitespace characters." It checks for the pattern: `something@something.something`.

```ts
  } else if (isNaN(Number(year)) || Number(year) < 1 || Number(year) > 7) {
    newErrors.year = "Year must be between 1 and 7";
  }
```
`Number(year)` converts the string to a number. `isNaN` checks if it's not a valid number. The condition rejects anything that isn't a number between 1 and 7.

```ts
  return Object.keys(newErrors).length === 0;
```
`Object.keys()` returns an array of all the keys in `newErrors`. If it's empty (length 0), there are no errors and validation passes — returns `true`.

```ts
function handleSubmit() {
  if (!validate()) return;

  onSubmit({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    year: Number(year),
    avatar: initialData?.avatar || "https://i.pravatar.cc/150",
  });
}
```
If validation fails, stops immediately. Otherwise, passes cleaned data to the parent. `.toLowerCase()` normalizes the email. `initialData?.avatar` keeps the existing photo when editing (`?.` safely accesses a property that might be `null`). If adding new, uses a placeholder avatar URL.

```ts
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
```
A wrapper that moves the form up when the keyboard opens, so inputs aren't hidden. The behavior is different on iOS vs Android — `Platform.OS` checks which one.

```ts
<Text style={[styles.input, errors.name && styles.inputError]}>
```
Applies the base `input` style always, and adds the red-border `inputError` style only when `errors.name` has a value. `&&` short-circuits: if `errors.name` is falsy (empty string / undefined), the second style is not added.

```ts
{errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
```
Only renders the error message `<Text>` if `errors.name` has a value. This is conditional rendering using the `&&` operator.

```ts
<TouchableOpacity ... disabled={loading}>
  {loading ? <ActivityIndicator color="#FFF" /> : <Text>Add Student</Text>}
</TouchableOpacity>
```
When `loading` is true, the button is disabled and shows a spinner. When false, it shows the button text. The ternary operator `condition ? a : b` picks between two JSX elements.

---

## 7. `App.tsx` — Main Screen

```ts
import { useState, useEffect } from "react";
```
`useState` manages reactive data (re-renders when changed). `useEffect` runs side effects (like API calls) after renders.

```ts
import { FlatList, Modal, RefreshControl, SafeAreaView, ... } from "react-native";
```
React Native components. `FlatList` is an efficient scrollable list. `Modal` is a popup overlay. `RefreshControl` is the pull-to-refresh indicator. `SafeAreaView` prevents content from going behind the phone's notch or status bar.

```ts
const [students, setStudents] = useState<Student[]>([]);
```
The list of students displayed on screen. Starts as an empty array `[]`. `<Student[]>` tells TypeScript this state holds an array of Student objects.

```ts
const [loading, setLoading] = useState<boolean>(true);
```
Starts as `true` so the loading spinner shows immediately when the app opens. Set to `false` after the first data fetch completes.

```ts
const [editingStudent, setEditingStudent] = useState<Student | null>(null);
```
Tracks which student is currently being edited. `null` means the form is in "Add" mode. When set to a Student object, the form switches to "Edit" mode.

```ts
useEffect(() => {
  loadStudents();
}, []);
```
The empty `[]` dependency array means this runs only **once**, right after the component first renders — like `componentDidMount` in class components. It kicks off the initial data fetch.

```ts
async function loadStudents() {
  try {
    setError(null);
    const data = await getAllStudents();
    setStudents(data);
  } catch (err) {
    setError("Failed to load students. Please try again.");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}
```
Fetches all students from the API. `try/catch` handles errors gracefully. The `finally` block runs whether the request succeeded or failed — it always stops the loading spinners.

```ts
async function handleCreate(data: CreateStudentInput) {
  const newStudent = await createStudent(data);
  setStudents([newStudent, ...students]);
}
```
`[newStudent, ...students]` creates a new array with the new student at position 0, followed by all existing students. This puts new students at the top of the list. React detects the new array and re-renders the list.

```ts
const updatedList = students.map((student) =>
  student.id === updatedStudent.id ? updatedStudent : student
);
setStudents(updatedList);
```
Goes through every student in the array. If a student's ID matches the updated one, replaces it with the new data. Otherwise keeps the original. This updates just that one card without re-fetching everything.

```ts
const updatedList = students.filter((student) => student.id !== id);
setStudents(updatedList);
```
`filter` returns a new array containing only students whose ID does **not** match the deleted one. React re-renders and that student's card disappears.

```ts
<FlatList
  data={students}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <StudentCard student={item} onEdit={handleEdit} onDelete={handleDelete} onPress={handleViewDetails} />
  )}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  ListEmptyComponent={<Text>No students found.</Text>}
/>
```
`FlatList` efficiently renders long lists — it only renders items visible on screen.
- `data` — the array to display
- `keyExtractor` — gives each item a unique key (required for React's reconciliation)
- `renderItem` — how to render each item (returns a `StudentCard`)
- `refreshControl` — adds pull-to-refresh gesture
- `ListEmptyComponent` — shown when `data` is an empty array

```ts
<Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
  <StudentForm
    initialData={editingStudent}
    onSubmit={editingStudent ? handleUpdate : handleCreate}
    onCancel={handleCancel}
    loading={submitting}
  />
</Modal>
```
A slide-up modal containing the form. `visible={showForm}` shows/hides it. `onSubmit` dynamically picks the right function: if `editingStudent` is set, it updates; otherwise it creates. This is a ternary operator used as a prop value.

```ts
<TouchableOpacity
  style={styles.fab}
  onPress={() => {
    setEditingStudent(null);
    setShowForm(true);
  }}
>
  <Text style={styles.fabText}>+</Text>
</TouchableOpacity>
```
The floating "+" button fixed to the bottom-right corner. Tapping it clears `editingStudent` (ensures Add mode, not Edit) and opens the form modal.

```ts
position: "absolute",
bottom: 20,
right: 20,
borderRadius: 28,
```
`position: "absolute"` takes the button out of the normal layout flow and places it relative to its parent. `borderRadius: 28` (half of the 56px width/height) makes it a perfect circle.

---

## How the Files Connect

```
index.ts
  └── registers App.tsx as the root

App.tsx  (main state, orchestrates everything)
  ├── calls studentApi.ts  for all CRUD operations
  ├── studentApi.ts        uses auth.ts to get the token for headers
  ├── renders StudentCard  for each student in the list
  └── renders StudentForm  inside a Modal for add/edit

types/Student.ts  (shared shape used by all files above)
```

**Data flow for creating a student:**
1. User taps `+` → `App.tsx` sets `showForm = true`
2. `StudentForm` renders inside `Modal`
3. User fills fields → taps "Add Student"
4. `StudentForm.validate()` checks inputs
5. If valid: calls `onSubmit(data)` → which is `handleCreate` in `App.tsx`
6. `App.tsx` calls `createStudent(data)` from `studentApi.ts`
7. `studentApi.ts` calls `getHeaders()` (gets token from `auth.ts`) then calls `fetch`
8. Server responds → new student added to `students` state
9. `FlatList` re-renders and shows the new card