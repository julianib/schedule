import { useState } from "react";

import Day from "./Day";

export default function CreateSchedule() {

    const [days, setDays] = useState([]);

    function addDay() {
        const newDay = {
            date: new Date().getTime(),
            shifts: []
        }

        setDays([...days, newDay]);
    }

    return (
        <>
            <div>
                {days.map((day, index) => (
                    <Day key={index} day={day}/>
                ))}
            </div>
            <button onClick={addDay}>+ DAY</button>
        </>
    )
}