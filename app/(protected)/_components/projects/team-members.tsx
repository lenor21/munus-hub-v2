"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  image?: string | null;
  email: string;
};

type TeamMemberData = {
  id: string;
  role: string;
  joinedAt: Date | string;
  user: User;
};

type TeamMembersProps = {
  projectId: string;
  teamMembers: TeamMemberData[];
};

export function TeamMembers({ projectId, teamMembers }: TeamMembersProps) {
  console.log(teamMembers);

  return (
    <div className="grid grid-cols-3 gap-4">
      {teamMembers.map((data) => {
        return (
          <div
            key={data.id}
            className="p-4 border border-border rounded-lg col-span-1 w-full shadow-lg bg-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={data.user.image || "/placeholder.svg"} />
                <AvatarFallback>rd</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-[#171717]">{data.user.name}</h4>
                <p className="text-sm text-muted-foreground">{data.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#171717] hover:bg-[#e7000b] hover:text-white ease-linear"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-[#171717] hover:bg-[#e7000b] hover:text-white ease-linear"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-[#171717] hover:bg-[#e7000b] hover:text-white ease-linear"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
