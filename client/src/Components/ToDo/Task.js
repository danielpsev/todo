import React from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
export default function Task(props) {
  const { id, text, status, changeStatus, deleteTask, editTask, setEditTask, obj } = props;

  let div_status_class = status ? " table-success " : " table-warning ";
  let del_btn_status_class = status
    ? " btn-outline-success disabled "
    : "btn-outline-primary ";

  let editTask_class = editTask.id == obj.id ? 'active' : '';
  
  return (
    <tr className={`p2 mt-3 bg-opacity-10 ${editTask_class}` }>
      <td className={"text-center text-dark " + div_status_class}>
        <b style={{ fontSize: 25 }} >
          {status ? <FaRegCheckCircle /> : <FaRegCircle style={{cursor: 'pointer'}} onClick={() => changeStatus(id)}/>}
        </b>
      </td>
      <td>{text}</td>
      <td className="buttons-container">
        <button
          className={"btn   mt-2 " + del_btn_status_class}
          onClick={() => changeStatus(id)}
        >
          {status ? "Done" : "Check"}
        </button>
        {

         !status && editTask.id != id ? <button
          className={"btn  mx-2 mt-2 btn-outline-dark"}
          onClick={() => setEditTask(obj)}
          >
            Edit
          </button>  : null
        }
        {
        !status && editTask.id == id ? <button
        className={"btn  mx-2 mt-2 btn-outline-dark" }
        onClick={() => setEditTask({
          id: '',
          task: '',
          status: ''
        })}
        >
          Cancel
        </button>  : null


      }

        <button
          className="btn   mx-3 mt-2 btn-outline-danger "
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}