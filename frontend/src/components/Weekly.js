import React, { useEffect, useState } from 'react';
import AddtaskForm from './AddtaskForm';
import CreateTask from './CreateTask';

const Weekly = () => {
  const [jsonRes, setJsonRes] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  const [taskStatus, setTaskStatus] = useState(true);
  const [taskId, setTaskId] = useState([]);

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
      {sessionStorage.getItem('accessToken') && <CreateTask />}
    </>
  )
  }

  const nameOfWeekdays = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];



  //get the date of today like getdate()-1, then erase yesterdays tasks/move them to "garbage collection", e.g. if yesterday was 
  //2022-06-11, then .include tasks that are that and filter out
// useEffect(() => {
//   const updateTaskStatus = async (itemID) => {
//     console.log(itemID)
//     console.log(taskId.includes(itemID))
//     try {
//       //Think the problem is that arraymethod in here will now be updated, have to move this out in outer scope where real usestate is
//       //one problem is how do I include he itemID if i put this in outer inside an useeffect which lsitens to taskid?
//       const updateAction = await fetch(`http://localhost:8080/updatetask/${itemID}?donestatus=${taskId.includes(itemID)}`, {
//         method: 'PUT',
//         headers: {
//          'Content-type': 'application/json; charset=UTF-8' 
//         },
//       });
//       const updateResponse = await updateAction.json();
//       console.log(updateResponse)
//       //To enable re-render when change detected, and to avoid infinity loop in useEffect, we have to listen to a separate state rather than the jsonRes state from GET
//       //setDeletedTask(deleteResponse);
//     } catch(err) {
//         console.error(err);
//     }
//   };
//   updateTaskStatus();
// }, [taskId])

  const toggleTaskStatusOnId = (itemID) => {
    //find() returns either matching element or undefined, !undefined === true, to run body of if statement and set value in taskId first
    //if matching element found, !matching element === false, else statement body is run instead
    
    //await const test = 
    //(async () =>  {
    //const toggle = async () => {
    // (async ()=> {if (!taskId.find(id => id === itemID)) {
    //   setTaskId(taskId => [...taskId, itemID]);
    //   //want to somehow put endpoint here to edit done status in database, we have access to itemID, problem could be how to access task status?
    //   //taskId.includes(item._id)? use state updates later, console log not even correct
    //   //can I make another function to invoke together in onclick checkbox with the put endpoint, have (taskId.includes(itemID) as parameter
    //   //(equals the task status true/false), put that funciton inside this one 
    // } else {
    //   setTaskId(taskId.filter(id => id !== itemID));
    // }
    if (!taskId.find(id => id === itemID)) {
      setTaskId(taskId => [...taskId, itemID]);
      //want to somehow put endpoint here to edit done status in database, we have access to itemID, problem could be how to access task status?
      //taskId.includes(item._id)? use state updates later, console log not even correct
      //can I make another function to invoke together in onclick checkbox with the put endpoint, have (taskId.includes(itemID) as parameter
      //(equals the task status true/false), put that funciton inside this one 
    } else {
      setTaskId(taskId.filter(id => id !== itemID));
    }

    //move this out from here, have to have it outer scope
    (async () => {
      console.log(itemID)
      try {
        //Think the problem is that arraymethod in here will now be updated, have to move this out in outer scope where real usestate is
        //one problem is how do I include he itemID if i put this in outer inside an useeffect which lsitens to taskid?
        const updateAction = await fetch(`http://localhost:8080/updatetask/${itemID}?donestatus=${taskId.includes(itemID)}`, {
          method: 'PUT',
          headers: {
           'Content-type': 'application/json; charset=UTF-8' 
          },
        });
        const updateResponse = await updateAction.json();
        console.log(updateResponse)
        //To enable re-render when change detected, and to avoid infinity loop in useEffect, we have to listen to a separate state rather than the jsonRes state from GET
        //setDeletedTask(deleteResponse);
      } catch(err) {
          console.error(err);
      }
    })();

    console.log('inner' + taskId)
    //usestate is async, current state value will not be truly read inside here,
    //due to react hook not updating first after next render/change, 
    //have to invert the value if using it to update endpoint to database in here
  }
  console.log('outer' + taskId)
  console.log(taskId)

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
                  <label>
                    {taskId.includes(item._id) ? <p>Done: true</p> : <p>Done: false</p>}
                    <input type="checkbox" checked={taskId.includes(item._id)} onChange={() => toggleTaskStatusOnId(item._id)} />
                    <button onClick={() => toggleTaskStatusOnId(item._id, taskId.includes(item._id))}>Done: {taskId.includes(item._id)}</button>
                  </label>
                  <p style={{margin: '10px'}}>Done: {item.done ? 'true' : 'false'}</p>
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
