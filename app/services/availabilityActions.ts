'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../lib/db';
import { requireUser } from '../lib/hooks';

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  // console.log('rawData is', rawData);

  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith('id-'))
    .map((key) => {
      const id = key.replace('id-', '');

      return {
        id,
        isActive: rawData[`isActive-${id}`] === 'on',
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  /* prisma.$transaction:
    Gửi một loạt truy vấn tới cơ sở dữ liệu trong một giao dịch.
    Nếu bất kỳ truy vấn nào thất bại, toàn bộ giao dịch sẽ bị hủy. */
  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        }),
      ),
    );

    revalidatePath('/dashboard/availability');
  } catch (error) {
    console.log(error);
  }
}
