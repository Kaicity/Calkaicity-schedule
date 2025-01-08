'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';

export function CopyLinkMenuItem({ meetingUrl }: { meetingUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success('Đường dẫn URL đã được sao chép');
    } catch (error) {
      toast.error('Không thể sao chép đường dẫn');
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="mr-2 size-4" />
      Sao chép
    </DropdownMenuItem>
  );
}
