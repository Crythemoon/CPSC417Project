import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerCreateAccountPage() {
  return (
    <CustomerPortal
      activePage="accounts"
      title="Create a customer account"
      description="This route is ready for choosing between chequing and savings account creation flows."
    >
      <SectionPlaceholder
        eyebrow="Customer account creation"
        title="Create account page"
        description="This placeholder confirms dashboard actions can route to a dedicated customer account creation page."
      />
    </CustomerPortal>
  );
}
