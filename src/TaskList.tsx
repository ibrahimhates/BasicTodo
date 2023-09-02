import { Todo } from "./App";

type Props = {
  todos: Todo[];
  setComplate: (id: string,complate:boolean) => void;
  deleteTodo:(id:string) => void
};

const TaskList = ({ todos, setComplate,deleteTodo}: Props) => {
  return (
    <div className="card col-md-4">
      <div className="card-header">
        <h2 className="card-title">Task List</h2>
      </div>
      {todos &&
        todos.map((todo) => {
          return (
            <div className="card-body form-control d-grid">
              <div className="col-md-12 d-flex justify-content-between">
                <label className="label">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={todo.complate}
                    onChange={(e) => setComplate(todo.id,e.target.checked)}
                  />
                  {todo.title}
                </label>
                  <button className="btn btn-danger border" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      <div className="card-footer d-flex justify-content-end"></div>
    </div>
  );
};

export default TaskList;
