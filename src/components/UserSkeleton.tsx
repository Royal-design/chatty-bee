import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-6 h-6 bg-gray-300 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-2 bg-gray-300 w-[100px]" />
        <Skeleton className="h-2 bg-gray-300 w-[180px]" />
      </div>
    </div>
  );
}
