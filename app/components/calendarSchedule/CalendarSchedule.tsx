'use client';

import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
// import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';

interface isAppProps {
  events: { id: string; title: string | undefined; start: string; end: string }[];
}

export function CalendarX({ events }: isAppProps) {
  const calendar = useNextCalendarApp({
    views: [createViewWeek(), createViewMonthGrid(), createViewDay(), createViewMonthAgenda()],
    defaultView: createViewWeek().name,
    events: events,
    plugins: [createEventModalPlugin()],
    selectedDate: '2025-01-20',
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
}
