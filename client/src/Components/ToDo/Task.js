import React from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
export default function Task(props) {
  const { id, text, status, changeStatus, deleteTask } = props;

  let div_status_class = status ? " table-success " : " table-warning ";
  let del_btn_status_class = status
    ? " btn-outline-success disabled "
    : "btn-outline-primary ";

  return (
    <tr className={"p2 mt-3 bg-opacity-10 "}>
      <td className={"text-center text-dark" + div_status_class}>
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