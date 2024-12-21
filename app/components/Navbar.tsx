'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import { AuthModal } from './AuthModal';

export default function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />
        <h4 className="text-3xl font-semibold">
          Cal<span className="text-primary">kaicity</span>
        </h4>
      </Link>
      <div className="flex items-center gap-4">
        <AuthModal />
      </div>
    </div>
  );
}
