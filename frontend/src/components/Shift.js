import { useState } from "react";

export default function Shift({shift, updateShift}) {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [workers, setWorkers] = useState(1);

    const handleStartTime = (event) => {
        setStartTime(event.target.value);
        updateShift(shift.id, "startTime", startTime);
        
    }

    const handleEndTime = (event) => {
        setEndTime(event.target.value);
        updateShift(shift.id, "endTime", endTime);
    }

    const handleWorkers = (event) => {
        setWorkers(event.target.value);
        updateShift(shift.id, "workers", Number(workers));
    }

    return (
        <div style={{ backgroundColor: "teal" }}>
            <h2>
                Shift
            </h2>
            <input type="number" min="0" max="23" value={startTime} onChange={handleStartTime}/>
            <input type="number" min="0" max="23" />

            <input type="number" min="0" max="23" value={endTime} onChange={handleEndTime}/>
            <input type="number" min="0" max="23" />

            <h2>
                Workers
            </h2>
            <input type="number" min="1" max="99" value={workers} onChange={handleWorkers}/>
        </div>
    )

}
