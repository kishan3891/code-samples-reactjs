import { createPlugin, unpromisify } from "@fullcalendar/core";
import { CounslrTimeGridView } from "./CounslrTimeGridView";
//import timeGridPlugin from "@fullcalendar/timegrid";
//export default timeGridPlugin;
import { canViewDateRange } from "./utils";

const eventSourceDef = {
    parseMeta(raw) {
        if (typeof raw === "function") {
            // short form
            return raw;
        } else if (typeof raw.events === "function") {
            return raw.events;
        }
        return null;
    },

    fetch(arg, success, failure) {
        let dateEnv = arg.calendar.dateEnv;
        let func = arg.eventSource.meta;

        if (!canViewDateRange(arg.range.start)) {
            return success({ rawEvents: [] });
        }

        unpromisify(
            func.bind(null, {
                // the function returned from parseMeta
                start: dateEnv.toDate(arg.range.start),
                end: dateEnv.toDate(arg.range.end),
                startStr: dateEnv.formatIso(arg.range.start),
                endStr: dateEnv.formatIso(arg.range.end),
                timeZone: dateEnv.timeZone,
            }),
            function (rawEvents) {
                // success
                success({ rawEvents }); // needs an object response
            },
            failure // send errorObj directly to failure callback
        );
    },
};
export default createPlugin({
    eventSourceDefs: [eventSourceDef],
    defaultView: "timeGridWeek",
    views: {
        timeGrid: {
            class: CounslrTimeGridView,
            allDaySlot: true,
            slotDuration: "00:30:00",
            slotEventOverlap: true, // a bad name. confused with overlap/constraint system
        },

        timeGridDay: {
            type: "timeGrid",
            duration: { days: 1 },
        },

        timeGridWeek: {
            type: "timeGrid",
            duration: { weeks: 1 },
        },
    },
});
