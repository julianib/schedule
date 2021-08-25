from ortools.sat.python import cp_model
import json


with open("schedules.json", "r") as f:
    data = json.load(f)
    schedules = data["schedules"]
    schedule = schedules[0]


for shift in schedule["shifts"]:
    pass


shifts = schedule["shifts"]


