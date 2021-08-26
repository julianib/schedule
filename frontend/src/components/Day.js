import { useState } from "react";

import Shift from "./Shift";

export default function Day({day, updateDay}) {
    const [date, setDate] = useState();
    const [shifts, setShifts] = useState([]);

    const updateDate = (event) => {
        const dateValue = event.target.value;
        setDate(new Date(dateValue).getTime());
    }

    const addShift = () => {
        const newShift = {
            id: shifts.length,
            startTime: 0,
            endTime: 0,
            workers: 1,
        }

        setShifts([...shifts, newShift]);
    }

    const saveDay = () => {
        const newDay = {
            id: day.id,
            date,
            shifts
        }

        updateDay(newDay);
    }

    return (
        <div style={{ backgroundColor: "green" }}>
            <button style={{ display: "inline", float: "right" }} onClick={saveDay}>
                Save
            </button>
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
