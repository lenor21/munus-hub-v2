import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="abosolute w-full h-full top-0 left-0 grid place-items-center">
      <Spinner className="size-8" />
    </div>
  );
}
