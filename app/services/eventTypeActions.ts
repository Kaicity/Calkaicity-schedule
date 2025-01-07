'use server';

import { parseWithZod } from '@conform-to/zod';
import { requireUser } from '../lib/hooks';
import { eventTypesSchema } from '../lib/zodSchemas';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';
import { nylas } from '../lib/nylas';
import { revalidatePath } from 'next/cache';

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData,
) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypesSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id!,
      active: true,
    },
  });

  return redirect('/dashboard');
}

export async function CreateMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      username: formData.get('username') as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!getUserData) {
    throw new Error('Không tìm thấy người dùng này');
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get('eventTypeId') as string,
    },
    select: {
      title: true,
      description: true,
    },
  });

  // Lấy thông tin thời gian trong form và tạo cho nylas lập lịch
  const fromTime = formData.get('fromTime') as string;
  const eventDate = formData.get('eventDate') as string;
  const meetingLength = Number(formData.get('meetingLength'));
  const provider = formData.get('provider') as string;

  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
  startDateTime.setHours(startDateTime.getHours() + 7); // Gio UTC + 7 VIET NAM

  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  await nylas.events.create({
    identifier: getUserData?.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: provider as any,
        // provider: 'Google Meet',
      },
      participants: [
        {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          status: 'yes',
        },
      ],
    },
    queryParams: {
      calendarId: getUserData?.grantEmail as string,
      notifyParticipants: true,
    },
  });

  return redirect(`/success`);
}

export async function cancelMeetingAction(formData: FormData) {
  const session = await requireUser();

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error('Không tìm thấy người dùng này');
  }

  const data = await nylas.events.destroy({
    eventId: formData.get('eventId') as string,
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  revalidatePath('/dashboard/meetings');
}
