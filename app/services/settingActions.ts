'use server';

import { parseWithZod } from '@conform-to/zod';
import { requireUser } from '../lib/hooks';
import { settingSchema } from '../lib/zodSchemas';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';

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
      phoneNumber: submission.value.phone,
      birthday: submission.value.birth,
    },
  });

  return redirect('/dashboard');
}
