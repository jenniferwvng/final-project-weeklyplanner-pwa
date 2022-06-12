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

   const nameOfWeekdays = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

  const loopOverWeekdays = () => {
    let test = '';
    for (let i = 0; i < nameOfWeekdays.length; i++) {
       console.log(nameOfWeekdays[i]);
    }
    
  }

  console.log(loopOverWeekdays())

  return (
    <div>
      <h1>Weekly page</h1>
      <AddtaskForm />
      {jsonRes.map(item => {
        //somehow loop through and generate new weekdays to compare in .includes w/o having to hardcode every string as it is now
        if (item.date.includes('mon')) {
          return (
            <div style={{backgroundColor: 'pink'}}>
              <h1>mon</h1>
              <p style={{margin: '10px'}}>Task: {item.name}</p>
              <p style={{margin: '10px'}}>Date: {item.date}</p>
              <p style={{margin: '10px'}}>ID: {item._id}</p>
              <button onClick={() => deleteTaskById(item._id)}>Delete task</button>
            </div>
          )
        } else {
          return (
            //if item.date === contains mon, render inside div with h1 monday, else if item.date contains tues, render inside div w... etc.
            //could be flex divs with flexdirection column, left to right, to make space for more tasks
            <div style={{display: 'flex'}}>
            <p style={{margin: '10px'}}>Task: {item.name}</p>
            <p style={{margin: '10px'}}>Date: {item.date}</p>
            <p style={{margin: '10px'}}>ID: {item._id}</p>
            <button onClick={() => deleteTaskById(item._id)}>Delete task</button>
            </div>
          )
        }
      //})
      
      })}
    </div>
  );
}

export default Weekly;
