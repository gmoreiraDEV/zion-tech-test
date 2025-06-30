import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription } from "@/components/ui/card";

export function FeedCardSkeleton() {
  return (
    <Card className="gap-2 animate-pulse">
      <div className="flex justify-start items-center gap-4 p-6">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <CardDescription className="mt-3 flex flex-col items-center justify-center p-0">
        <Skeleton className="h-64 w-full rounded-md" />
        <div className="flex justify-start items-center w-full p-6 gap-8">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-[90%] mb-3" />
        <Skeleton className="h-4 w-[80%]" />
      </CardDescription>

      <div className="mt-2 pt-0 pb-4 px-6 flex gap-2 items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </Card>
  );
}
