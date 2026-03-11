import { createContext, useContext, useState, type ReactNode } from "react";

export type JobRole = {
  id: string;
  jobTitle: string;
  department: string;
  jobGrade: string;
  experience: string;
  responsibilities: string[];
};

const seedRoles: JobRole[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    department: "Technology",
    jobGrade: "Grade C",
    experience: "2–4 years of software development experience",
    responsibilities: [
      "Design, develop, and maintain scalable software solutions",
      "Participate in code reviews and enforce quality standards",
      "Collaborate with cross-functional teams on feature delivery",
      "Write unit and integration tests for all new features",
    ],
  },
  {
    id: "2",
    jobTitle: "Senior Software Engineer",
    department: "Technology",
    jobGrade: "Grade D",
    experience: "5–8 years of software development experience",
    responsibilities: [
      "Lead architecture design for core platform services",
      "Mentor junior and mid-level engineers",
      "Drive technical roadmap for assigned product areas",
      "Conduct code reviews and set engineering standards",
      "Collaborate with product and design on feature delivery",
    ],
  },
  {
    id: "3",
    jobTitle: "HR Business Partner",
    department: "Human Resources",
    jobGrade: "Grade C",
    experience: "3–5 years of HR generalist or HRBP experience",
    responsibilities: [
      "Partner with business units on people strategy and OD",
      "Manage performance review cycles end-to-end",
      "Lead talent acquisition for mid to senior-level roles",
      "Drive culture and employee engagement initiatives",
      "Support compensation benchmarking and annual reviews",
    ],
  },
  {
    id: "4",
    jobTitle: "Compensation Analyst",
    department: "Human Resources",
    jobGrade: "Grade B",
    experience: "1–3 years in rewards, HR analytics, or finance",
    responsibilities: [
      "Conduct salary benchmarking and external market analysis",
      "Maintain compensation structures and pay scale models",
      "Support the annual remuneration review cycle",
      "Prepare compensation dashboards and management reports",
      "Administer job grading and Hay/Peromnes evaluation",
    ],
  },
  {
    id: "5",
    jobTitle: "Product Manager",
    department: "Product",
    jobGrade: "Grade D",
    experience: "4–7 years in product management or strategy",
    responsibilities: [
      "Own product roadmap and quarterly prioritisation",
      "Translate business requirements into clear product specs",
      "Lead cross-functional squad delivery and remove blockers",
      "Define, track and report on OKRs and product KPIs",
      "Manage stakeholder communication and expectation setting",
    ],
  },
  {
    id: "6",
    jobTitle: "Finance Analyst",
    department: "Finance",
    jobGrade: "Grade B",
    experience: "1–3 years in financial analysis or accounting",
    responsibilities: [
      "Prepare monthly management accounts and variance analysis",
      "Support budgeting, forecasting and financial planning",
      "Conduct cost analysis and business case modelling",
      "Maintain financial models and reporting templates",
      "Liaise with auditors and ensure compliance with IFRS",
    ],
  },
];

type JobProfilingContextType = {
  roles: JobRole[];
  getRoleById: (id: string) => JobRole | undefined;
  addRole: (data: Omit<JobRole, "id">) => void;
  updateRole: (id: string, data: Omit<JobRole, "id">) => void;
  deleteRole: (id: string) => void;
  resetToSeedData: () => void;
};

const JobProfilingContext = createContext<JobProfilingContextType | null>(null);

export function JobProfilingProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<JobRole[]>(seedRoles);

  const getRoleById = (id: string) => roles.find((r) => r.id === id);

  const addRole = (data: Omit<JobRole, "id">) => {
    setRoles((prev) => [...prev, { ...data, id: Date.now().toString() }]);
  };

  const updateRole = (id: string, data: Omit<JobRole, "id">) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...data, id } : r)));
  };

  const deleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  const resetToSeedData = () => setRoles(seedRoles);

  return (
    <JobProfilingContext.Provider value={{ roles, getRoleById, addRole, updateRole, deleteRole, resetToSeedData }}>
      {children}
    </JobProfilingContext.Provider>
  );
}

export function useJobProfiling() {
  const ctx = useContext(JobProfilingContext);
  if (!ctx) throw new Error("useJobProfiling must be used inside JobProfilingProvider");
  return ctx;
}
