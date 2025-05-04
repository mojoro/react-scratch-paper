import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useMemo,
  useCallback,
  useRef,
  createContext,
  forwardRef,
  useImperativeHandle,
} from "react";

// Context for user data
const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, text: "Learn React", done: false },
        { id: 2, text: "Build Project", done: false },
      ]);
    }, 1000);
  }, []);
  return tasks;
};

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return (
    <input
      ref={inputRef}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
      }}
      {...props}
    />
  );
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) return <div>Something went wrong.</div>;
    return this.props.children;
  }
}

export default function AdvancedDashboard() {
  const [user, dispatch] = useReducer(userReducer, {
    name: "John Doe",
    email: "john@example.com",
  });

  const tasks = useFetchTasks();
  const inputRef = useRef();
  const [newTask, setNewTask] = useState("");

  const incompleteTasks = useMemo(() => tasks.filter((t) => !t.done), [tasks]);

  const addTask = useCallback(() => {
    if (!newTask) return;
    tasks.push({ id: Date.now(), text: newTask, done: false });
    setNewTask("");
  }, [newTask, tasks]);

  return (
    <ErrorBoundary>
      <UserContext.Provider value={{ user, dispatch }}>
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              User Info
            </h2>
            <div style={{ marginBottom: "8px" }}>Name: {user.name}</div>
            <div style={{ marginBottom: "8px" }}>Email: {user.email}</div>
            <button
              onClick={() =>
                dispatch({ type: "UPDATE", payload: { name: "Jane Doe" } })
              }
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
              }}
            >
              Change Name
            </button>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Tasks
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              {incompleteTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  {task.text}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <FancyInput
                ref={inputRef}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
              />
              <button
                onClick={addTask}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                }}
              >
                Add
              </button>
              <button
                onClick={() => inputRef.current.focus()}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                }}
              >
                Focus Input
              </button>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}
