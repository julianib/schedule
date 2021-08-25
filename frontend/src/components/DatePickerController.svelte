<script>
    import DatePicker from "./DatePicker.svelte";

    let dates = [new Date().getTime()]

    const addDate = () => {
        dates = [...dates, new Date().getTime()];
    }

    const removeShift = (event) => {
        dates = dates.filter(date => date.getTime() !== event.detail.getTime())
    }

    const sendDate = () => {
        fetch("http://localhost:3000/send_schedule", {
            method: "POST",
            body: dates
        })
    }
</script>

<div>
    {#each dates as date}
        <DatePicker {date} on:removeshift={removeShift}/>
    {/each}

    <button on:click={addDate}>+ Add another shift</button>

    <button on:click={sendDate}>Submit</button>
</div>