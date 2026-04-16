import EmployeePortal from "@/components/employee-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function EmployeeLoansPage() {
  return (
    <EmployeePortal
      activePage="loans"
      title="Loan controls"
      description="This route is ready for staff loan reviews, status changes, and approval workflows."
    >
      <SectionPlaceholder
        eyebrow="Employee loans"
        title="Loans page"
        description="This placeholder confirms sidebar routing is working for the employee loans section."
      />
    </EmployeePortal>
  );
}
