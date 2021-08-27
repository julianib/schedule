import { useState } from "react";

import "./Shift.css";

export default function Shift({ shift, updateShift }) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [workers, setWorkers] = useState(1);

  const handleStartTime = (event) => {
    setStartTime(event.target.value);
    updateShift(shift.id, "startTime", event.target.value);
  };

  const handleEndTime = (event) => {
    setEndTime(event.target.value);
    updateShift(shift.id, "endTime", event.target.value);
  };

  const handleWorkers = (event) => {
    setWorkers(event.target.value);
    updateShift(shift.id, "workers", Number(workers));
  };

  return (
    <div className="shift-worker-container">
      <div className="shift-container">
        <h2 className="title">Shift {shift.id + 1}</h2>
        <div className="shift-schedule-container">
          <div className="shift-inputs">
            <h5 className="start-time-label">Start Time</h5>
            <input
              className="input"
              type="text"
              value={startTime}
              onChange={handleStartTime}
            />
            <h5 className="end-time-label">End Time</h5>
            <input
              className="input"
              type="text"
              value={endTime}
              onChange={handleEndTime}
            />
          </div>
        </div>
      </div>
      <div className="worker-container">
        <h2 className="title">Workers</h2>
        <input
          style={{ marginTop: "0.8rem" }}
          className="input"
          type="number"
          min="1"
          max="99"
          value={workers}
          onChange={handleWorkers}
        />
      </div>
    </div>
  );
}
