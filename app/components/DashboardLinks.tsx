'use client';

import { cn } from '@/lib/utils';
import { Calendar, CalendarCheck, HomeIcon, Kanban, Settings, User2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: any;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: 'Sự kiện',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 1,
    name: 'Cuộc họp',
    href: '/dashboard/meetings',
    icon: User2,
  },
  {
    id: 2,
    name: 'Lịch khả dụng',
    href: '/dashboard/availability',
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: 'Lịch trình',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    id: 4,
    name: 'Kanban',
    href: '/dashboard/kanban',
    icon: Kanban,
  },
  {
    id: 5,
    name: 'Cài đặt',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardLinks() {
  const pathName = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathName === link.href
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground',
            'flex items-center gap-3 rounded-lg px-3 py-2 mb-2 transition-all hover:text-primary',
          )}
          key={link.id}
          href={link.href}
        >
          <link.icon size={24} />
          {link.name}
        </Link>
      ))}
    </>
  );
}
