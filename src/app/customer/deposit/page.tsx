import CustomerPortal from "@/components/customer-portal";
import SectionPlaceholder from "@/components/section-placeholder";

export default function CustomerDepositPage() {
  return (
    <CustomerPortal
      activePage="accounts"
      title="Deposit money"
      description="This route is ready for deposit forms and account selection."
    >
      <SectionPlaceholder
        eyebrow="Customer deposits"
        title="Deposit page"
        description="This placeholder confirms dashboard actions can route to a dedicated customer deposit page."
      />
    </CustomerPortal>
  );
}
