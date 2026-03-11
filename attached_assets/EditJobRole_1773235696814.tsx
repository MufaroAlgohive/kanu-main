import { useNavigate, useParams } from "react-router-dom";
import { useJobProfiling } from "@/context/JobProfilingContext";
import { RoleForm } from "@/components/forms/RoleForm";
import { ArrowLeft } from "lucide-react";

export default function EditJobRole() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRoleById, updateRole } = useJobProfiling();

  const role = id ? getRoleById(id) : undefined;

  if (id && !role) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Role not found</p>
      </div>
    );
  }

  const handleSubmit = (roleData: any) => {
    if (id) {
      updateRole(id, roleData);
    }
    navigate("/admin/job-roles");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/admin/job-roles")}
          className="inline-flex items-center gap-2 text-teal hover:text-teal/80 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roles
        </button>
        <h1 className="text-3xl font-bold text-foreground">
          {id ? "Edit Role" : "Create New Role"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {id
            ? "Update the role details below"
            : "Fill in the details to create a new company role"}
        </p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <RoleForm
          initialRole={role}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/job-roles")}
        />
      </div>
    </div>
  );
}
