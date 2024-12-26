'use client';

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
import { SettingAction } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { settingSchema } from '../lib/zodSchemas';
import { useActionState, useState } from 'react';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface isAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingForm({ fullName, email, profileImage }: isAppProps) {
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [lastResult, action] = useActionState(SettingAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cài đặt</CardTitle>
        <CardDescription>
          Thiết lập và quản lý tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Tên đầy đủ</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="Nguyễn Văn A"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              defaultValue={email}
              disabled
              placeholder="ngyenminhthongitmix@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Hình ảnh cá nhân</Label>
            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="profileImage"
                  className="object-cover size-16"
                  width={64}
                  height={64}
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                  type="button"
                >
                  <X className="size-4"></X>
                </Button>
              </div>
            ) : (
              <h1>Không có hình ảnh</h1>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Lưu thay đổi" />
        </CardFooter>
      </form>
    </Card>
  );
}
