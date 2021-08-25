from ortools.sat.python import cp_model
import json


def main():
    with open("schedules.json", "r") as f:
        data = json.load(f)
        schedules = data["schedules"]
        schedule = schedules[0]

    print(f"Processing schedule '{schedule['name']}'")
    days = schedule["days"]
    workers = schedule["workers"]

    n_days = len(days)
    n_shifts = sum([len(day["shifts"]) for day in days])
    n_workers = len(workers)
    print(f"Days: {n_days}, unique shifts: {n_shifts}, {round(n_shifts / n_days, 1)} shifts/day, workers: {n_workers}")

    # registered workers that did not send their availability
    # will get [0, ..., 0] on every date instead
    n_preferences_submitted = 0
    n_preferences_set_to_default = 0
    for day in days:
        day_id = day["id"]
        for shift in day["shifts"]:
            shift_id = shift["id"]
            worker_ids_submitted = [worker_id for worker_id in shift["preferences"].keys()]
            n_preferences_submitted += len(worker_ids_submitted)
            for worker in workers:
                worker_id = worker["id"]
                if worker_id not in worker_ids_submitted:
                    shift["preferences"][worker_id] = 0
                    n_preferences_set_to_default += 1
                    print(f"Registered worker {worker_id} did not submit preference for day {day_id} shift {shift_id}, set to 0")

    print(f"Shift preferences submitted: {n_preferences_submitted} / {n_preferences_submitted + n_preferences_set_to_default}")

    # create model
    model = cp_model.CpModel()

    # create model variables that need to be optimized
    final_schedule = {}
    for day in days:
        day_id = day["id"]
        for shift in day["shifts"]:
            shift_id = shift["id"]
            for worker in workers:
                worker_id = worker["id"]
                # final_schedule[(day_id, shift_id, worker_id)] = model.NewIntVar(
                #     0, 10, f"{day_id}_{shift_id}_{worker_id}_assigned"
                # )
                final_schedule[(day_id, shift_id, worker_id)] = model.NewBoolVar(
                    f"{day_id}_{shift_id}_{worker_id}"
                )

    n_worker_shifts_required = 0  # takes into account workers_required > 1 for shifts
    for day in days:
        for shift in day["shifts"]:
            n_worker_shifts_required += shift["workers_required"]
    print(f"Worker shifts required: {n_worker_shifts_required}")

    # add constraint: minimum workers of each shift
    for day in days:
        day_id = day["id"]
        for shift in day["shifts"]:
            shift_id = shift["id"]
            workers_required = shift["workers_required"]
            model.Add(
                sum(
                    final_schedule[(day_id, shift_id, worker["id"])] for worker in workers
                ) == workers_required  # todo '>=' if workers need to work a minimum amount of shifts
            )

    # add constraint: each worker works at most once per day
    for worker in workers:
        worker_id = worker["id"]
        for day in days:
            day_id = day["id"]
            shifts = day["shifts"]
            model.Add(
                sum(
                    final_schedule[(day_id, shift["id"], worker_id)] for shift in shifts
                ) <= 1
            )

    # set min and max amount of shifts per worker, to
    # divide the work as evenly as possible (sometimes some
    # workers work an extra shift)
    shifts_per_worker_min = n_worker_shifts_required // n_workers
    if n_worker_shifts_required % n_workers == 0:
        shifts_per_worker_max = shifts_per_worker_min
    else:
        shifts_per_worker_max = shifts_per_worker_min + 1

    print(f"Shifts per worker: min: {shifts_per_worker_min}, max: {shifts_per_worker_max}")

    # todo constraint: worker can only be on one LOCATION

    # add constraint: take into account shifts per worker min and max amounts
    for worker in workers:
        worker_id = worker["id"]
        n_shifts_worked = 0
        for day in days:
            day_id = day["id"]
            for shift in day["shifts"]:
                shift_id = shift["id"]
                n_shifts_worked += final_schedule[(day_id, shift_id, worker_id)]

        model.Add(shifts_per_worker_min <= n_shifts_worked)
        model.Add(n_shifts_worked <= shifts_per_worker_max)

    # define model's objective
    model.Maximize(
        sum(  # maybe error because bool * int = problema
            final_schedule[(day["id"], shift["id"], worker["id"])]
            * shift["preferences"][worker["id"]]
            for day in days
            for shift in day["shifts"]
            for worker in workers
        )
    )

    # solve!
    solver = cp_model.CpSolver()
    print("Solving model...")
    solver.Solve(model)
    print("Solved model")
    satisfaction = 0  # if worker gets a shift with preference 10/10, satisfaction increases with 1
    print()
    for day in days:
        day_id = day["id"]
        print(f"Day {day_id}")
        for shift in day["shifts"]:
            shift_id = shift["id"]
            print(f"Shift {shift['id']}, workers min: {shift['workers_required']}")
            for worker in workers:
                worker_id = worker["id"]
                if solver.Value(final_schedule[(day_id, shift_id, worker_id)]) == 1:
                    satisfaction += shift["preferences"][worker_id] / 10
                    print(f"\t- Worker {worker_id} assigned, "
                          f"solver value: {solver.Value(final_schedule[(day_id, shift_id, worker_id)])}, "
                          f"preference: {shift['preferences'][worker_id]}")
            print()

    print("Stats")
    print(f"\t- Solver value: {solver.ObjectiveValue()} (theoretical max: {n_worker_shifts_required * 10})")
    print(f"\t- Satisfaction: {satisfaction} / {n_worker_shifts_required}")
    print(f"\t- Wall time: {solver.WallTime()}")


if __name__ == "__main__":
    main()