import { useState } from "react";

import Day from "./Day";

export default function CreateSchedule() {
    const [days, setDays] = useState([]);

    function addDay() {
        const newDay = {
            id: days.length,
            date: new Date().getTime(),
            shifts: []
        }

        setDays([...days, newDay]);
    }

    // This function is passed to the Day component
    // It will be called when `save` is pressed on a day component
    function updateDay(updatedDay) {
        const updatedDays = days.filter(day => updatedDay.id !== day.id)
        setDays([...updatedDays, updatedDay]);
    }

    function sendDays() {
        fetch("http://localhost:5000/sendDays", {
            method: "POST",
            body: JSON.stringify(days)
        });
    }

    return (
        <>
            <div>
                {days.map((day, index) => (
                    <Day key={index} day={day} updateDay={updateDay}/>
                ))}
            </div>
            <button onClick={addDay}>+ DAY</button>
            <button onClick={sendDays}>Send days</button>
        </>
    )
}
