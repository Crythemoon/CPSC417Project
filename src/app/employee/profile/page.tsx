import EmployeePortal from "@/components/employee-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function EmployeeProfilePage() {
  return (
    <EmployeePortal
      activePage="dashboard"
      title="Employee profile"
      description="This route is ready for employee information updates and profile management."
    >
      <SectionPlaceholder
        eyebrow="Employee profile"
        title="Profile page"
        description="This placeholder confirms dashboard actions can route to a dedicated employee profile page."
      />
    </EmployeePortal>
  );
}
