import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerRequestLoanPage() {
  return (
    <CustomerPortal
      activePage="loans"
      title="Request a loan"
      description="This route is ready for the customer loan request flow."
    >
      <SectionPlaceholder
        eyebrow="Customer loan request"
        title="Request loan page"
        description="This placeholder confirms dashboard actions can route to a dedicated customer loan request page."
      />
    </CustomerPortal>
  );
}
