import { createContext, useContext, useState, type ReactNode } from "react";

export type Experience = {
  company: string;
  role: string;
  period: string;
  duration: string;
};

export type Compensation = {
  basicSalary: string;
  total_ctc: string;
  grade: string;
  band: string;
};

export type Employee = {
  id: number;
  name: string;
  initials: string;
  title: string;
  department: string;
  grade: string;
  location: string;
  status: string;
  employeeId: string;
  reportingTo: string;
  startDate: string;
  qualifications: string;
  skills: string[];
  responsibilities: string[];
  experience: Experience[];
  compensation: Compensation;
  avatar_color?: string;
  salaryAmount: number;
  tenure: string;
};

const initEmployees: Employee[] = [
  {
    id: 1,
    name: "Mpumelelo Maswanganye",
    initials: "MM",
    title: "Senior Software Engineer",
    department: "Technology",
    grade: "G7",
    location: "Johannesburg",
    status: "Active",
    employeeId: "EMP-00421",
    reportingTo: "Kurt Von Schaeffer",
    startDate: "March 2017",
    qualifications: "BSc Computer Science, UCT",
    skills: ["React", "Node.js", "PostgreSQL", "System Design", "AWS"],
    responsibilities: [
      "Lead architecture design for core platform services",
      "Mentor junior and mid-level engineers",
      "Drive technical roadmap for compensation engine",
      "Collaborate with product on feature delivery",
      "Code review and quality assurance oversight",
    ],
    experience: [
      { company: "CompIQ", role: "Senior Software Engineer", period: "Mar 2017 – Present", duration: "8 yrs" },
      { company: "Takealot Group", role: "Software Engineer", period: "Jan 2015 – Feb 2017", duration: "2 yrs" },
      { company: "Isoflow", role: "Junior Developer", period: "Jun 2013 – Dec 2014", duration: "1.5 yrs" },
    ],
    compensation: { basicSalary: "R 38 500/mo", total_ctc: "R 500 000 p/a", grade: "G7 – Senior", band: "Professional" },
    salaryAmount: 38500,
    tenure: "8y 0m",
  },
  {
    id: 2,
    name: "Kurt Von Schaeffer",
    initials: "KV",
    title: "Head of Engineering",
    department: "Technology",
    grade: "G9",
    location: "Johannesburg",
    status: "Active",
    employeeId: "EMP-00089",
    reportingTo: "CEO",
    startDate: "January 2014",
    qualifications: "MEng Software Engineering, Wits",
    skills: ["Engineering Leadership", "Strategy", "Agile", "Cloud Architecture", "Stakeholder Management"],
    responsibilities: [
      "Oversee all engineering squads and delivery",
      "Define technology strategy and standards",
      "Manage engineering budget and headcount",
      "Partner with C-suite on product direction",
      "Drive hiring and talent development",
    ],
    experience: [
      { company: "CompIQ", role: "Head of Engineering", period: "Jan 2014 – Present", duration: "11 yrs" },
      { company: "Derivco", role: "Engineering Manager", period: "Mar 2011 – Dec 2013", duration: "3 yrs" },
      { company: "BCX", role: "Senior Engineer", period: "Jul 2007 – Feb 2011", duration: "3.5 yrs" },
    ],
    compensation: { basicSalary: "R 72 000/mo", total_ctc: "R 950 000 p/a", grade: "G9 – Executive", band: "Leadership" },
    salaryAmount: 72000,
    tenure: "11y 0m",
  },
  {
    id: 3,
    name: "Tsie Masilo",
    initials: "TS",
    title: "HR Business Partner",
    department: "Human Resources",
    grade: "G6",
    location: "Cape Town",
    status: "Active",
    employeeId: "EMP-00312",
    reportingTo: "Mihle Matimba",
    startDate: "August 2019",
    qualifications: "BCom Industrial Psychology, Stellenbosch",
    skills: ["Talent Management", "HRIS", "Labour Law", "OD", "Compensation"],
    responsibilities: [
      "Partner with business units on people strategy",
      "Manage performance review cycles",
      "Lead talent acquisition for mid-senior roles",
      "Drive culture and engagement initiatives",
      "Compensation benchmarking and review",
    ],
    experience: [
      { company: "CompIQ", role: "HR Business Partner", period: "Aug 2019 – Present", duration: "5 yrs" },
      { company: "Old Mutual", role: "HR Generalist", period: "Feb 2017 – Jul 2019", duration: "2.5 yrs" },
      { company: "Woolworths SA", role: "HR Coordinator", period: "Jan 2016 – Jan 2017", duration: "1 yr" },
    ],
    compensation: { basicSalary: "R 29 000/mo", total_ctc: "R 380 000 p/a", grade: "G6 – Specialist", band: "Professional" },
    salaryAmount: 29000,
    tenure: "5y 0m",
  },
  {
    id: 4,
    name: "Mihle Matimba",
    initials: "MM",
    title: "Chief People Officer",
    department: "Human Resources",
    grade: "G10",
    location: "Johannesburg",
    status: "Active",
    employeeId: "EMP-00012",
    reportingTo: "CEO",
    startDate: "June 2010",
    qualifications: "MBA, Gordon Institute of Business Science",
    skills: ["Executive Leadership", "OD", "DEI", "Total Rewards", "Board Advisory"],
    responsibilities: [
      "Lead organisational people strategy",
      "Drive DEI and culture transformation",
      "Oversee total rewards and compensation policy",
      "Board-level people reporting",
      "Executive leadership coaching",
    ],
    experience: [
      { company: "CompIQ", role: "Chief People Officer", period: "Jun 2010 – Present", duration: "15 yrs" },
      { company: "Standard Bank", role: "HR Director", period: "Apr 2005 – May 2010", duration: "5 yrs" },
      { company: "Deloitte SA", role: "Senior HR Consultant", period: "Jan 2001 – Mar 2005", duration: "4 yrs" },
    ],
    compensation: { basicSalary: "R 95 000/mo", total_ctc: "R 1 250 000 p/a", grade: "G10 – C-Suite", band: "Executive" },
    salaryAmount: 95000,
    tenure: "15y 0m",
  },
  {
    id: 5,
    name: "Lonwabo Damane",
    initials: "LD",
    title: "Compensation Analyst",
    department: "Human Resources",
    grade: "G4",
    location: "Pretoria",
    status: "Active",
    employeeId: "EMP-00567",
    reportingTo: "Tsie Masilo",
    startDate: "February 2022",
    qualifications: "BCom Statistics, University of Pretoria",
    skills: ["Excel", "Compensation Benchmarking", "Data Analysis", "Remuneration", "Reporting"],
    responsibilities: [
      "Conduct salary benchmarking and market analysis",
      "Maintain compensation structures and pay scales",
      "Support annual remuneration review cycles",
      "Prepare compensation reports and dashboards",
      "Administer job grading and evaluation",
    ],
    experience: [
      { company: "CompIQ", role: "Compensation Analyst", period: "Feb 2022 – Present", duration: "3 yrs" },
      { company: "PwC SA", role: "Reward Analyst Intern", period: "Jan 2021 – Jan 2022", duration: "1 yr" },
    ],
    compensation: { basicSalary: "R 18 500/mo", total_ctc: "R 240 000 p/a", grade: "G4 – Analyst", band: "Support" },
    salaryAmount: 18500,
    tenure: "3y 0m",
  },
  {
    id: 6,
    name: "Mihlali Damane",
    initials: "MD",
    title: "Product Manager",
    department: "Product",
    grade: "G7",
    location: "Johannesburg",
    status: "Active",
    employeeId: "EMP-00398",
    reportingTo: "CEO",
    startDate: "November 2018",
    qualifications: "BCom Information Systems, UKZN",
    skills: ["Product Strategy", "Agile/Scrum", "User Research", "Data Analytics", "Roadmapping"],
    responsibilities: [
      "Own product roadmap and prioritisation",
      "Translate business needs into product requirements",
      "Lead cross-functional squad delivery",
      "Define and track OKRs and product KPIs",
      "Manage stakeholder expectations and delivery",
    ],
    experience: [
      { company: "CompIQ", role: "Product Manager", period: "Nov 2018 – Present", duration: "6 yrs" },
      { company: "Yoco Technologies", role: "Associate PM", period: "Mar 2016 – Oct 2018", duration: "2.5 yrs" },
      { company: "FNB", role: "Business Analyst", period: "Jan 2014 – Feb 2016", duration: "2 yrs" },
    ],
    compensation: { basicSalary: "R 42 000/mo", total_ctc: "R 550 000 p/a", grade: "G7 – Senior", band: "Professional" },
    salaryAmount: 42000,
    tenure: "6y 0m",
  },
];

type EmployeeContextType = {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initEmployees);
  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployees must be used inside EmployeeProvider");
  return ctx;
}
