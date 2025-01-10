'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Delete } from 'lucide-react';
import { DeleteEventTypeAction } from '../services/eventTypeActions';
import { DeleteButton } from './SubmitButton';

export function ActionModalDialog({ eventTypeId }: { eventTypeId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button
          variant="destructive"
          className="w-full mt-1 flex items-center justify-start"
        >
          <Delete className="size-5" />
          <span>Xóa sự kiện</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[400px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Xóa sự kiện</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn là xóa sự kiện này chứ?
          </DialogDescription>
        </DialogHeader>
        <form action={DeleteEventTypeAction}>
          <input type="hidden" name="id" value={eventTypeId} />
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="secondary">Hủy</Button>
            </DialogTrigger>
            <DeleteButton text="Xác nhận" variant="destructive" className="" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
