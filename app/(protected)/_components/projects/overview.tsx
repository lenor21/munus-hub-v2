"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquarePen, Check, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { createOverview } from "@/actions/projects";
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
import { OverviewRow } from "./overview-row";

type OverviewItem = {
  id: string;
  feature: string;
};

type OverviewProps = {
  projectId: string;
  overview: OverviewItem[];
};

export function Overview({ projectId, overview }: OverviewProps) {
  const [canEdit, setCanEdit] = useState(false);
  const [feature, setFeature] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    setCanEdit((prev) => !prev);
  };

  const handleAdd = () => {
    startTransition(async () => {
      await createOverview(projectId, feature).then((data) => {
        if (data.success) {
          toast.success(data.success);
          setFeature("");
        } else if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="font-semibold text-xl">
            Core Platform Features
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Key capabilities and system functions organized by category
          </CardDescription>
        </div>

        {!canEdit ? (
          <Button variant="outline" onClick={handleEdit}>
            <SquarePen />
            Edit
          </Button>
        ) : (
          <Button variant="outline" onClick={handleEdit}>
            <Check />
            Done
          </Button>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm flex flex-col gap-y-2">
        {!canEdit
          ? overview?.map((data) => {
              return (
                <div key={data.id} className="px-2 py-2 rounded-sm">
                  <div className="flex items-start gap-x-2">
                    <CircleCheckBig className="w-5 color-[#f00] text-[#e7000b] shrink-0" />
                    <p className="text-[#171717] leading-relaxed">
                      {data.feature}
                    </p>
                  </div>
                </div>
              );
            })
          : overview?.map((data) => {
              return (
                <OverviewRow
                  key={data.id}
                  feature={data.feature}
                  id={data.id}
                />
              );
            })}
      </CardContent>

      {canEdit && (
        <CardFooter>
          <FieldGroup className="">
            <Field>
              <FieldLabel htmlFor="block-end-textarea">
                Add New Feature
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="block-end-textarea"
                  placeholder="Write a feature..."
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  disabled={isPending}
                  required
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    variant="default"
                    size="sm"
                    className="ml-auto"
                    onClick={handleAdd}
                    disabled={isPending || feature === ""}
                  >
                    {isPending ? "Adding..." : "Add"}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      )}
    </Card>
  );
}
