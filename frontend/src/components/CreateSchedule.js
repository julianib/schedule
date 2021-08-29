import { useState } from "react";

import Workers from "./Workers";
import Day from "./Day";

import "./CreateSchedule.css";

export default function CreateSchedule() {
  const [dayIds, setDayIds] = useState(0);
  // days REALLY needs to be global context variable
  const [days, setDays] = useState([]);

  function addDay() {
    const newDay = {
      id: dayIds, // dayIds are incremented, prefer not to use `days.length`
      date: 0,
      shifts: [],
    };

    setDays([...days, newDay]);
    setDayIds((previousValue) => previousValue + 1);
  }

  function deleteDay(dayId) {
    const updatedDays = days.filter((day) => day.id !== dayId);
    setDays(updatedDays);
  }

  // This function is passed to the Day component
  // It will be called when `save` is pressed on a day component
  function updateDay(updatedDay) {
    const updatedDays = days.filter((day) => updatedDay.id !== day.id);
    setDays([...updatedDays, updatedDay]);
  }

  function submitSchedule() {
    const body = {
      name: "SampleText",
      workers: ["worker one", "worker two", "worker three"],
      days: days,
    };
    console.log(body);
    fetch("http://localhost:5000/schedule", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="app-container">
      <div className="create-schedule-contaoner">
        <div>
          {days.map((day, index) => (
            <Day
              key={index}
              day={day}
              updateDay={updateDay}
              deleteDay={deleteDay}
            />
          ))}
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
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
            onClick={submitSchedule}
          >
            Submit schedule
          </button>
        </div>
      </div>
      <Workers />
    </div>
  );
}
