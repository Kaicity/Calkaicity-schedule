import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function NewEventToute() {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Thêm cuộc hẹn mới</CardTitle>
          <CardDescription>
            Tạo cuộc hẹn cho phép mọi người đặt lịch hẹn với bạn
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Tiêu đề</Label>
              <Input placeholder="Cuộc họp 30 phút" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Đường dẫn {'(URL)'}</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Thongular.com/
                </span>
                <Input
                  //   name={fields?.userName.name}
                  //   defaultValue={fields.userName.initialValue}
                  //   key={fields.userName.key}
                  placeholder="thongular-162002"
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Mô tả</Label>
              <Textarea placeholder="Cuộc họp thảo luận về quản lý dự án" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Khoảng thời gian</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Khoảng thời gian</SelectLabel>
                    <SelectItem value="15">15 Phút</SelectItem>
                    <SelectItem value="30">30 Phút</SelectItem>
                    <SelectItem value="45">45 Phút</SelectItem>
                    <SelectItem value="60">Một giờ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Trình cung cấp cuộc gọi video</Label>
              <ButtonGroup>
                <Button>Discord</Button>
                <Button>Google Meet</Button>
                <Button>Microsoft Teams</Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Tạo sự kiện" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
