import React, { useState } from 'react';


const weekdays = new Map();
weekdays.set(0, 'sun');
weekdays.set(1, 'mon');
weekdays.set(2, 'tues');
weekdays.set(3, 'wed');
weekdays.set(4, 'thurs');
weekdays.set(5, 'fri');
weekdays.set(6, 'sat');

const todaysDate = new Date().toLocaleDateString();
const todaysWeekday = weekdays.get(new Date().getDay());

const dateOfToday = todaysWeekday + ' ' + todaysDate;

const addUpcomingDates = (numOfDays) => {
    return new Date(new Date(new Date()).setDate(new Date().getDate() + numOfDays)).toLocaleDateString();
}

const addWeekdays = (numOfDays) => {
    return new Date(new Date(new Date(new Date()).setDate(new Date().getDate() + numOfDays))).getDay();
}

const AddtaskForm = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(dateOfToday);
    const [addedTask, setAddedTask] = useState([]);

    const AddTask = async (e) => {
        e.preventDefault();

        try {
            const addAction = await fetch('http://localhost:8080/addtask', {
              method: 'POST',
              headers: {
               'Content-type': 'application/json; charset=UTF-8' 
              },
              body: JSON.stringify({name, date})
            });
            const addResponse = await addAction.json();
            setAddedTask(addResponse);
          } catch(err) {
              console.error(err);
          }
    }

    console.log(addedTask)
    
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', backgroundColor: 'rgba(112, 128, 144, 0.2)', padding: '30px'}}>

    <form onSubmit={AddTask} style={{alignSelf: 'center'}}>
    <label style={{margin: '5px', color: 'white', fontWeight: 'bold'}}>
      Name of task
      <input 
        style={{border: '1px solid lightblue', borderRadius: '5px', margin: '5px'}}
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </label>
    <label style={{margin: '5px', color: 'white', fontWeight: 'bold'}}>
      Date to be done
        <select  onChange={(e) => setDate(e.target.value)}
        style={{border: '1px solid lightblue', borderRadius: '5px', margin: '5px'}}>
        <option value={date}>Today</option>
        {/* could I improve this using .map and making use of the built in index value? Or just move this into a function with parameter as helper function*/}
        <option value={weekdays.get(addWeekdays(1)) + ' ' + addUpcomingDates(1)}> {weekdays.get(addWeekdays(1)) + ' ' + addUpcomingDates(1)} </option>
        <option value={weekdays.get(addWeekdays(2)) + ' ' + addUpcomingDates(2)}> {weekdays.get(addWeekdays(2)) + ' ' + addUpcomingDates(2)} </option>
        <option value={weekdays.get(addWeekdays(3)) + ' ' + addUpcomingDates(3)}> {weekdays.get(addWeekdays(3)) + ' ' + addUpcomingDates(3)} </option>
        <option value={weekdays.get(addWeekdays(4)) + ' ' + addUpcomingDates(4)}> {weekdays.get(addWeekdays(4)) + ' ' + addUpcomingDates(4)} </option>
        <option value={weekdays.get(addWeekdays(5)) + ' ' + addUpcomingDates(5)}> {weekdays.get(addWeekdays(5)) + ' ' + addUpcomingDates(5)} </option>
        <option value={weekdays.get(addWeekdays(6)) + ' ' + addUpcomingDates(6)}> {weekdays.get(addWeekdays(6)) + ' ' + addUpcomingDates(6)} </option>
        </select>
    </label>
    <button type="submit" style={{border: 'none', textTransform: 'uppercase', padding: '8px', borderRadius: '10px', margin: '10px', backgroundColor: '#708090', color: 'white', fontWeight: 'bold'}}>Add task</button>
    </form>

    <div style={{alignSelf: 'center', color: 'white'}}>
        <p>"Quote of the day"</p>
    </div>
    </div>
  );
}

export default AddtaskForm;
