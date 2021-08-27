import { useState } from "react";

import "./Day.css";

import Shift from "./Shift";

export default function Day({ day, updateDay, deleteDay }) {
  const [date, setDate] = useState();
  const [shifts, setShifts] = useState([]);

  const updateDate = (event) => {
    const dateValue = event.target.value;
    setDate(new Date(dateValue).getTime());
  };

  const addShift = () => {
    const newShift = {
      id: shifts.length,
      startTime: 0,
      endTime: 0,
      workers: 1,
    };

    setShifts([...shifts, newShift]);
  };

  const saveDay = () => {
    const newDay = {
      id: day.id,
      date,
      shifts,
    };

    updateDay(newDay);
  };

  // This function will get called everytime a shift is updated on a day
  // (yes, I know, it's bad but this works @todo)
  function updateShift(updatedShiftId, key, value) {
    // First find the shift to update by its id
    const shiftToUpdateIndex = shifts.findIndex(
      (shift) => shift.id === updatedShiftId
    );

    // Get filter to update
    const shiftToUpdate = shifts[shiftToUpdateIndex];
    shiftToUpdate[key] = value;

    // Then filter old shift from current shifts and then update with updated shift (shiftToUpdate)
    const shiftsToUpdate = shifts.filter(
      (shift) => shift.id !== updatedShiftId
    );
    setShifts([...shiftsToUpdate, shiftToUpdate]);
  }

  return (
    <>
      <div className="day-container">
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0 1.3rem 0 1.3rem" }}>
          <h2
            className="title"
          >
            Day {day.id + 1}
          </h2>
          <div>
          <button
            onClick={saveDay}
            className="button"
          >
            Save
          </button>
          <button
            style={{ marginLeft: "1rem",  }}
            onClick={() => deleteDay(day.id)}
            className="button"
          >
            Delete
          </button>
          </div>
        </div>
        <div className="day-body">
          <input className="date-input" type="date" onChange={updateDate} />
          <div>
            {shifts.map((shift, index) => (
              <Shift key={index} shift={shift} updateShift={updateShift} />
            ))}
          </div>
          <button className="button" onClick={addShift}>
            + Shift
          </button>
        </div>
      </div>
    </>
  );
}
