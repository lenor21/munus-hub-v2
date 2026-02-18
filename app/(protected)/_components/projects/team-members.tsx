"use client";

import { MemberCard } from "@/app/(protected)/_components/projects/member-card";

type User = {
  id: string;
  name: string | null;
  image?: string | null;
  email: string;
};

export type TeamMemberData = {
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
  return (
    <div className="grid grid-cols-3 gap-4">
      {teamMembers.map((data) => (
        <MemberCard key={data.id} data={data} projectId={projectId} />
      ))}
    </div>
  );
}
