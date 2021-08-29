import { useState } from "react";

import "./Day.css";

import Shift from "./Shift";

export default function Day({ day, updateDay, deleteDay }) {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [date, setDate] = useState();
  const [shifts, setShifts] = useState([]);

  const updateDate = (event) => {
    const dateValue = event.target.value;
    setDate(new Date(dateValue).getTime());
    setUnsavedChanges(true);
  };

  const addShift = () => {
    const newShift = {
      id: shifts.length,
      startTime: 0,
      endTime: 0,
      workers: 1,
    };

    setShifts([...shifts, newShift]);
    setUnsavedChanges(true);
  };

  const saveDay = () => {
    const newDay = {
      id: day.id,
      date,
      shifts,
    };

    updateDay(newDay);
    setUnsavedChanges(false);
  };

  function updateShift(updatedShiftId, key, value) {
    setShifts(
      shifts.map((shift) =>
        shift.id === updatedShiftId ? { ...shift, [key]: value } : shift
      )
    );
    setUnsavedChanges(true);
  }

  return (
    <>
      <div className="day-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 1.3rem 0 1.3rem",
          }}
        >
          <h2 className="title">Day {day.id + 1}</h2>
          <div>
            {unsavedChanges ? (
              <button onClick={saveDay} className="button">
                Save
              </button>
            ) : null}

            <button
              style={{ marginLeft: "1rem" }}
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
        <p
          style={{
            color: "rgb(31 212 169)",
            fontSize: "0.8rem",
            marginLeft: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          {unsavedChanges ? "You have unsaved changes*" : null}
        </p>
      </div>
    </>
  );
}
