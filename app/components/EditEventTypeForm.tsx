'use client';

import { useActionState, useState } from 'react';
import {
  CreateEventTypeAction,
  EditEventTypeAction,
} from '../services/eventTypeActions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { eventTypesSchema } from '../lib/zodSchemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ZoomIcon from '../../public/zoom.png';
import GoogleMeetIcon from '../../public/meet.png';
import MicrosoftTeamsIcon from '../../public/teams.png';
import Link from 'next/link';
import { SubmitButton } from './SubmitButton';

type VideoCallProvider = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams';

interface isAppProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  url: string;
  videoCallSoftware: string;
}

export function EditEventForm({
  id,
  title,
  description,
  duration,
  url,
  videoCallSoftware,
}: isAppProps) {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    videoCallSoftware as VideoCallProvider,
  );

  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypesSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="max-w-screen-2xl h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa sự kiện</CardTitle>
          <CardDescription>
            Chỉnh sửa thông tin cuộc hẹn của bạn
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Tiêu đề</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="Cuộc họp 30 phút"
              />
              <div className="text-red-500 text-sm">{fields.title.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Đường dẫn {'(URL)'}</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Thongular.com/
                </span>
                <Input
                  name={fields.url.name}
                  defaultValue={url}
                  key={fields.url.key}
                  placeholder="thongular-162002"
                  className="rounded-l-none"
                />
              </div>
              <div className="text-red-500 text-sm">{fields.url.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Cuộc họp thảo luận về quản lý dự án"
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
              />
              <div className="text-red-500 text-sm">
                {fields.description.errors}
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Khoảng thời gian</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
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
              <div className="text-red-500 text-sm">
                {fields.duration.errors}
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Trình cung cấp cuộc gọi video</Label>
              <Input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => setActivePlatform('Zoom Meeting')}
                  className="w-full"
                  variant={
                    activePlatform === 'Zoom Meeting' ? 'secondary' : 'outline'
                  }
                >
                  <Image src={ZoomIcon} alt="" className="size-4 mr-2" />
                  Zoom
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
              <div className="text-red-500 text-sm">
                {fields.videoCallSoftware.errors}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Hủy</Link>
            </Button>
            <SubmitButton text="Lưu thay đổi" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
