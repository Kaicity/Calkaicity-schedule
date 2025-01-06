import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import UserDefault from '@/public/userDefault.webp';

interface UserOptionProps {
  session: any;
  SignOut: () => void;
}

export async function UserOption({ session, SignOut }: UserOptionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Image
            src={session?.user?.image || UserDefault}
            alt="Profile"
            width={64}
            height={64}
            quality={100}
            className="rounded-full size-10 object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Cài đặt</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button type="submit" className="w-full text-left" onClick={SignOut}>
            Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
