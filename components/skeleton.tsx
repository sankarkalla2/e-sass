import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonItems() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="w-full flex items-center justify-between pb-5">
        <div className="flex flex-col items-start space-y-1">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
      <Skeleton className="h-8 w-[40%] rounded-xl" />
      <Skeleton className="h-[400px] w-full rounded-xl" />

      <div>
        <div className="pt-5 space-y-5">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
