import { getProject } from "@/actions/projects";
import { getUsers } from "@/data/user";

import { Badge } from "@/components/ui/badge";
import { UpdateProject } from "@/app/(protected)/_components/projects/update-project";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/app/(protected)/_components/projects/overview";
import { TeamMembers } from "../../_components/projects/team-members";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const [project, users] = await Promise.all([getProject(id), getUsers()]);

  if (!project || "error" in project) {
    return <div>Project not found</div>;
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    planning: { label: "Planning", color: "bg-blue-500" },
    "in-progress": { label: "In progress", color: "bg-yellow-500" },
    active: { label: "Active", color: "bg-green-600" },
    completed: { label: "Completed", color: "bg-gray-500" },
  };

  const currentStatus = statusConfig[
    project.status as keyof typeof statusConfig
  ] || {
    label: project.status,
    color: "bg-slate-500",
  };

  let durationInDays = 0;

  if (project.startDate && project.endDate) {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);

    // Difference in milliseconds
    const diffInMs = end.getTime() - start.getTime();

    // Convert ms to days: ms / (1000ms * 60s * 60m * 24h)
    durationInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }

  return (
    <div>
      <div className="flex justify-end mb-10">
        <UpdateProject
          users={users ?? []}
          project={{
            id,
            title: project.title,
            description: project.description,
            progress: project.progress ?? 0,
            startDate: project.startDate ?? new Date(),
            endDate: project.endDate ?? new Date(),
            budget: project.budget ?? 0,
            status: project.status ?? "",
            priority: project.priority ?? "",
            department: project.department ?? "",
            teamMembers: project.teamMembers,
          }}
        />
      </div>

      <div className="flex gap-y-20 justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {project.title}
        </h1>

        {project.status && (
          <Badge className={`py-1 ${currentStatus.color} h-fit`}>
            {currentStatus.label}
          </Badge>
        )}
      </div>

      <p className="w-[50%] text-gray-600 max-w-3xl">{project.description}</p>

      <div className="grid grid-cols-4 gap-3 mt-10">
        <Card className="gap-1">
          <CardHeader className="text-sm font-medium">Timeline</CardHeader>
          <CardContent>
            <p className="text-lg font-bold mt-1">
              {durationInDays} days to work
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.startDate && (
                <div className="flex items-center gap-1">
                  <span>
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}

              {project.startDate && project.endDate && <span>→</span>}

              {project.endDate && (
                <div className="flex items-center gap-1">
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader className="text-sm font-medium">Team Size</CardHeader>
          <CardContent>
            <p className="text-lg font-bold mt-1">
              {project.teamMembers.length}{" "}
              {project.teamMembers.length <= 1 ? "member" : "members"}
            </p>
            <p className="text-xs text-muted-foreground">N/A</p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader className="text-sm font-medium">Progress</CardHeader>
          <CardContent>
            <p className="text-lg font-bold mt-1">{project.progress}%</p>
            <Progress value={project.progress} className="h-2 mt-1" />
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader className="text-sm font-medium">Budget</CardHeader>
          <CardContent>
            <p className="text-lg font-bold mt-1">${project.budget}</p>
            <p className="text-xs text-muted-foreground">Spent: N/A</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 mb-10">
        <Tabs defaultValue="overview" className="w-full gap-5">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview
              projectId={project.id}
              overview={project.projectOverviews || []}
            />
          </TabsContent>
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  People working on this project
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <TeamMembers
                  projectId={project.id}
                  teamMembers={project.teamMembers || []}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
