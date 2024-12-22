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
            src={session?.user?.image as string}
            alt="Profile"
            width={20}
            height={20}
            className="w-full h-full rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="dashboard/settings">Settings</Link>
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
