import { scheduleConstants } from "../../constants";

const { schedule: reducer } = require("../schedule.reducer");

describe("schedule reducer", () => {
    it("should remove enrollment when leaving shift", () => {
        const initialState = {
            homeSchedule: [
                {
                    enrollments: [{ id: 1 }],
                },
            ],
            schedule: [
                {
                    enrollments: [{ id: 1 }],
                },
            ],
            availableShifts: [
                {
                    counselor_enrollment: {
                        id: 1,
                    },
                },
            ],
        };
        const state = reducer(initialState, {
            type: scheduleConstants.LEAVE_SHIFT.SUCCEEDED,
            payload: {
                enrollment: { id: 1 },
            },
        });
        expect(state.homeSchedule).toHaveLength(0);
        expect(state.schedule).toHaveLength(0);
        expect(state.availableShifts).toHaveLength(0);
    });
});
