import { UiDefaultLayout } from '@/shared/ui/layouts/ui-layout-default-page'
import { UiProductsList } from '@/widgets/catalog/ui/ui-product-list'
import { UiDescription } from '@/widgets/description/ui/ui-description'

export default function Home() {
    return (
        <>
            <UiDefaultLayout>
                <UiDescription />
                <UiProductsList title="Популярные товары" />
            </UiDefaultLayout>
        </>
    )
}
