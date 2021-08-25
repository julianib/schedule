# https://developers.google.com/optimization/scheduling/employee_scheduling#requests

from ortools.sat.python import cp_model
import random


def main():
    # This program tries to find an optimal assignment of nurses to shifts
    # (3 shifts per day, for 7 days), subject to some constraints (see below).
    # Each nurse can request to be assigned to specific shifts.
    # The optimal assignment maximizes the number of fulfilled shift requests.
    num_nurses = 40
    num_days = 40
    num_shifts_per_day = 2
    num_nurses_per_shift = 2
    all_nurses = range(num_nurses)
    all_days = range(num_days)
    all_shifts = range(num_shifts_per_day)
    shift_requests = []
    for n in all_nurses:
        request = [random.choices([0, 10, 10], cum_weights=[50, 100, 100], k=num_shifts_per_day) for d in all_days]
        shift_requests.append(request)
    print(shift_requests)
    # Creates the model.
    model = cp_model.CpModel()

    # Creates shift variables.
    # shifts[(n, d, s)]: nurse 'n' works shift 's' on day 'd'.
    shifts = {}
    for n in all_nurses:
        for d in all_days:
            for s in all_shifts:
                # shifts[(n, d, s)] = model.NewBoolVar('shift_n%id%is%i' % (n, d, s))
                shifts[(n, d, s)] = model.NewIntVar(0, 10, 'shift_n%id%is%i' % (n, d, s))

    # Each shift is assigned to exactly x nurses.
    for d in all_days:
        for s in all_shifts:
            model.Add(sum(shifts[(n, d, s)] for n in all_nurses) == num_nurses_per_shift)

    # Each nurse works at most one shift per day. (sometimes a day off)
    for n in all_nurses:
        for d in all_days:
            model.Add(sum(shifts[(n, d, s)] for s in all_shifts) <= 1)

    # Try to distribute the shifts evenly, so that each nurse works
    # min_shifts_per_nurse shifts. If this is not possible, because the total
    # number of shifts is not divisible by the number of nurses, some nurses will
    # be assigned one more shift.
    min_shifts_per_nurse = (num_nurses_per_shift * num_shifts_per_day * num_days) // num_nurses
    if num_nurses_per_shift * num_shifts_per_day * num_days % num_nurses == 0:
        max_shifts_per_nurse = min_shifts_per_nurse
    else:
        max_shifts_per_nurse = min_shifts_per_nurse + 1

    for n in all_nurses:
        num_shifts_worked = 0
        for d in all_days:
            for s in all_shifts:
                num_shifts_worked += shifts[(n, d, s)]
        model.Add(min_shifts_per_nurse <= num_shifts_worked)
        model.Add(num_shifts_worked <= max_shifts_per_nurse)

    model.Maximize(
        sum(shift_requests[n][d][s] * shifts[(n, d, s)] for n in all_nurses
            for d in all_days for s in all_shifts))
    # Creates the solver and solve.
    solver = cp_model.CpSolver()
    solver.Solve(model)
    requests_met = 0
    satisfaction = 0
    for d in all_days:
        print('Day', d)
        for n in all_nurses:
            for s in all_shifts:
                if solver.Value(shifts[(n, d, s)]) == 1:
                    satisfaction += shift_requests[n][d][s] / 10
                    if shift_requests[n][d][s] == 10:
                        print('Nurse', n, 'works shift', s, f'(requested).')
                        requests_met += 1
                    else:
                        print('Nurse', n, 'works shift', s, '(not requested).')
        print()

    # Statistics.
    print()
    print('Statistics')
    print('\t- Number of submitted shift requests met = %i' % solver.ObjectiveValue())
    print(f"\t- Resulting schedule meets {requests_met} requests (out of {num_nurses_per_shift * num_shifts_per_day * num_days})")
    print(f"\t- Satisfaction: {satisfaction} / {num_nurses_per_shift * num_shifts_per_day * num_days}")
    # todo "num_nurses * num_nurses_per_shift * num_shifts_per_day * num_days" returns incorrect amount
    print('\t- Wall time: %f s' % solver.WallTime())

    for n in all_nurses:
        worked_shifts = 0
        for d in all_days:
            for s in all_shifts:
                if solver.Value(shifts[(n, d, s)]) == 1:
                    worked_shifts += 1
        # print(f"nurse {n} worked {worked_shifts} shifts")


if __name__ == '__main__':
    main()
