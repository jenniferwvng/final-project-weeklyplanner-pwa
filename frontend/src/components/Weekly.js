import React, { useEffect, useState } from 'react';
import AddtaskForm from './AddtaskForm';

const Weekly = () => {
  const [jsonRes, setJsonRes] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/gettask');
        const allTasks = await response.json();
        const taskArray = allTasks.selectTask.tasks;
        setJsonRes(taskArray);
      } catch(err) {
          console.error(err);
      }
    }
    getUserTasks();
  }, [deletedTask]);

  const deleteTaskById = async (itemId) => {
    console.log(itemId)
    try {
      const deleteAction = await fetch(`http://localhost:8080/deletetask/${itemId}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
      });
      const deleteResponse = await deleteAction.json();
      //To enable re-render when change detected, and to avoid infinity loop in useEffect, we have to listen to a separate state rather than the jsonRes state from GET
      setDeletedTask(deleteResponse);
    } catch(err) {
        console.error(err);
    }
  }

  if(!jsonRes.length) {
  return (
    <>
      <h1>Weekly page</h1>
      <p>Login first to see and add tasks</p>
    </>
  )
  }

  const nameOfWeekdays = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

  //get the date of today like getdate()-1, then erase yesterdays tasks/move them to "garbage collection", e.g. if yesterday was 
  //2022-06-11, then .include tasks that are that and filter out
  return (
    <div>
      <h1>Weekly page</h1>
      <AddtaskForm />
      {nameOfWeekdays.map((weekday, index) => {
        return (
          //index same as index of getday()
          <div style={{border: '1px solid black', display: 'flex', flexDirection: 'column'}}>
            <h1>{weekday}</h1>
            <p>{index}</p>
            {jsonRes.map(item => {
              return (
                <>
                {item.date.includes(weekday) &&               
                <div style={{backgroundColor: 'beige', margin: '10px'}}>
                  <p style={{margin: '10px'}}>Task: {item.name}</p>
                  <p style={{margin: '10px'}}>Date: {item.date}</p>
                  <p style={{margin: '10px'}}>ID: {item._id}</p>
                  <button onClick={() => deleteTaskById(item._id)}>Delete task</button>
                </div>}
                </>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}

export default Weekly;
