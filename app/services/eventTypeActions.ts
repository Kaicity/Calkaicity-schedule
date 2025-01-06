'use server';

import { parseWithZod } from '@conform-to/zod';
import { requireUser } from '../lib/hooks';
import { eventTypesSchema } from '../lib/zodSchemas';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';

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
