import AccountChanges from "@/entities/user/ui/account";
import { UiLayoutUserPage } from "@/shared/ui/layouts/ui-layout-user-page";
import { usePathname } from "next/navigation";

export default function AccountPage() {
  const pathname = usePathname();
  return (
    <UiLayoutUserPage
      pathname={pathname}
      title="Профиль"
      description="Обновите настройки своей учетной записи."
    >
      <AccountChanges />
    </UiLayoutUserPage>
  );
}
