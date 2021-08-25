"""
create_schedule packet:
name: str
workers: list [
    A A.
    B B.
    Bob C.
]
shifts: list [
    workers_minimum: int
    start: date str
    end: date str
    availabilities: list ***
]

*** added server-side, not included in http post request

"""