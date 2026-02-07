export type Project = {
  title: string;
  summary: string;
  tech: string[];
  impact: string;
  link: string;
  details: {
    title: string;
    content: string[];
  }[];
};

export const projects: Project[] = [
  {
    title: "ExamExpert Learning Platform",
    summary: "Built a comprehensive online examination platform serving educational institutions. Students can take timed mock exams, track performance analytics, and study with interactive flashcards.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Socket.IO"],
    impact: "Deployed to production with active user base. Handles complex question banks and real-time test sessions.",
    link: "#",
    details: [
      {
        title: "Project Overview",
        content: [
          "ExamExpert is a feature-rich, full-stack Learning Management System (LMS) specifically tailored for online examination and comprehensive learning.",
          "The platform enables educational institutions and individual educators to host courses, manage complex question banks, and provide students with interactive learning tools.",
          "It features a robust architecture designed for scalability, real-time engagement, and a premium user experience."
        ]
      },
      {
        title: "Key Features",
        content: [
          "**Hierarchical Content Structure**: Organizes learning into Courses → Subjects → Books → Chapters → Topics.",
          "**Advanced Question Bank**: Support for multiple question types with detailed insights and statistics.",
          "**Real-time Test Attempts**: Captures student responses, time taken per question, and overall progress.",
          "**Interactive Flashcards**: A dedicated system for quick revision and memorization.",
          "**Role-Based Access Control**: Different permissions for Students, Teachers, and Administrators."
        ]
      },
      {
        title: "Technical Stack",
        content: [
          "**Frontend**: React.js (Vite), Redux Toolkit, Framer Motion, CKEditor 5",
          "**Backend**: Node.js, Express.js, Socket.io",
          "**Database**: MongoDB with Mongoose ODM",
          "**Security**: JWT, Helium, Mongo-sanitize, Rate-limiting"
        ]
      }
    ]
  },
  {
    title: "AceMrcem Medical Exam Prep",
    summary: "Developed a specialized platform for medical professionals preparing for MRCEM exams. Features hierarchical content organization, high-fidelity exam simulations, and detailed performance tracking.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Docker"],
    impact: "Engineered scalable architecture handling thousands of medical questions with rich media support and timed exam simulations.",
    link: "#",
    details: [
      {
        title: "Project Overview",
        content: [
          "AceMrcem is a premium, full-stack educational platform specifically engineered for medical professionals preparing for the MRCEM examinations.",
          "The platform bridges the gap between complex medical curricula and efficient learning through a sophisticated Content Management System (CMS), high-fidelity simulated examinations, and data-driven progress tracking."
        ]
      },
      {
        title: "Key Features",
        content: [
          "**High-Fidelity Testing Environment**: Timed exam simulations that mirror the actual MRCEM exam experience.",
          "**Dynamic Question Bank**: Thousands of questions with detailed explanations, hints, and dynamic option management.",
          "**Rich Media Integration**: Support for high-resolution medical imagery and rich-text clinical cases.",
          "**Performance Analytics**: Comprehensive results breakdown, historical tracking, and per-question time analysis.",
          "**Security & Monitoring**: Granular activity logs featuring IP-based geolocation."
        ]
      },
      {
        title: "Technical Stack",
        content: [
          "**Frontend**: React 19, TypeScript, Tailwind CSS 4, Framer Motion 11",
          "**Backend**: Node.js (Express), TypeScript, Socket.io",
          "**Infrastructure**: Docker, PM2, Advanced Activity Logging"
        ]
      }
    ]
  },
];
