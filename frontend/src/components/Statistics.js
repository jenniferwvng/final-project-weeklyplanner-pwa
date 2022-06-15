import React, { useState, useEffect } from 'react';

const Statistics = () => {
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

  //render based on weekday (mon-sun), how may tasks per weekday is accomplished
  //i.e. filter first on weekday, then for that task, how many are done vs undone and print the number
  return (
    <div>
      <h1>Statistics page</h1>
      <h1>Done:</h1>
      {jsonRes.map(item => {
        console.log(item.done)
        return (
          <>
          {item.done && 
            <div style={{backgroundColor: 'green', margin: '10px'}}>
            <p style={{margin: '10px'}}>Task: {item.name}</p>
            <p style={{margin: '10px'}}>Date: {item.date}</p>
            <p style={{margin: '10px'}}>ID: {item._id}</p>    
            </div>
          }
          </>
        )
      }
      )}
      <h1>Not done:</h1>
      {jsonRes.map(item => {
        console.log(item.done)
        return (
          <>
          {!item.done && 
            <div style={{backgroundColor: 'red', margin: '10px'}}>
            <p style={{margin: '10px'}}>Task: {item.name}</p>
            <p style={{margin: '10px'}}>Date: {item.date}</p>
            <p style={{margin: '10px'}}>ID: {item._id}</p>    
            {/* instead of deletetask here, make it automatically delete tasks that are older than todays date,
            and use this statistics page only for displaying numbers */}
            </div>
          }
          </>
        )
      }
      )}
    </div>
  );
}

export default Statistics;
