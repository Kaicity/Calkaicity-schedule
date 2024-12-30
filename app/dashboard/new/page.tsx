'use client';

import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import DiscordIcon from '../../../public/discord.png';
import GoogleMeetIcon from '../../../public/meet.png';
import MicrosoftTeamsIcon from '../../../public/teams.png';
import Image from 'next/image';
import Link from 'next/link';

type VideoCallProvider = 'Discord' | 'Google Meet' | 'Microsoft Teams';

export default function NewEventToute() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>('Google Meet');

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Thêm cuộc hẹn mới</CardTitle>
          <CardDescription>
            Tạo cuộc hẹn cho phép mọi người đặt lịch hẹn với bạn
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Tiêu đề</Label>
              <Input placeholder="Cuộc họp 30 phút" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Đường dẫn {'(URL)'}</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Thongular.com/
                </span>
                <Input
                  //   name={fields?.userName.name}
                  //   defaultValue={fields.userName.initialValue}
                  //   key={fields.userName.key}
                  placeholder="thongular-162002"
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Mô tả</Label>
              <Textarea placeholder="Cuộc họp thảo luận về quản lý dự án" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Khoảng thời gian</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Khoảng thời gian</SelectLabel>
                    <SelectItem value="15">15 Phút</SelectItem>
                    <SelectItem value="30">30 Phút</SelectItem>
                    <SelectItem value="45">45 Phút</SelectItem>
                    <SelectItem value="60">Một giờ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Trình cung cấp cuộc gọi video</Label>
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => setActivePlatform('Discord')}
                  className="w-full"
                  variant={
                    activePlatform === 'Discord' ? 'secondary' : 'outline'
                  }
                >
                  <Image src={DiscordIcon} alt="" className="size-4 mr-2" />
                  Discord
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform('Google Meet')}
                  className="w-full"
                  variant={
                    activePlatform === 'Google Meet' ? 'secondary' : 'outline'
                  }
                >
                  <Image src={GoogleMeetIcon} alt="" className="size-4 mr-2" />
                  Google Meet
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform('Microsoft Teams')}
                  className="w-full"
                  variant={
                    activePlatform === 'Microsoft Teams'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  <Image
                    src={MicrosoftTeamsIcon}
                    alt=""
                    className="size-4 mr-2"
                  />
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Hủy</Link>
            </Button>
            <SubmitButton text="Tạo sự kiện" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
