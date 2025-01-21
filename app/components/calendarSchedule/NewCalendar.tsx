import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { SubmitButton } from '../SubmitButton';

export function NewCalendar() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Tạo mới</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lịch trình</DialogTitle>
            <DialogDescription>Tạo và theo dõi lịch trình của bạn ở đây</DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
          </form>
          <DialogFooter>
            <SubmitButton text="Tạo lịch trình" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
