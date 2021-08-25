import { useState } from "react";

export default function CreateSchedule() {

    const [ days, setDays ] = useState([]);

    function addDay() {
        
    }

    return (
        <button onClick={addDay}>+ DAY</button>
    )
}