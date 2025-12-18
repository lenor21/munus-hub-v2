"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SquarePen, ChevronDownIcon } from "lucide-react";
import { useTransition, useState, useEffect } from "react";
import { CreateProjectSchema, UpdateProjectSchema } from "@/schemas";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateProject } from "@/actions/projects/update";
import { ProjectProps } from "@/types/project";

export function UpdateProject({ project }: { project: ProjectProps }) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setDialogIsOpen] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof UpdateProjectSchema>>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      title: project.title ?? "",
      description: project.description ?? "",
      budget: project.budget ?? "",
      progress: project.progress ?? "",
      startDate: project.startDate ?? "",
      endDate: project.endDate ?? "",
      status: project.status ?? "",
      priority: project.priority ?? "",
      department: project.department ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof UpdateProjectSchema>) {
    startTransition(async () => {
      updateProject(values, project.id).then((data) => {
        if (data.success) {
          form.reset();

          setStartDate(undefined);
          setEndDate(undefined);

          toast.success(data.success);
          setDialogIsOpen(false);
          handleDialogChange(false);
        }
      });
    });
  }

  const handleDialogChange = (open: boolean) => {
    setDialogIsOpen(open);

    if (!open) {
      form.reset({
        title: project.title,
        description: project.description,
        budget: project.budget,
        progress: project.progress,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        priority: project.priority,
        department: project.department,
      });
      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  };

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        budget: project.budget,
        progress: project.progress,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        priority: project.priority,
        department: project.department,
      });

      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  }, [project, form]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogIsOpen(true)}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
              <DialogDescription>
                Update the project details below.
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

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger className="w-full col-span-2">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Department</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger className="w-full col-span-2">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="customer-success">
                            Customer Success
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Budget</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="shadcn"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        const rawValue = e.target.value;

                        if (rawValue === "") {
                          field.onChange(undefined);
                          return;
                        }

                        let numValue = Number(rawValue);
                        if (numValue < 1) numValue = 1;

                        field.onChange(numValue);
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Progress</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="shadcn"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        const rawValue = e.target.value;

                        if (rawValue === "") {
                          field.onChange(undefined);
                          return;
                        }

                        let numValue = Number(rawValue);
                        if (numValue > 100) numValue = 100;
                        if (numValue < 1) numValue = 1;

                        field.onChange(numValue);
                      }}
                      value={field.value ?? ""}
                      min={1}
                      max={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">Start date</FormLabel>
                  <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {startDate
                          ? startDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          setStartDate(date);
                          setOpenStartDate(false);
                          field.onChange(date);
                        }}
                        captionLayout="dropdown"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="grid grid-rows-1 grid-cols-4">
                  <FormLabel className="col-span-1">End date</FormLabel>
                  <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {endDate ? endDate.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          setEndDate(date);
                          setOpenEndDate(false);
                          field.onChange(date);
                        }}
                        captionLayout="dropdown"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
