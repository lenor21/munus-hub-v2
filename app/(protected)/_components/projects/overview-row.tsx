"use client";

import { Button } from "@/components/ui/button";
import { SquarePen, Check, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CircleCheckBig } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateOverview } from "@/actions/projects";
import { deleteOverview } from "@/actions/projects/delete";

export function OverviewRow({ feature, id }: { feature: string; id: string }) {
  const [editText, setEditText] = useState(feature);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateOverview(id, editText);

      if (result.success) {
        toast.success(result.success);
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      toast.warning("Continue to delete?", {
        action: {
          label: "Delete",
          onClick: () => {
            deleteOverview(id).then((data) => {
              if (data.success) {
                toast.success(data.success);
              } else if (data.error) {
                toast.error(data.error);
              }
            });
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            toast.dismiss();
          },
        },
        duration: 10000,
        id: "delete-confirm",
      });
    });
  };

  return (
    <div className="border px-3 py-4 rounded-sm grid grid-cols-[1fr_auto] gap-x-4 bg-white shadow-sm">
      <div className="flex items-start gap-x-2">
        <CircleCheckBig className="w-5 text-[#e7000b] shrink-0" />
        <p className="text-[#171717] leading-relaxed">{feature}</p>
      </div>
      <div className="flex items-center gap-x-1">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-[#171717]"
            >
              <SquarePen className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>Edit overview</DialogTitle>
                <DialogDescription>
                  Make changes to your feature here.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
