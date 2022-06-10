import React, { useEffect, useState } from 'react';

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

  if(!jsonRes.length) {
    return (
      <>
        <p>No weekly tasks set - add some</p>
      </>
    )
  }

  const deleteTaskById = async (itemId) => {
    console.log(itemId)
    try {
      const response = await fetch(`http://localhost:8080/deletetask/${itemId}`, {
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

  return (
    <div>
      <h1>Weekly page</h1>
      {jsonRes.map(item => {
        return (
          <div style={{display: 'flex'}} onClick={() => deleteTaskById(item._id)}>
          <p style={{margin: '10px'}}>Task: {item.name}</p>
          <p style={{margin: '10px'}}>Date: {item.date}</p>
          <p style={{margin: '10px'}}>ID: {item._id}</p>
          </div>
        )
      })}
    </div>
  );
}

export default Weekly;
