import { useState } from "react";
import "./Workers.css";

export default function Workers() {

  const [workers, setWorkers] = useState([]);

  return (
    <div className="workers-container">
      <h2 style={{ marginLeft: "1.3rem" }} className="title">
        Workers
      </h2>
      <ul>
        {workers.map(worker => <li>{worker}</li>)}
      </ul>
      <textarea onChange={(event) => console.log(event.target.value.split("\n"))}/>
    </div>
  );
}
