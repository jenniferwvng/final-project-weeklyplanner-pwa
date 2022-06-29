import React, { useEffect, useState } from 'react';
import AddtaskForm from './AddtaskForm';
import CreateTask from './CreateTask';

import deleteicon from '../deleteicon.png'

const Weekly = () => {
  const [jsonRes, setJsonRes] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);
  const [updatedTask, setUpdatedTask] = useState([]);

  const [taskId, setTaskId] = useState([]);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const response = await fetch('https://fp-weeklyplanner.herokuapp.com/gettask');
        const allTasks = await response.json();
        const taskArray = allTasks.selectTask.tasks;
        setJsonRes(taskArray);
      } catch(err) {
          console.error(err);
      }
    }
    getUserTasks();

    const deleteOldTasks = async () => {
      try {
        const deleteAction = await fetch(`https://fp-weeklyplanner.herokuapp.com/deleteoldtasks`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8' 
          },
        });
        await deleteAction.json();
        
      } catch(err) {
          console.error(err);
      }
    }
    deleteOldTasks();
    
  }, [deletedTask, updatedTask]);

  useEffect(() => {
    console.log(taskId)
    }, [taskId])

    //this only works locally, not on netlify, why?
    // useEffect(() => {
    //   const deleteOldTasks = async () => {
    //     try {
    //       const deleteAction = await fetch(`https://fp-weeklyplanner.herokuapp.com/deleteoldtasks`, {
    //         method: 'DELETE',
    //         headers: {
    //          'Content-type': 'application/json; charset=UTF-8' 
    //         },
    //       });
    //       await deleteAction.json();
          
    //     } catch(err) {
    //         console.error(err);
    //     }
    //   }
    //   deleteOldTasks();
    // }, [])

  const deleteTaskById = async (itemId) => {
    console.log(itemId)
    try {
      const deleteAction = await fetch(`https://fp-weeklyplanner.herokuapp.com/deletetask/${itemId}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
      });
      const deleteResponse = await deleteAction.json();
      setDeletedTask(deleteResponse);
    } catch(err) {
        console.error(err);
    }
  }

  if(!jsonRes.length) {
  return (
    <>
      <span style={{textAlign: 'center', color: 'white', textTransform: 'uppercase', fontWeight: 'bold'}}>
      {sessionStorage.getItem('accessToken') ? 
        <CreateTask />
        :
        <>
        <h1>Weekly page</h1>
        <p>Login first to see and add tasks</p>
        </>
      }
      </span>
    </>
  )
  }

  const nameOfWeekdays = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

const updateTask = async (itemID) => {
  console.log(taskId.includes(itemID))
  console.log(taskId)

  try {
    const updateAction = await fetch(`https://fp-weeklyplanner.herokuapp.com/updatetask/${itemID}?donestatus=${taskId.includes(itemID)}`, {
      method: 'PUT',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' 
      },
    });
    const updateResponse = await updateAction.json();
    setUpdatedTask(updateResponse); 
  } catch(err) {
      console.error(err);
  }
}
  const toggleTaskStatusOnId = (itemID) => {
    if (!taskId.find(id => id === itemID)) {
      setTaskId(taskId => [...taskId, itemID]);
    } else {
      setTaskId(taskId.filter(id => id !== itemID));
    }
  }

  const helperFunction = async (itemID) => {
    await toggleTaskStatusOnId(itemID);
    await updateTask(itemID);
  }

  return (
    <>
    <h1 style={{textAlign: 'center', color: 'white', textTransform: 'uppercase'}}>Weekly page</h1>
    <AddtaskForm />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
      {nameOfWeekdays.map(weekday => {
        return (
          <div style={{border: '3px solid rgb(204, 204, 196)', margin: '10px', borderRadius: '15px', backgroundColor: 'rgb(249, 247, 245)' }}>
            <h1 style={{textAlign: 'center', color: '#708090'}}>{weekday}</h1>
            {jsonRes.map((item, index) => {
              console.log(index)
              return (
                <>            
                {item.date.includes(weekday) &&            
                <div style={{backgroundColor: 'rgb(255,250,250)', margin: '8px', wordWrap: 'break-word', borderTop: '3px solid orange', fontSize: '12px' }}>
                  <div style={{display: 'flex', justifyContent: 'end', margin: '5px'}}>
                    <button onClick={() => deleteTaskById(item._id)} style={{border: 'none', backgroundColor: 'rgb(255,250,250)'}}>
                      <img src={deleteicon} alt="deleteicon" style={{width: '10px'}} />
                    </button>
                  </div>
                  <p style={{margin: '5px'}}><span style={{color: '#708090', fontWeight: 'bold'}}>Task:</span> {item.name}</p>
                  <p style={{margin: '5px'}}><span style={{color: '#708090', fontWeight: 'bold'}}>Date:</span> {item.date}</p>     
                  <label>
                    <button onClick={() => helperFunction(item._id)} style={{width: '120px', margin: '5px', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px'}}>Mark as done/undone</button>
                  </label>
                  <span style={{display: 'grid'}}>
                  {item.done ?
                  <span style={{backgroundColor: '#93C572', justifySelf: 'stretch', textAlign: 'center'}}>done</span>
                  : <span style={{backgroundColor: '#C92519', justifySelf: 'stretch', textAlign: 'center'}}>not done</span>
                  }
                  </span>                
                </div>}              
                </>
              )
            })}
          </div>
        )
      })}
    </div>
    </>
  );
}

export default Weekly;
