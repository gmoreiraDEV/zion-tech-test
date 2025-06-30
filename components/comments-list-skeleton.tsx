import { Skeleton } from "@/components/ui/skeleton";

export function CommentsListSkeleton() {
  return (
    <div className="flex flex-col space-y-4 mt-4 p-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="bg-brand-background-400 rounded-2xl px-6 py-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
