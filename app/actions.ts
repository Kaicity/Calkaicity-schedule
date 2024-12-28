'use server';

import prisma from './lib/db';
import { requireUser } from './lib/hooks';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchemaValidation, settingSchema } from './lib/zodSchemas';
import { redirect } from 'next/navigation';

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

export async function SettingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: settingSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect('/dashboard');
}
