import { useState } from "react";
import "./Workers.css";

export default function Workers() {
  const [workerValue, setWorkerValue] = useState('');
  const [workers, setWorkers] = useState([]);

  function handleWorkerValue(event) {
    if (event.target.value.includes("\n")) {
      event.preventDefault();

      setWorkers(workers.concat(event.target.value.split('\n')));

      setWorkerValue('');
      return;
    }

    setWorkerValue(event.target.value);
  }

  function initializeWorker(event) {
    if (event.key === "Enter" && workerValue === "") {
      event.preventDefault();
      return;
    }


    if (event.key === "Enter") {
      event.preventDefault(); // prevent newline

      setWorkers([...workers, workerValue]);
      setWorkerValue('');
    }
  }

  return (
    <div className="workers-container">
      <h2 style={{ marginLeft: "1rem" }} className="title">
        Workers
      </h2>
      <ul>
        {workers.map((worker, index) => (
          <li key={index}>{worker}</li>
        ))}
      </ul>
      <textarea
        className="workers-text-area"
        rows={1}
        spellCheck={false}
        value={workerValue}
        onChange={handleWorkerValue}
        onKeyPress={initializeWorker}
      />
    </div>
  );
}
