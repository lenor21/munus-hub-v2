export interface ProjectMemberProps {
  id: string;
  role: string;
  joinedAt: Date;
  userId: string;
  projectId: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}
export interface ProjectProps {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: string;
  priority: string;
  department: string;
  teamMembers: ProjectMemberProps[];
}

export interface MemberProps {
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}
