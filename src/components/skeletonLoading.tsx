import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return (
    <>
      <div className="flex flex-col">
        <Skeleton className="w-[176px] h-[274px] mb-3" />
        <Skeleton className="w-[120px] h-[15px] rounded-full mb-2" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[176px] h-[274px] mb-3" />
        <Skeleton className="w-[120px] h-[15px] rounded-full mb-2" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[176px] h-[274px] mb-3" />
        <Skeleton className="w-[120px] h-[15px] rounded-full mb-2" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[176px] h-[274px] mb-3" />
        <Skeleton className="w-[120px] h-[15px] rounded-full mb-2" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[176px] h-[274px] mb-3" />
        <Skeleton className="w-[120px] h-[15px] rounded-full mb-2" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
    </>
  );
}
