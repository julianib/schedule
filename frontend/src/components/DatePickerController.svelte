<script>
    import DatePicker from "./DatePicker.svelte";

    let date = [
        {
            date: new Date().getTime(),
            
        }
    ];

</script>

<div>
    {#each date as date}
        <DatePicker {date} />
    {/each}

    <button>+ Add another shift</button>

    <button>Submit</button>
</div>
