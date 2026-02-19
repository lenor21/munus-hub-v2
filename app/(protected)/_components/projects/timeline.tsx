"use client";

import {
  MoveRight,
  CheckCircle,
  Clock,
  AlertCircle,
  SquarePen,
  Plus,
  ChevronDownIcon,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type Project = {
  startDate: Date;
  endDate: Date;
};

type TimelineProps = {
  projectId: string;
  projectData: Project;
};

export function Timeline({ projectId, projectData }: TimelineProps) {
  console.log(projectData);

  function getStatusColor(status: string) {
    switch (status) {
      case "completed":
        return "text-[#009689]";
      case "in-progress":
        return "text-chart-3";
      case "pending":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-[#009689]" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-chart-3" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Milestones and important dates</CardDescription>
        </div>

        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <SquarePen />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Edit Project Timeline</DialogTitle>
                  <DialogDescription>
                    Update milestones, dates, and status information.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Project Dates</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <Label>Project Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty=""
                            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                          >
                            <span>Pick a date</span>

                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" />
                        </PopoverContent>
                      </Popover>
                    </Field>
                    <Field>
                      <Label>Project End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty=""
                            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                          >
                            <span>Pick a date</span>

                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  </div>
                </div>

                <Separator />

                {/* Current Milestones */}
                <div className="space-y-4">
                  <h4 className="font-medium">Current Milestones</h4>

                  <div className="">
                    <div className="p-3 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between gap-x-1">
                        <Input type="text" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label className="text-xs">End Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between gap-x-1">
                        <Input type="text" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label className="text-xs">End Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between gap-x-1">
                        <Input type="text" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label className="text-xs">End Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Add New Milestone */}
                <div className="space-y-4 bg-muted/50 p-4 rounded">
                  <h4 className="font-medium">Add New Milestone</h4>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Enter milestone name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty=""
                            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                          >
                            <span>Pick a date</span>

                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty=""
                            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                          >
                            <span>Pick a date</span>

                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>

                {/* <FieldGroup>
                  <Field>
                    <Label>Project Start Date</Label>
                    <Input type="date" />
                  </Field>
                  <Field>
                    <Label>Project End Date</Label>
                    <Input type="date" />
                  </Field>
                </FieldGroup> */}
                {/* <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Done</Button>
                </DialogFooter> */}
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        <div className="text-lg text-[#171717] font-semibold flex items-center gap-x-6 bg-[#fafafa] p-4 rounded">
          {new Date(projectData.startDate).toLocaleDateString()} <MoveRight />
          {new Date(projectData.endDate).toLocaleDateString()}
        </div>

        <div className="mt-6">
          <h3 className="text-[16px] font-semibold text-[#171717]">
            Project Milestones
          </h3>

          <div className="mt-4 flex flex-col gap-y-4">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-border rounded-lg bg-card shadow">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {getStatusIcon("completed")}
                <div className="min-w-0 flex-1">
                  <h5 className={`font-medium ${getStatusColor("completed")}`}>
                    Name
                  </h5>
                  <p className="text-sm text-muted-foreground capitalize">
                    Status:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-medium">
                    START
                  </div>
                  <div className="font-medium">date</div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-px bg-border"></div>
                  <div className="w-2 h-2 rounded-full mx-1 bg-[#e7000b]"></div>
                  <div className="w-8 h-px bg-border"></div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-medium">
                    END
                  </div>
                  <div className="font-medium">date</div>
                </div>

                {/* <div className="text-center">
                  <div className="text-xs text-muted-foreground font-medium">
                    DUE
                  </div>
                  <div className="font-medium text-orange-600">date</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
