import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-11 h-11 shrink-0 rounded-full bg-background-heavy" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-2 bg-background-heavy w-[100px]" />
        <Skeleton className="h-2 bg-background-heavy w-[180px]" />
      </div>
    </div>
  );
}
