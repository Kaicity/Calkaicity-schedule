'use client';
import * as React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTaskStore } from './utils/store';
import { toast } from 'sonner';
import { Edit2Icon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '../SubmitButton';
import { cn } from '@/lib/utils';

export function TaskActions({ title, id }: { title: string; id: string }) {
  const [open, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState(title);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditDisable(!editDisable);
          updateTask(id, name);
          toast.success(`${title} cập nhật thành ${name}`);
        }}
      >
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className={cn(`w-[100px] h-2 bg-primary rounded-md`)}></div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto p-2 text-secondary-foreground/50 rounded-full"
                >
                  <span className="sr-only">Actions</span>
                  <Edit2Icon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem
                  onSelect={() => {
                    setIsEditDisable(!editDisable);
                    setTimeout(() => {
                      inputRef.current && inputRef.current?.focus();
                    }, 500);
                  }}
                >
                  Cập nhật
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="text-red-600"
                >
                  Xóa task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100 resize-none"
            disabled={editDisable}
            ref={inputRef}
          />

          {!editDisable && (
            <div className="flex items-center mt-3 gap-2">
              <SubmitButton text="Lưu" variant="default" />
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDisable(!editDisable);
                }}
              >
                Hủy
              </Button>
            </div>
          )}
        </div>
      </form>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn task này?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                // yes, you have to set a timeout
                setTimeout(() => (document.body.style.pointerEvents = ''), 100);

                setShowDeleteDialog(false);
                removeTask(id);
                toast.success('Task đã được xóa.');
              }}
            >
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
