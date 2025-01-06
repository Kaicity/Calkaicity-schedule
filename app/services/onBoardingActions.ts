'use server';

import { redirect } from 'next/navigation';
import prisma from '../lib/db';
import { onboardingSchemaValidation } from '../lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { requireUser } from '../lib/hooks';

export async function OnboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            username: formData.get('userName') as string,
          },
        });
        return !existingUsername;
      },
    }),

    async: true,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      username: submission.value.userName,
      name: submission.value.fullName,
      phoneNumber: submission.value.phone,
      availability: {
        createMany: {
          data: [
            {
              day: 'Monday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Tuesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Wednesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Thursday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Friday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Saturday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
          ],
        },
      },
    },
  });

  return redirect('/onboarding/grant-id');
}
