import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { displayFormatDays, type Day } from '@/app/utils/dayEnum';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { notFound } from 'next/navigation';
import { times } from '@/app/lib/times';
import { SubmitButton } from '@/app/components/SubmitButton';

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
        <CardTitle>Lịch trình</CardTitle>
        <CardDescription>
          Ở đây bạn có thể quản lý lịch trình của mình trong tuần
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {data.map((item) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4">
            <div key={item.id} className="flex items-center gap-x-3">
              <Switch defaultChecked={item.isActive} />
              <p>{displayFormatDays(item.day as Day)}</p>
            </div>

            <Select defaultValue={item.fromTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Thời gian bắt đầu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem value={time.time} key={time.id}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select defaultValue={item.tillTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Thời gian kết thúc" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem value={time.time} key={time.id}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <SubmitButton text="Lưu thay đổi" />
      </CardFooter>
    </Card>
  );
}
