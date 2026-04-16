import EmployeePortal from "@/components/employee-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function EmployeeAccountsPage() {
  return (
    <EmployeePortal
      activePage="accounts"
      title="Account controls"
      description="This route is ready for freezing and unfreezing customer accounts and other account actions."
    >
      <SectionPlaceholder
        eyebrow="Employee accounts"
        title="Accounts page"
        description="This placeholder confirms sidebar routing is working for the employee accounts section."
      />
    </EmployeePortal>
  );
}
