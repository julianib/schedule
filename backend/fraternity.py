import random

users = [ f"user-{i}" for i in range(90) ]
users_schedule = dict.fromkeys(users, [])

days = [0, 1, 2, 3, 4]

for user in users_schedule:
    users_schedule[user] = sorted(random.sample(days, 3))

