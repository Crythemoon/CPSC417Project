import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerAccountsPage() {
  return (
    <CustomerPortal
      activePage="accounts"
      title="Customer accounts"
      description="This route is ready for account details, account creation flows, and balance views."
    >
      <SectionPlaceholder
        eyebrow="Customer accounts"
        title="Accounts page"
        description="This placeholder confirms sidebar routing is working for the customer accounts section."
      />
    </CustomerPortal>
  );
}
