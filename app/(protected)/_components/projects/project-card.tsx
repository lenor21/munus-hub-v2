"use client";

import { SquarePen, Trash2, UsersRound, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UpdateProject } from "./update-project";
import { UpdateProjectSchema } from "@/schemas";
import { ProjectProps } from "@/types/project";
import { useTransition } from "react";
import { deleteProject } from "@/actions/projects/delete";
import { toast } from "sonner";

export function ProjectCard({
  id,
  title,
  description,
  progress,
  startDate,
  endDate,
  budget,
  status,
  priority,
  department,
}: ProjectProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      toast.warning("Continue to delete?", {
        action: {
          label: "Delete",
          onClick: () => {
            deleteProject(id).then((data) => {
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
    <Card className="w-full grid">
      <CardHeader>
        <div className="flex gap-x-2 justify-between">
          <div>
            <p className="font-semibold text-lg mb-2 line-clamp-2 break-all">
              {title}
            </p>
            <p className="text-muted-foreground text-sm line-clamp-2 break-all">
              {description}
            </p>
          </div>
          <div className="flex gap-x-1">
            <UpdateProject
              project={{
                id,
                title,
                description,
                progress,
                startDate,
                endDate,
                budget,
                status,
                priority,
                department,
              }}
            />
            <Button
              variant="outline"
              className="text-[#e7000b]"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div>
          <Badge className="py-1 bg-[#f54a00]">In progress</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <UsersRound className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Team 14</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {startDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(startDate).toLocaleDateString()}</span>
              </div>
            )}

            {startDate && endDate && <span>→</span>}

            {endDate && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(endDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="border-t border-border w-full">
          <p className="w-full text-sm font-medium text-end pt-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }).format(budget)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
