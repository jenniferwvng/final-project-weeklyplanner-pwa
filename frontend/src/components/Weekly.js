import React, { useEffect, useState } from 'react';
import AddtaskForm from './AddtaskForm';
import CreateTask from './CreateTask';

const Weekly = () => {
  const [jsonRes, setJsonRes] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);
  const [updatedTask, setUpdatedTask] = useState([]);

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
  }, [deletedTask, updatedTask]);

  useEffect(() => {
    console.log(taskId)
    }, [taskId])

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


  //om default task börjar på true blir onclick false och sen i bra ordning, om den börjar på false måste man klicka dubbelt innan det blir normalt
const updateTask = async (itemID) => {
  console.log(taskId.includes(itemID))
  console.log(taskId)

  try {
    //här är problemet: om done=false i database, tryck på knapp för att vilja den ska bli true, blir istället false pga
    //taskId.includes(itemID) blir false vid första klick på en task då den jämför om id klickats på och lagts till i array,
    //eftersom första klick på en task id efter en ny rendering av sidan alltid börjar med en tom array, blir det alltid false som query som skickas
    //när taskid.includes(itemID) körs, så om det är true i databasen från början, är det inga problem och databsen skrivs om till false, men är det false i databsem, skickar man false som query och databasen
    //ändras ju inte, eftersom det redan är false - man måste därför trycka dubbelt inom samma rendering, sker en ny rendering börjar man om igen med samma problem
    //problemet ligger alltså i logiken under toggleTaskStatusOnId då första detektion av klick på task id alltid skickar false som query - kan local storage hjälpa?
    const updateAction = await fetch(`http://localhost:8080/updatetask/${itemID}?donestatus=${taskId.includes(itemID)}`, {
      method: 'PUT',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' 
      },
    });
    const updateResponse = await updateAction.json();
    //To enable re-render when change detected, and to avoid infinity loop in useEffect, we have to listen to a separate state rather than the jsonRes state from GET
    setUpdatedTask(updateResponse); 
  } catch(err) {
      console.error(err);
  }
}
  const toggleTaskStatusOnId = (itemID) => {
    //find() returns either matching element or undefined, !undefined === true, to run body of if statement and set value in taskId first
    //if matching element found, !matching element === false, else statement body is run instead
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
    <h1>Weekly page</h1>
    <AddtaskForm />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
      {nameOfWeekdays.map(weekday => {
        return (
          <div style={{border: '3px solid rgb(204, 204, 196)', margin: '10px', borderRadius: '15px', backgroundColor: 'rgb(249, 247, 245)' }}>
            <h1 style={{textAlign: 'center', color: '#708090'}}>{weekday}</h1>
            {jsonRes.map(item => {
              return (
                <>
                {item.date.includes(weekday) &&               
                <div style={{backgroundColor: 'rgb(255,250,250)', margin: '8px', wordWrap: 'break-word', borderTop: '3px solid orange', fontSize: '12px' }}>
                  <p style={{margin: '5px'}}>Task: {item.name}</p>
                  <p style={{margin: '5px'}}>Date: {item.date}</p>
                  <p style={{margin: '5px'}}>ID: {item._id}</p>      
                  <label>
                    <button onClick={() => helperFunction(item._id)}>Mark as done/undone</button>
                  </label>
                  {item.done ?
                  <span style={{backgroundColor:'green'}}>done</span>
                  : <span style={{backgroundColor:'red'}}>not done</span>
                  }
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
    </>
  );
}

export default Weekly;
