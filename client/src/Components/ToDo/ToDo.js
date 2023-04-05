import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
export default function ToDo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({
    id: '',
    task: '',
    status: ''
  });
  const api_url = 'http://localhost:3001/api/v1';

  useEffect(() => {
    const getTasks = async () => {
      try{
        const res = await fetch(`${api_url}/todo`);
        const data = await res.json();
        console.log(data);
        setTasks(data);
      }catch (err) {
        console.log(err);
      }
    }
    getTasks();
  }, []);






  const changeStatus = async (id) => {
    try{
      const res = await fetch(`${api_url}/todo/${id}`, {method: 'PUT'});
      const data = await res.json();
      setTasks(data);
    }catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try{
      const res = await fetch(`${api_url}/todo/${id}`, {method: 'DELETE'});
      const data = await res.json();
      console.log(data);
      setTasks(data);
      setEditTask({
        id: '',
        task: '',
        status: ''
      });
    }catch (err) {
      console.log(err);
    }
  };

  let tasks_list = tasks.map((el) => {
    return (
      <Task
        key={uuidv4()}
        id={el.id}
        text={el.task}
        status={el.status}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
        obj={el}
        editTask={editTask}
        setEditTask={setEditTask}
      />
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(editTask.id != ''){
      try{
        const edited_task = {task: editTask.task}
        const res = await fetch(`${api_url}/todo/edit/${editTask.id}`, {
          method: 'PUT',   
           body: JSON.stringify(edited_task),
           headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        console.log(data);
        setTasks(data);
      }catch (err) {
        console.log(err);
      }
      setEditTask({
        id: '',
        task: '',
        status: ''
      });
    }else{
    if (taskInput) {
      // const new_task = { id: uuidv4(), task: taskInput, status: false };
      // setTasks(() => [...tasks, new_task]);
      try{
        const new_task = { id: uuidv4(), task: taskInput}
        const res = await fetch(`${api_url}/todo/`, {
          method: 'POST',   
           body: JSON.stringify(new_task),
           headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        console.log(data);
        setTasks(() => [...tasks, new_task]);
      }catch (err) {
        console.log(err);
      }


      setTaskInput("");
    } else {
      alert("Task input is empty");
    }
  }
  };

  return (
    <div className="container d-flex flex-column mt-5">
<header className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <h1 className="navbar-brand mx-auto">To do</h1>
  </div>
</header>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          className="form-control"
          id="taskInput"
          name="taskInput"
          placeholder="Enter task"
          
          value={editTask.id != '' ? editTask.task : taskInput}
          onChange={(e) => editTask.id != '' ?  setEditTask({...editTask, task: e.target.value}): setTaskInput(e.target.value)}
        />
      </form>
      <div className="table-responsive-xl mt-2">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Task</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{tasks.length != 0 ? tasks_list : <tr><td colSpan={3} style={{textAlign: "center" }}>No tasks</td></tr>}</tbody>
        </table>
      </div>
      <footer className="bg-dark text-white text-center py-3">
  <div className="container">
    <span>© 2023 Daniel Pševlockij</span>
  </div>
</footer>
    </div>

  );
}