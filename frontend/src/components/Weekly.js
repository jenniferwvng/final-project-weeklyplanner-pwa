import React, { useEffect, useState } from 'react';
import AddtaskForm from './AddtaskForm';

const Weekly = () => {
  const [jsonRes, setJsonRes] = useState([]);

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
  }, []);

  //make it listen to changes in the collection, or implement redux to display directly while newest update from database will render in next refresh of page

  const deleteTaskById = async (itemId) => {
    console.log(itemId)
    try {
      await fetch(`http://localhost:8080/deletetask/${itemId}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
      });
      //instead of catching the fetch response here, make useEffect listen to changes in dependency array?
      //for automatic re-rendering when tasks are deleted (or added/modified in other functions as well)
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

  return (
    <div>
      <h1>Weekly page</h1>
      <AddtaskForm />
      {jsonRes.map(item => {
        return (
          <div style={{display: 'flex'}}>
          <p style={{margin: '10px'}}>Task: {item.name}</p>
          <p style={{margin: '10px'}}>Date: {item.date}</p>
          <p style={{margin: '10px'}}>ID: {item._id}</p>
          <button onClick={() => deleteTaskById(item._id)}>Delete task</button>
          </div>
        )
      })}
    </div>
  );
}

export default Weekly;
