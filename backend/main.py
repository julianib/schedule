import random
import json

days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
availability = [0, 1, 2]
users_per_day_minimum = 2
user_days_minimum = 1

users = []
for i in range(10):
    user = {
        "name": f"user{i}",
        "available": {}
    }

    for d in days:
        user["available"][d] = random.choice(availability)

    users.append(user)

with open("availability.json", "w") as f:
    json.dump(users, f, indent=4)

