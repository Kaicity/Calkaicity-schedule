import { CalendarX } from '@/app/components/calendarSchedule/CalendarSchedule';
import { NewCalendar } from '@/app/components/calendarSchedule/NewCalendar';

import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { nylas } from '@/app/lib/nylas';
import { format, fromUnixTime } from 'date-fns';

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error('Người dùng không được tìm thấy');
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

export default async function CalendarRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  const events = data.data.map((item) => ({
    id: item.id,
    title: item.title,
    // @ts-ignore
    start: format(fromUnixTime(item.when.startTime), 'yyyy-MM-dd hh:mm'),
    // @ts-ignore
    end: format(fromUnixTime(item.when.endTime), 'yyyy-MM-dd hh:mm'),
  }));

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        <NewCalendar />
      </div>
      <CalendarX events={events} />
    </div>
  );
}
