import { SettingForm } from '@/app/components/SettingForm';
import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { notFound } from 'next/navigation';

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      phoneNumber: true,
      birthday: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function SettingsRoute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);

  return (
    <div className="">
      <SettingForm
        email={data.email as string}
        fullName={data.name as string}
        profileImage={data.image as string}
        phone={data.phoneNumber as string}
        birth={data.birthday as string}
      />
    </div>
  );
}
