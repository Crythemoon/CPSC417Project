import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerProfilePage() {
  return (
    <CustomerPortal
      activePage="profile"
      title="Customer profile"
      description="This route is ready for personal information updates, password changes, and contact details."
    >
      <SectionPlaceholder
        eyebrow="Customer profile"
        title="Profile page"
        description="This placeholder confirms sidebar routing is working for the customer profile section."
      />
    </CustomerPortal>
  );
}
