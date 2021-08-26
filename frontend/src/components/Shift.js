import { useState } from "react";

export default function Shift({shift, updateShift}) {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [workers, setWorkers] = useState(1);

    const handleStartTime = (event) => {
        setStartTime(event.target.value);
        updateShift(shift.id, "startTime", event.target.value);
        
    }

    const handleEndTime = (event) => {
        setEndTime(event.target.value);
        updateShift(shift.id, "endTime", event.target.value);
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
            <input type="text" value={startTime} onChange={handleStartTime}/>

            <input type="text" value={endTime} onChange={handleEndTime}/>
            <h2>
                Workers
            </h2>
            <input type="number" min="1" max="99" value={workers} onChange={handleWorkers}/>
        </div>
    )
}
