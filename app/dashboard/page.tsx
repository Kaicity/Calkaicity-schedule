import { notFound } from 'next/navigation';
import prisma from '../lib/db';
import { requireUser } from '../lib/hooks';
import { EmptyState } from '../components/EmptyState';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Delete,
  Edit,
  ExternalLink,
  Link2,
  Pen,
  Settings,
  Users2,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
        <>
          <div className="flex items-center justify-between ">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Tất cả sự kiện
              </h1>
              <p className="text-muted-foreground">
                Tạo và quản lý các sự kiện của bạn ở đây
              </p>
            </div>
            <Button>
              <Link href="/dashboard/new">Tạo mới sự kiện</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.eventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sự kiện</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.username}/${item.url}`}>
                            <ExternalLink className="mr-2 size-4" />
                            Xem trước
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 className="mr-2 size-4" />
                          Sao chép
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className="mr-2 size-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Delete className="mr-2 size-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href="/" className="flex items-center p-5">
                  <div className="flex-shrink-0">
                    <Users2 className="size-6" />
                  </div>

                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Phút họp
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted px-5 py-3 flex items-center justify-between">
                  <Switch />
                  <Button>
                    <Edit />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
