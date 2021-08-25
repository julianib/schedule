import json
from sanic import Sanic
from sanic.response import json as sanic_json

from sanic_cors import CORS, cross_origin

app = Sanic(name="scheduler")
CORS(app)

@app.route('/send_schedule', methods=["POST"])
async def get_schedule(request):
    print(request.body.decode("utf-8").split(','))

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

if __name__ == "__main__":
    app.run(port=3000, auto_reload=True)
