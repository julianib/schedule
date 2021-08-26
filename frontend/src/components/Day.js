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

    // This function will get called everytime a shift is updated on a day
    // (yes, I know, it's bad but this works @todo)
    function updateShift(updatedShiftId, key, value) {
        // First find the shift to update by its id
        const shiftToUpdateIndex = shifts.findIndex(shift => shift.id === updatedShiftId);

        // Get filter to update
        const shiftToUpdate = shifts[shiftToUpdateIndex];
        shiftToUpdate[key] = value;

        // Then filter old shift from current shifts and then update with updated shift (shiftToUpdate)
        const shiftsToUpdate = shifts.filter(shift => shift.id !== updatedShiftId);
        setShifts([...shiftsToUpdate, shiftToUpdate]);
    }

    return (
        <div style={{ backgroundColor: "green" }}>
            <button style={{ display: "inline", float: "right" }} onClick={saveDay}>
                Save
            </button>
            <h2>Day</h2>
            <input type="date" onChange={updateDate} />
            <br />
            
            <div>
                {shifts.map((shift, index) => (
                    <Shift key={index} shift={shift} updateShift={updateShift}/>
                    ))}
            </div>
            <button onClick={addShift}>+ SHIFT</button>
            
        </div>
    )
}
