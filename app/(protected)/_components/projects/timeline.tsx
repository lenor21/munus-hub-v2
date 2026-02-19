"use client";

import { MoveRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Milestones and important dates</CardDescription>
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
                <div className="min-w-0 flex-1">
                  <h5 className={`font-medium `}>Name</h5>
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
                  <div className="w-2 h-2 bg-primary rounded-full mx-1"></div>
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

            <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-border rounded-lg bg-card shadow">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <h5 className={`font-medium `}>Name</h5>
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
                  <div className="w-2 h-2 bg-primary rounded-full mx-1"></div>
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
