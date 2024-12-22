'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import GoogleIcon from '@/public/google.png';
import GithubIcon from '@/public/github-dark.png';
import { Loader2 } from 'lucide-react';

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          Chờ xử lý
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          Đăng nhập với Google
          <Image src={GoogleIcon} alt="" className="size-4 mr-2" />
        </Button>
      )}
    </>
  );
}

export function GithubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          Chờ xử lý
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          Đăng nhập với Github
          <Image src={GithubIcon} alt="" className="size-4 mr-2" />
        </Button>
      )}
    </>
  );
}
