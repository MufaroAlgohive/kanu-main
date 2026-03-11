import { useNavigate, useParams } from "react-router-dom";
import { useJobProfiling } from "@/context/JobProfilingContext";
import { RoleForm } from "@/components/forms/RoleForm";
import { ArrowLeft } from "lucide-react";

export default function EditJobRole() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRoleById, addRole, updateRole } = useJobProfiling();

  const role = id ? getRoleById(id) : undefined;

  if (id && id !== "new" && !role) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Role not found</p>
      </div>
    );
  }

  const isNew = !id || id === "new";

  const handleSubmit = (roleData: Parameters<typeof addRole>[0]) => {
    if (isNew) {
      addRole(roleData);
    } else {
      updateRole(id!, roleData);
    }
    navigate("/job-roles");
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate("/job-roles")}
          className="inline-flex items-center gap-2 text-teal hover:text-teal/80 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roles
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          {isNew ? "Create New Role" : "Edit Role"}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {isNew
            ? "Fill in the details to create a new company role"
            : "Update the role details below"}
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <RoleForm
          initialRole={isNew ? undefined : role}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/job-roles")}
        />
      </div>
    </div>
  );
}
