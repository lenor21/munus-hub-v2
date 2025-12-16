"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useTransition, useState } from "react";
import { CreateProjectSchema } from "@/schemas";
import { createProject } from "@/actions/projects";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateProject() {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setDialogIsOpen] = useState(false);

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      department: "",
      startDate: "",
      endDate: "",
      budget: "",
    },
  });

  function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
    startTransition(async () => {
      createProject(values).then((data) => {
        if (data.success) {
          form.reset();
          toast.success(data.success);
          setDialogIsOpen(false);
        }
      });
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogIsOpen(true)}>
          <Plus />
          Create project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new project for your team.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger className="w-full col-span-2">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="in-progress">
                            In progress
                          </SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
