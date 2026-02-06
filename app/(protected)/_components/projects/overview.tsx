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
import { SquarePen, Check } from "lucide-react";
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

export function Overview({ projectId }: { projectId: string }) {
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
      <CardContent className="text-muted-foreground text-sm">
        You have 12 active projects and 3 pending tasks.
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
