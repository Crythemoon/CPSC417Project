import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerPayeesPage() {
  return (
    <CustomerPortal
      activePage="payees"
      title="Customer payees"
      description="This route is ready for saved payees, bill pay setup, and payee management."
    >
      <SectionPlaceholder
        eyebrow="Customer payees"
        title="Payees page"
        description="This placeholder confirms sidebar routing is working for the customer payees section."
      />
    </CustomerPortal>
  );
}
