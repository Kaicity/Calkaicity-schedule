import prisma from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { authConfig, nylas } from '@/app/lib/nylas';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await requireUser();

  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return Response.json('Ôi chúng tôi không lấy được mã code', {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: authConfig.apiKey,
      clientId: authConfig.clientId,
      redirectUri: authConfig.redirectUri,
      code: code,
    });

    const { grantId, email } = response;

    //Lấy thông tin grantId và grantEmail của nylas, sau đó update dữ liệu trong db ở bảng user
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.error('Đã có lỗi khi xử lý dữ liệu', error);
    return Response.json('Không thể đổi mã xác thực để xử lý token');
  }

  redirect('/dashboard');
}
