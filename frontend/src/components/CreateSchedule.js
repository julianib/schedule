import { useState } from "react";

import Day from "./Day";

import "./CreateSchedule.css";

export default function CreateSchedule() {
  const [days, setDays] = useState([]);

  function addDay() {
    const newDay = {
      id: days.length,
      date: new Date().getTime(),
      shifts: [],
    };

    setDays([...days, newDay]);
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
    });
  }

  return (
    <div className="create-schedule-contaoner">
      <div>
        {days.map((day, index) => (
          <Day key={index} day={day} updateDay={updateDay} />
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
