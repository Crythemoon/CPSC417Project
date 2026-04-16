import EmployeePortal from "@/components/employee-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function EmployeeManagerPage() {
  return (
    <EmployeePortal
      activePage="manager"
      title="Manager tools"
      description="This route is ready for task assignment, department details, and loan override actions."
    >
      <SectionPlaceholder
        eyebrow="Manager tools"
        title="Manager page"
        description="This placeholder confirms sidebar routing is working for the manager tools section."
      />
    </EmployeePortal>
  );
}
