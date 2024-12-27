import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Logo from '@/public/logo.png';
import { DashboardLinks } from '../components/DashboardLinks';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SignOut } from '../lib/auth-action';
import { UserOption } from '../components/UserOption';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';
import { requireUser } from '../lib/hooks';
import { Toaster } from '@/components/ui/sonner';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      grantId: true,
    },
  });

  if (!data?.username) {
    return redirect('/onboarding');
  }

  if (!data?.grantId) {
    return redirect('/onboarding/grant-id');
  }

  return data;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();

  const data = await getData(session?.user?.id as string);

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-10" />
                <p className="text-xl font-bold">
                  Cal<span className="text-primary">kaicity</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 lg:h-[60px] px-4 lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden shrink-0" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image src={Logo} alt="Logo" className="size-10" />
                    <p className="text-xl font-bold">
                      Cal<span className="text-primary">kaicity</span>
                    </p>
                  </SheetTitle>
                  <SheetDescription>
                    Hệ thống phần mềm lập lịch và kế hoạch
                  </SheetDescription>
                </SheetHeader>
                <nav className="grid gap-2">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <UserOption session={session} SignOut={SignOut} />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}
