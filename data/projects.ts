export type Project = {
  title: string;
  summary: string;
  tech: string[];
  impact: string;
  link: string;
};

export const projects: Project[] = [
  {
    title: "Learning Management System",
    summary: "Full-stack LMS with real-time classrooms, adaptive assessments, and analytics dashboards.",
    tech: ["React","Express.js", "Node.js", "MongoDB"],
    impact: "Scaled to 5k+ active learners across multiple cohorts.",
    link: "#",
  },
  {
    title: "Realtime Collaboration Suite",
    summary: "Socket-enabled document collaboration with optimistic UI and offline sync.",
    tech: ["React", "Socket.IO", "Redis"],
    impact: "Reduced editing conflicts by 42% for remote teams.",
    link: "#",
  },
];
