import { UiLayoutUserPage } from "@/shared/ui/layouts/ui-layout-user-page";
import { usePathname } from "next/navigation";

export default function BasketPage() {
  const pathname = usePathname();
  return (
    <UiLayoutUserPage
      pathname={pathname}
      title="Корзина"
      description="Корзина ваших товаров"
    >
боби
    </UiLayoutUserPage>
  );
}
