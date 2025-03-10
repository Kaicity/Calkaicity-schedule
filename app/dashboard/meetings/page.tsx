import { EmptyState } from '@/app/components/EmptyState';
import { PageContainer } from '@/app/components/PageContainer';
import { SubmitButton } from '@/app/components/SubmitButton';
import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { nylas } from '@/app/lib/nylas';
import { cancelMeetingAction } from '@/app/services/eventTypeActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { format, fromUnixTime } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Link, Search, Video } from 'lucide-react';

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error('Người dùng không được tìm thấy');
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  // console.log(data.data[0]);

  return (
    <div className="">
      {data.data.length < 1 ? (
        <EmptyState
          title="Chưa có cuộc họp nào"
          description="Bạn chưa có cuộc họp nào được tạo ở đây"
          buttonText="Tạo sự kiện mới"
          href="/dashboard/new"
        />
      ) : (
        <>
          <Tabs defaultValue="works" className="w-full">
            <TabsList className="mb-3">
              <TabsTrigger value="works">Công việc</TabsTrigger>
              <TabsTrigger value="meetings">Cuộc họp</TabsTrigger>
            </TabsList>

            <div className="mb-3 w-[300px]">
              <form className="relative">
                <Input name="search" placeholder="Nhập nội dung tìm kiếm" className="pr-10" />
                <Button
                  type="submit"
                  variant="outline"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="size-4" />
                </Button>
              </form>
            </div>

            <TabsContent value="works">
              <Card>
                <CardHeader>
                  <CardTitle>Các công việc cần làm</CardTitle>
                  <CardDescription>Xem các sự kiến dự kiến đã được lên lịch.</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.data
                    .filter(
                      (item) =>
                        //  @ts-ignore
                        !item.conferencing.details,
                    )
                    .map((item) => (
                      <form action={cancelMeetingAction} key={item.id}>
                        <input type="hidden" name="eventId" value={item.id} />

                        <div className="grid grid-cols-3 justify-between items-center">
                          <div className="">
                            <p className="text-sm text-muted-foreground">
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM', {
                                locale: vi,
                              })}
                            </p>

                            <p className="text-xs text-muted-foreground pt-1">
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.startTime), 'hh:mm a')} -{' '}
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.endTime), 'hh:mm a')}
                            </p>

                            <div className="flex items-center mt-1">
                              {/*  @ts-ignore */}
                              <Link className="size-4 text-primary mr-2" />
                              <a
                                // @ts-ignore
                                href={item?.textDescription}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary underline underline-offset-4 cursor-pointer"
                              >
                                Xem chi tiết
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-col items-start">
                            <h2 className="text-sm font-medium">{item.title}</h2>
                            <p className="text-sm text-muted-foreground">
                              {item.participants[0]?.name}
                            </p>
                          </div>

                          <SubmitButton
                            text="Hủy sự kiện"
                            variant="destructive"
                            className="w-fit flex ml-auto"
                          />
                        </div>
                        <Separator className="my-3" />
                      </form>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meetings">
              <Card>
                <CardHeader>
                  <CardTitle>Các cuộc họp</CardTitle>
                  <CardDescription>Xem các sự kiến dự kiến đã được lên lịch.</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.data
                    .filter(
                      (item) =>
                        //  @ts-ignore
                        item.conferencing.details,
                    )
                    .map((item) => (
                      <form action={cancelMeetingAction} key={item.id}>
                        <input type="hidden" name="eventId" value={item.id} />

                        <div className="grid grid-cols-3 justify-between items-center">
                          <div className="">
                            <p className="text-sm text-muted-foreground">
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM', {
                                locale: vi,
                              })}
                            </p>

                            <p className="text-xs text-muted-foreground pt-1">
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.startTime), 'hh:mm a')} -{' '}
                              {/* @ts-ignore */}
                              {format(fromUnixTime(item.when.endTime), 'hh:mm a')}
                            </p>

                            <div className="flex items-center mt-1">
                              {/*  @ts-ignore */}
                              <Video className="size-4 text-primary mr-2" />
                              <a
                                //  @ts-ignore
                                href={item.conferencing.details?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary underline underline-offset-4"
                              >
                                Tham gia
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-col items-start">
                            <h2 className="text-sm font-medium">{item.title}</h2>
                            <p className="text-sm text-muted-foreground">
                              {item.participants[0]?.name}
                            </p>
                          </div>

                          <SubmitButton
                            text="Hủy sự kiện"
                            variant="destructive"
                            className="w-fit flex ml-auto"
                          />
                        </div>

                        <Separator className="my-3" />
                      </form>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
