import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobProfiling } from "@/context/JobProfilingContext";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, ChevronRight, RotateCcw } from "lucide-react";

export default function AdminJobRoles() {
  const navigate = useNavigate();
  const { roles, deleteRole, resetToSeedData } = useJobProfiling();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      deleteRole(id);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all roles to the default data? This will overwrite any changes you've made.")) {
      resetToSeedData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Role Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create, edit, and manage company roles
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/job-roles/new")}
            className="bg-teal hover:bg-teal/90 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            New Role
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
            title="Reset to default roles"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {roles.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground mb-4">No roles found</p>
            <Button
              onClick={() => navigate("/job-roles/new")}
              className="bg-teal hover:bg-teal/90 text-white"
            >
              Create First Role
            </Button>
          </div>
        ) : (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-teal/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{role.jobTitle}</h3>
                  <div className="flex flex-wrap gap-4 mt-1.5 text-sm text-muted-foreground">
                    <span>
                      <span className="font-medium text-foreground">Department:</span> {role.department}
                    </span>
                    <span>
                      <span className="font-medium text-foreground">Grade:</span> {role.jobGrade}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === role.id ? null : role.id)}
                  className="p-2 hover:bg-muted rounded-md transition-colors ml-2"
                >
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      expandedId === role.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {expandedId === role.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">Experience Required</p>
                    <p className="text-sm text-muted-foreground">{role.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Responsibilities</p>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-teal mt-0.5 shrink-0">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => navigate(`/job-roles/edit/${role.id}`)}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(role.id)}
                      size="sm"
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive hover:border-destructive/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
