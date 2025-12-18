export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: string;
  priority: string;
  department: string;
}
