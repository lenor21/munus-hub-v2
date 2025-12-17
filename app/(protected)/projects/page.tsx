import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "../_components/projects/project-card";
import { CreateProject } from "../_components/projects/create-project";
import { Search } from "lucide-react";
import { getProjects } from "@/actions/projects";

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  return (
    <div className="">
      <div className="flex justify-between items-center gap-x-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage and track all company projects</p>
        </div>
        <CreateProject />
      </div>

      <div className="grid mt-10 grid-rows-2 grid-cols-2 gap-2 md:grid-rows-1 md:grid-cols-4">
        <div className="relative col-span-2">
          <Search className="absolute top-[50%] left-2 translate-y-[-50%] h-5" />
          <Input
            type="text"
            placeholder="Search projects"
            className="bg-white pl-10"
          />
        </div>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="all-status">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a member" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">All member</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
        {projectsData && projectsData.length > 0 ? (
          projectsData?.map((data) => {
            return (
              <ProjectCard
                key={data.id}
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
