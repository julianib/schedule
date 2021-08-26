import json
import datetime as dt
from typing import List
import random


"""
days: [
    {
        date: date
        shifts: [
            {
                start: time
                end: time
                workers: int
                preferences: []
            }
        ]
    }
]
"""


def get_all_days(first_day, last_day):  # generator
    """https://stackoverflow.com/questions/1060279/iterating-through-a-range-of-dates-in-python"""
    for n in range((last_day - first_day).days + 1):
        yield first_day + dt.timedelta(n)


def get_all_days_and_shifts(first_day, last_day, shift_times: List[tuple]) -> List[dict]:
    all_days_and_shifts = []
    for day_i in range((last_day - first_day).days + 1):
        day = {
            "id": f"d-{day_i}",
            "date": (first_day + dt.timedelta(day_i)).strftime("%e %b %Y"),
            "shifts": []
        }

        for shift_i, shift_time in enumerate(shift_times):
            day["shifts"].append({
                "id": f"s-{shift_i}",
                "start": shift_time[0].strftime("%X"),
                "end": shift_time[1].strftime("%X"),
                "workers_required": random.choice([1, 2]),
                "preferences": {}
            })
            # all_shifts.append((dt.datetime.combine(day, shift_time[0]), dt.datetime.combine(day, shift_time[1])))

        all_days_and_shifts.append(day)

    return all_days_and_shifts


def main():
    start_date = dt.date(2000, 1, 1)
    end_date = dt.date(2000, 1, 30)

    start_time_1 = dt.time(15, 0)
    end_time_1 = dt.time(19, 0)

    start_time_2 = dt.time(16, 0)
    end_time_2 = dt.time(20, 0)

    start_time_3 = dt.time(17, 0)
    end_time_3 = dt.time(21, 0)

    days = get_all_days_and_shifts(start_date, end_date, [
        (start_time_1, end_time_1),
        (start_time_2, end_time_2),
        (start_time_3, end_time_3)
    ])

    schedule = {
        "name": "schedule name here",
        "workers": [
            {
                "id": f"w-{i}",
                "name": f"Worker #{i}"
            } for i in range(90)
        ],
        "days": days
    }

    for day in schedule["days"]:
        for shift in day["shifts"]:
            for worker in schedule["workers"]:
                preference = random.choice([0, 2, 4, 6, 8, 10])
                shift["preferences"][worker["id"]] = preference

    with open("schedules.json", "r") as f:
        data = json.load(f)

    with open("schedules.json", "w") as f:
        data["schedules"] = [schedule]  # .append(schedule)
        json.dump(data, f, indent=4)

    print(f"Success\n{schedule}")


if __name__ == "__main__":
    main()