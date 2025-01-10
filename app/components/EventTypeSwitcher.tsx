'use client';

import { Switch } from '@/components/ui/switch';
import { useActionState, useEffect, useTransition } from 'react';
import { UpdateEventTypeStatusAction } from '../services/eventTypeActions';
import { toast } from 'sonner';

export function MenuActiveSwitch({
  initalChecked,
  eventTypeId,
}: {
  initalChecked: boolean;
  eventTypeId: string;
}) {
  const [state, action] = useActionState(
    UpdateEventTypeStatusAction,
    undefined,
  );

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initalChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
    />
  );
}
