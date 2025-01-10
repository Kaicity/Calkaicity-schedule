import { RenderCalendar } from '@/app/components/bookingForm/RenderCalendar';
import { TimeTable } from '@/app/components/bookingForm/TimeTable';
import { SubmitButton } from '@/app/components/SubmitButton';
import prisma from '@/app/lib/db';
import { CreateMeetingAction } from '@/app/services/eventTypeActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CalendarX2, Clock, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          name: true,
          availability: {
            select: { day: true, isActive: true },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {
  const data = await getData(params.eventUrl, params.username);

  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(selectedDate);

  const showForm = !!searchParams.date && searchParams.time;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div className="">
              <Image
                src={data?.user.image as string}
                alt="Profile image"
                width={64}
                height={64}
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data?.user.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data?.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data?.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.duration} Phút
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-[1px]" />

            <form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              <input type="hidden" name="fromTime" value={searchParams.time} />

              <input type="hidden" name="eventDate" value={searchParams.date} />

              <input type="hidden" name="meetingLength" value={data.duration} />

              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />

              <input type="hidden" name="username" value={params.username} />

              <input type="hidden" name="eventTypeId" value={data.id} />

              <div className="flex flex-col gap-y-2">
                <Label>Tên của bạn</Label>
                <Input name="name" placeholder="Tên của bạn" />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Email của bạn</Label>
                <Input name="email" placeholder="nguyenvana@gmail.com" />
              </div>

              <SubmitButton text="Đặt lịch hẹn" className="w-full mt-5" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
            <div className="">
              <Image
                src={data?.user.image as string}
                alt="Profile image"
                width={64}
                height={64}
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data?.user.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data?.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data?.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.duration} Phút
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <RenderCalendar availability={data?.user.availability as any} />

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <TimeTable
              selectedDate={selectedDate}
              userName={params.username}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
