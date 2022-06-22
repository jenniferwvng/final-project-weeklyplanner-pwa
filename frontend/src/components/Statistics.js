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

  const nameOfWeekdays = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

  return (
    <div>
      <h1>Statistics page</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', margin: '50px' }}>
      {nameOfWeekdays.map(weekday => {
        return (
          <div style={{margin: '5px'}}>
            <h1>{weekday}</h1>
            <div style={{backgroundColor: 'white', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20px, 1fr))'}}>
            {jsonRes.map(item => {                     
              return (                
                <div>
                  {item.date.includes(weekday) && item.done &&
                  <div style={{backgroundColor: 'green', width: '1vw', height: '2vh', margin: '1px'}}>
                  </div>
                  } 
                  {item.date.includes(weekday) && !item.done &&
                  <div style={{backgroundColor: 'red', width: '1vw', height: '2vh', margin: '1px'}}>
                  </div>
                  }                  
                </div>
              )
            })}
            </div>
          </div>
        )
      })}
      </div>

      <h1>Done:</h1>
      {jsonRes.map(item => {
        return (
          <div>
          {item.done && 
            <div style={{backgroundColor: 'green', margin: '10px'}}>
            <p style={{margin: '10px'}}>Task: {item.name}</p>
            <p style={{margin: '10px'}}>Date: {item.date}</p>
            <p style={{margin: '10px'}}>ID: {item._id}</p>    
            </div>
          }
          </div>
        )
      }
      )}
      <h1>Not done:</h1>
      {jsonRes.map(item => {
        return (
          <>
          {!item.done && 
            <div style={{backgroundColor: 'red', margin: '10px'}}>
            <p style={{margin: '10px'}}>Task: {item.name}</p>
            <p style={{margin: '10px'}}>Date: {item.date}</p>
            <p style={{margin: '10px'}}>ID: {item._id}</p>    
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
