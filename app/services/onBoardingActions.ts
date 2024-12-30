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
              day: 'MONDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'TUESDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'WEDNESDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'THURSDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'FRIDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'SATURDAY',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'SUNDAY',
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
