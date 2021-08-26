import json
from sanic import Sanic
from sanic.response import json as sanic_json

from sanic_cors import CORS, cross_origin

app = Sanic(name="scheduler")
CORS(app)

# todo this file should handle
"""
GET return schedule if link contains the schedule ID
POST create new schedule if a host submits create schedule form
POST clients submit their availability, they pick their name from a list (privacy? alternative plz?)
if the host wants to edit the schedule later (add more days, shifts or worker names), should be possible
"""


@app.route('/send_schedule', methods=["POST"])
async def get_schedule(request):
    print(request.body.decode("utf-8").split(','))

"""
create_schedule packet:
name: str schedule name 
workers: list [
    A A.
    B B.
    Bob C.
]
shifts: list [
    workers_minimum: int
    start: date str
    end: date str
]

"""

if __name__ == "__main__":
    app.run(port=5000, auto_reload=True)
