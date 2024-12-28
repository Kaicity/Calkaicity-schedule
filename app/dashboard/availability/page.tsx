import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { displayFormatDays, type Day } from '@/app/utils/dayEnum';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notFound } from 'next/navigation';

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function AvailabilityRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Khả dụng</CardTitle>
        <CardDescription>
          Ở đây bạn có thể quản lý tính khả dụng của mình
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((item) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"></div>
        ))}
      </CardContent>
    </Card>
  );
}
