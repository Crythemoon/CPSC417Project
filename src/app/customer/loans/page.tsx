import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerLoansPage() {
  return (
    <CustomerPortal
      activePage="loans"
      title="Customer loans"
      description="This route is ready for loan requests, loan status, and repayment details."
    >
      <SectionPlaceholder
        eyebrow="Customer loans"
        title="Loans page"
        description="This placeholder confirms sidebar routing is working for the customer loans section."
      />
    </CustomerPortal>
  );
}
