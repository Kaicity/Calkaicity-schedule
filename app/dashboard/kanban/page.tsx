import { KanbanBoard } from '@/app/components/Kanban/kanban-board';
import NewTaskDialog from '@/app/components/Kanban/new-task-dialog';
import { requireUser } from '@/app/lib/hooks';

export default async function KanbanRoute() {
  const session = await requireUser();

  return (
    <div className="">
      <div className="flex items-center justify-between w-[850px] mb-5">
        <div className="hidden sm:grid gap-y-1">
          <h1 className="text-3xl md:text-4xl font-semibold">Kanban</h1>
          <p className="text-muted-foreground">Quản lý task của bạn</p>
        </div>
        <NewTaskDialog />
      </div>

      <div className="space-y-4">
        <div className="w-[80vw] overflow-visible">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
