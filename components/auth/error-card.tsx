import { TriangleAlert } from "lucide-react";
import { CardWrapper } from "./card-wrapper";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="grid place-items-center">
        <TriangleAlert className="text-red-500 h-auto w-[50px]" />
      </div>
    </CardWrapper>
  );
}
