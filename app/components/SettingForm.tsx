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
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { settingSchema } from '../lib/zodSchemas';
import { useActionState, useEffect, useState } from 'react';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UploadDropzone } from '../lib/uploadthing';
import { toast } from 'sonner';
import { DatePicker } from '@/components/ui/datepicker';
import { format, isValid } from 'date-fns';
import { SettingAction } from '../services/settingActions';
import { transferDatefromStringToDate } from '../utils/dateTransfer';

interface isAppProps {
  fullName: string;
  email: string;
  profileImage: string;
  phone: string;
  birth: string;
}

export function SettingForm({
  fullName,
  email,
  profileImage,
  phone,
  birth,
}: isAppProps) {
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date as Date);
    console.log('Selected Date:', date);
  };

  // Chuyển đổi chuỗi ngày từ server thành đối tượng Date nếu hợp lệ
  useEffect(() => {
    if (birth) {
      const parsedDate = transferDatefromStringToDate(birth);
      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
      } else {
        console.error('Invalid date format for birth');
      }
    }
  }, [birth]);

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-y-2">
                <Label>Tên đầy đủ</Label>
                <Input
                  name={fields.fullName.name}
                  key={fields.fullName.key}
                  defaultValue={fullName}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Số điện thoại</Label>
                <Input
                  name={fields.phone.name}
                  key={fields.phone.key}
                  defaultValue={phone}
                  placeholder="09095956893"
                />
                <p className="text-red-500 text-sm">{fields.phone.errors}</p>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Ngày sinh</Label>
                <Input
                  type="hidden"
                  name={fields.birth.name}
                  key={fields.birth.key}
                  value={selectedDate ? format(selectedDate, 'dd-MM-yyyy') : ''}
                />
                <DatePicker
                  onDateChange={handleDateChange}
                  startYear={1900}
                  dateValue={selectedDate}
                  endYear={new Date().getFullYear()}
                />
                <p className="text-red-500 text-sm">{fields.birth.errors}</p>
              </div>
            </div>
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
            <Input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="profileImage"
                  className="object-cover size-16 rounded-md"
                  width={64}
                  height={64}
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  className="absolute w-4 h-7 -top-3 -right-3 rounded-full"
                  type="button"
                >
                  <X className="w-4 h-4"></X>
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success('Hình ảnh của bạn đã được upload');
                }}
                onUploadError={(error) => {
                  console.log('Đã có lỗi xảy ra khi upload file', error);
                  toast.error(error.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Lưu thay đổi" />
        </CardFooter>
      </form>
    </Card>
  );
}
