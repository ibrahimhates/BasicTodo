import { useEffect, useState } from "react";
import TaskList from "./TaskList";

export interface Todo {
  title: string;
  id: string;
  complate: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const jsonTodos = localStorage.getItem('todos');
    if(jsonTodos !== null){
      const objectTodos:Todo[] = JSON.parse(jsonTodos);
      setTodos(objectTodos);
    }
  },[])

  const storgeLocal = (storgeData:Todo[]) => {
    const stringfy = JSON.stringify(storgeData);
    localStorage.setItem('todos',stringfy);
  }

  const createTodoData = () => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title: data, complate: false },
    ]);

    setData("");

    storgeLocal([
      ...todos,
      { id: crypto.randomUUID(), title: data, complate: false },
    ]);
  };

  const setComplate = (id: string, complate: boolean) => {
    const updatedTodos: Todo[] = todos?.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complate };
      }
      return todo;
    });
    setTodos(updatedTodos);
    storgeLocal(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
    storgeLocal(filterTodos);
  };

  return (
    <div className="d-flex flex-column align-items-center gap-4">
      <div className="card col-md-4">
        <div className="card-header">
          <h2 className="card-title text-gray-600">Create New Task</h2>
        </div>
        <div className="card-body form-control d-inline">
          <div className="col-md-12 mb-3">
            <label className="label">Task Name</label>
            <input
              type="text"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-primary" onClick={createTodoData}>
            Add Task
          </button>
        </div>
      </div>
      <TaskList
        todos={todos!}
        setComplate={setComplate}
        deleteTodo={deleteTodo}
      ></TaskList>
    </div>
  );
};

export default App;
