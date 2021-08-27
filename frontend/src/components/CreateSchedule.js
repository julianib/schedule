import { useState } from "react";

import Day from "./Day";

import "./CreateSchedule.css";

export default function CreateSchedule() {
  const [dayIds, setDayIds] = useState(0);
  const [days, setDays] = useState([]);

  function addDay() {
    const newDay = {
      id: dayIds, // dayIds are incremented, prefer not to use `days.length`
      date: new Date().getTime(),
      shifts: [],
    };

    setDays([...days, newDay]);
    setDayIds(previousValue => previousValue + 1);
  }

  function deleteDay(dayId) {
    const updatedDays = days.filter(day => day.id !== dayId);
    setDays(updatedDays);
  }

  // This function is passed to the Day component
  // It will be called when `save` is pressed on a day component
  function updateDay(updatedDay) {
    const updatedDays = days.filter((day) => updatedDay.id !== day.id);
    setDays([...updatedDays, updatedDay]);
  }

  function sendDays() {
    fetch("http://localhost:5000/sendDays", {
      method: "POST",
      body: JSON.stringify(days),
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="create-schedule-contaoner">
      <div>
        {days.map((day, index) => (
          <Day key={index} day={day} updateDay={updateDay} deleteDay={deleteDay}/>
        ))}
      </div>
      <div>
        <button
          style={{ marginLeft: "1.5rem" }}
          className="button"
          onClick={addDay}
        >
          + DAY
        </button>
        <button
          style={{ marginLeft: "0.5rem" }}
          className="button"
          onClick={sendDays}
        >
          Send days
        </button>
      </div>
    </div>
  );
}
