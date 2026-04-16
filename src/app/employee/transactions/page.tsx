import EmployeePortal from "@/components/employee-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function EmployeeTransactionsPage() {
  return (
    <EmployeePortal
      activePage="transactions"
      title="Transaction management"
      description="This route is ready for transaction history review and transaction status updates."
    >
      <SectionPlaceholder
        eyebrow="Employee transactions"
        title="Transactions page"
        description="This placeholder confirms sidebar routing is working for the employee transactions section."
      />
    </EmployeePortal>
  );
}
