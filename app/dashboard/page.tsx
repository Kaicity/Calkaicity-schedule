import { notFound } from 'next/navigation';
import prisma from '../lib/db';
import { requireUser } from '../lib/hooks';
import { EmptyState } from '../components/EmptyState';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function () {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="Bạn chưa có sự kiện nào"
          description="Bạn có thể tạo sự kiện mới bằng cách ấn vào nút tạo dưới đây"
          buttonText="Tạo sự kiện"
          href="dashboard/new"
        />
      ) : (
        <p>Dữ liệu sự kiện đã sẵn sàng</p>
      )}
    </>
  );
}
