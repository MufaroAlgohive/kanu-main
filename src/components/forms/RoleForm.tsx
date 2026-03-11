import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2 } from "lucide-react";
import type { JobRole } from "@/context/JobProfilingContext";

type RoleFormData = Omit<JobRole, "id">;

type Props = {
  initialRole?: JobRole;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
};

const DEPARTMENTS = ["Technology", "Human Resources", "Product", "Finance", "Operations", "Sales", "Marketing"];
const GRADES = ["Grade A", "Grade B", "Grade C", "Grade D", "Grade E", "Grade F"];

export function RoleForm({ initialRole, onSubmit, onCancel }: Props) {
  const [jobTitle, setJobTitle] = useState(initialRole?.jobTitle ?? "");
  const [department, setDepartment] = useState(initialRole?.department ?? "Technology");
  const [jobGrade, setJobGrade] = useState(initialRole?.jobGrade ?? "Grade A");
  const [experience, setExperience] = useState(initialRole?.experience ?? "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialRole?.responsibilities ?? [""]
  );

  const updateResponsibility = (index: number, value: string) => {
    setResponsibilities((prev) => prev.map((r, i) => (i === index ? value : r)));
  };

  const addResponsibility = () => setResponsibilities((prev) => [...prev, ""]);

  const removeResponsibility = (index: number) => {
    setResponsibilities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      jobTitle,
      department,
      jobGrade,
      experience,
      responsibilities: responsibilities.filter((r) => r.trim()),
    });
  };

  const labelStyle = "block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5";
  const selectStyle = "w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-teal/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelStyle}>Job Title *</label>
          <Input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </div>

        <div>
          <label className={labelStyle}>Department *</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={selectStyle}
            required
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyle}>Job Grade *</label>
          <select
            value={jobGrade}
            onChange={(e) => setJobGrade(e.target.value)}
            className={selectStyle}
            required
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelStyle}>Experience Required *</label>
          <Input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 3–5 years in a relevant field"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Responsibilities</label>
        <div className="space-y-2">
          {responsibilities.map((resp, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={resp}
                onChange={(e) => updateResponsibility(index, e.target.value)}
                placeholder={`Responsibility ${index + 1}`}
                className="flex-1"
              />
              {responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeResponsibility(index)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-muted"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addResponsibility}
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-teal hover:text-teal/80 font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Responsibility
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!jobTitle.trim() || !experience.trim()}
          className="bg-teal hover:bg-teal/90 text-white"
        >
          {initialRole ? "Save Changes" : "Create Role"}
        </Button>
      </div>
    </form>
  );
}
