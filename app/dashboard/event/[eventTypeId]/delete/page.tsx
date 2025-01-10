import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function DeleteEventType() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Xóa sự kiện</CardTitle>
          <CardDescription>Bạn chắc chắn xóa sự kiện này chứ ?</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>
            <Link href="/dashboard">Hủy</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
