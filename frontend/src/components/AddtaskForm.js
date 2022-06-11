import React, { useState } from 'react';

const AddtaskForm = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(0);
    const [done, setDone] = useState(false);

    const AddTask = async (e) => {
        e.preventDefault();
        
        try {
            await fetch('http://localhost:8080/addtask', {
              method: 'POST',
              headers: {
               'Content-type': 'application/json; charset=UTF-8' 
              },
              body: JSON.stringify({name, date, done})
            });
          } catch(err) {
              console.error(err);
          }
    }

  return (
      <>
    <form onSubmit={AddTask}>
    <label>
      Name of task
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </label>
    <label>
      Date to be done
      <input 
        type="text" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
    </label>
    <label>
      Done
      <input 
        type="text" 
        value={done} 
        onChange={(e) => setDone(e.target.value)} 
      />
    </label>
    <button>
        <input type="submit" value="Submit" />
    </button>
    </form>
    </>
  );
}

export default AddtaskForm;
