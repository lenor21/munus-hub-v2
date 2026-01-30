import { ProjectCard } from "../_components/projects/project-card";
import { CreateProject } from "../_components/projects/create-project";
import { getProjects } from "@/actions/projects";
import { getUsers } from "@/data/user";
import { ProjectFilters } from "../_components/projects/project-filters";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    memberId?: string;
  }>;
}) {
  const { q, status, memberId } = await searchParams;

  const projectsData = await getProjects({
    search: q,
    status: status === "all-status" ? undefined : status,
    memberId: memberId === "all-members" ? undefined : memberId,
  });

  const users = await getUsers();

  // This users is for filtering
  const normalizedUsers =
    users?.map((user) => ({
      ...user,
      name: user.name ?? undefined,
    })) || [];

  return (
    <div className="">
      <div className="flex justify-between items-center gap-x-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage and track all company projects</p>
        </div>
        <CreateProject users={users || []} />
      </div>

      <ProjectFilters users={normalizedUsers} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
        {projectsData && projectsData.length > 0 ? (
          projectsData?.map((data) => {
            return (
              <ProjectCard
                key={data.id}
                id={data.id}
                title={data.title}
                description={data.description || ""}
                progress={
                  typeof data.progress === "number"
                    ? data.progress
                    : parseInt(data.progress || "0", 10)
                }
                startDate={
                  data.startDate instanceof Date
                    ? data.startDate
                    : new Date(data.startDate || "")
                }
                endDate={
                  data.endDate instanceof Date
                    ? data.endDate
                    : new Date(data.endDate || "")
                }
                budget={data.budget || 0}
                status={data.status || ""}
                priority={data.priority || ""}
                department={data.department || ""}
                teamMembers={data.teamMembers || []}
                users={users || []}
              />
            );
          })
        ) : (
          <h1>No projects created</h1>
        )}
      </div>
    </div>
  );
}
