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
    if (
      confirm(
        "Reset all roles and employees to seed data? This will overwrite any changes you've made."
      )
    ) {
      resetToSeedData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Role Management</h1>
          <p className="text-muted-foreground mt-2">
            Create, edit, and manage company roles (data persists locally)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/admin/job-roles/new")}
            className="bg-teal hover:bg-teal/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            New Role
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
            title="Reset to example seed data"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Roles List */}
      <div className="space-y-3">
        {roles.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">No roles found</p>
            <Button
              onClick={() => navigate("/admin/job-roles/new")}
              className="mt-4 bg-teal hover:bg-teal/90"
            >
              Create First Role
            </Button>
          </div>
        ) : (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-card rounded-lg border border-border p-4 hover:border-teal/50 transition-colors"
            >
              {/* Role header row */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {role.jobTitle}
                  </h3>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium">Department:</span> {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium">Grade:</span> {role.jobGrade}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setExpandedId(expandedId === role.id ? null : role.id)
                  }
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedId === role.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Expanded details */}
              {expandedId === role.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Experience Required
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {role.experience}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Responsibilities
                    </p>
                    <ul className="space-y-1">
                      {role.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-teal mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3">
                    <Button
                      onClick={() => navigate(`/admin/job-roles/edit/${role.id}`)}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(role.id)}
                      size="sm"
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
