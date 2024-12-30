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
import { useActionState } from 'react';
import { parseWithZod } from '@conform-to/zod';
import { useForm } from '@conform-to/react';
import { onboardingSchema } from '../lib/zodSchemas';
import { SubmitButton } from '../components/SubmitButton';
import { OnboardingAction } from '../services/onBoardingActions';

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Chào mừng bạn đến với Cal
            <span className="text-primary">kaicity</span>
          </CardTitle>
          <CardDescription>
            Chúng tôi cần thông tin đầy đủ để cập nhật tài khoản cá nhân của bạn
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Tên đầy đủ</Label>
              <Input
                name={fields?.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Nguyễn Văn A"
              />
              <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Thongular.com/
                </span>
                <Input
                  name={fields?.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="thongular-162002"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.userName.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Số điện thoại</Label>
              <Input
                name={fields?.phone.name}
                defaultValue={fields.phone.initialValue}
                key={fields.phone.key}
                placeholder="0703338458"
              />
              <p className="text-red-500 text-sm">{fields.phone.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Xác nhận" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
