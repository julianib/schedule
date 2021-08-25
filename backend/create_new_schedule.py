import json
import datetime as dt
from typing import List
import random


start_date = dt.date(2000, 1, 1)
end_date = dt.date(2000, 1, 7)

start_time_1 = dt.time(15, 0)
end_time_1 = dt.time(19, 0)

start_time_2 = dt.time(17, 0)
end_time_2 = dt.time(21, 0)


def get_all_days(first_day, last_day):  # generator
    """https://stackoverflow.com/questions/1060279/iterating-through-a-range-of-dates-in-python"""
    for n in range((last_day - first_day).days + 1):
        yield start_date + dt.timedelta(n)


def get_all_shifts(first_day, last_day, shift_times: list) -> List[tuple]:
    all_shifts = []
    for n in range((last_day - first_day).days + 1):
        day = start_date + dt.timedelta(n)
        for shift_time in shift_times:
            all_shifts.append((dt.datetime.combine(day, shift_time[0]), dt.datetime.combine(day, shift_time[1])))

    return all_shifts


shifts = get_all_shifts(start_date, end_date, [
    (start_time_1, end_time_1),
    (start_time_2, end_time_2)
])

print(shifts)

schedule = {
    "name": None,
    "author": None,
    "created": None,
    "shifts": [
        {
            "workers_minimum": 2,
            "start": s[0].strftime("%c"),
            "end": s[1].strftime("%c"),
            "availabilities": []
        } for s in shifts
    ]
}


workers = []
for i in range(5):
    worker = {
        "name": f"Worker {i}",
        "email": f"worker{i}@gmail.com",
        "id": i
    }
    workers.append(worker)

for worker in workers:
    for i, shift in enumerate(schedule["shifts"]):
        availability = random.choice([0, 5, 10])
        schedule["shifts"][i]["availabilities"].append(
            {
                "id": worker["id"],
                "availability": availability
            }
        )

with open("schedules.json", "r") as f:
    data = json.load(f)

with open("schedules.json", "w") as f:
    data["schedules"] = [schedule]  # .append(schedule)
    json.dump(data, f, indent=4)