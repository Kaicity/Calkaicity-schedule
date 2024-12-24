import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AlmostDone from '../../../public/almostDone.webp';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarCheck2 } from 'lucide-react';

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Bạn gần xong rồi</CardTitle>
          <CardDescription>
            Chúng tôi sẽ kết nối lịch của bạn bằng tài khoản này
          </CardDescription>
          <Image
            src={AlmostDone}
            alt="Almost finished gif"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" /> Kết nối lịch với tài
              khoản của bạn
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
