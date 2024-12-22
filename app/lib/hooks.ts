'use server';

import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function requireUser() {
  try {
    // Lấy session người dùng
    const session = await auth();

    if (!session?.user?.id) {
      redirect('/');
    }
    return session;
  } catch (error) {
    console.error('Lỗi khi lấy session: ', error);
    redirect('/');
  }
}
