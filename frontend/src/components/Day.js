import { useState } from "react";

import Shift from "./Shift";

export default function Day() {
    const [date, setDate] = useState();
    const [shifts, setShifts] = useState([]);

    const updateDate = (event) => {
        const dateValue = event.target.value;
        setDate(new Date(dateValue).getTime());
    }

    const addShift = () => {
        const newShift = {
            startTime: 0,
            endTime: 0,
            workers: 1,
        }

        setShifts([...shifts, newShift]);
    }

    return (
        <div style={{ backgroundColor: "green" }}>
            <h2>Day</h2>
            <input type="date" onChange={updateDate} />
            <br />
            <button onClick={addShift}>+ SHIFT</button>
            
            <div>
                {shifts.map((shift, index) => (
                    <Shift key={index} shift={shift}/>
                ))}
            </div>

        </div>
    )
}
