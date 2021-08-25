from ortools.sat.python import cp_model
import json


def main():
    with open("schedules.json", "r") as f:
        data = json.load(f)
        schedules = data["schedules"]
        schedule = schedules[0]

    print(f"Processing schedule '{schedule['name']}'")
    shifts = schedule["shifts"]
    workers = schedule["workers"]

    num_shifts = len(shifts)
    num_workers = len(workers)

    # predefined workers that did not send their availability
    # will get [0, ..., 0] on every date instead
    for worker in workers:
        for shift in shifts:
