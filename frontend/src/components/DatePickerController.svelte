<script>
    import DatePicker from "./DatePicker.svelte";

    let dates = [new Date()]

    const addDate = () => {
        const newDate = new Date();
        dates = [...dates, newDate];
    }

    const removeShift = (event) => {
        dates = dates.filter(date => date.getTime() !== event.detail.getTime())
    }

    const sendDate = () => {
        
    }
</script>

<div>

    {#each dates as date}
        <DatePicker {date} on:removeshift={removeShift}/>
    {/each}

    <button on:click={addDate}>+ Add another shift</button>

    <button on:click={sendDate}>Submit</button>
</div>