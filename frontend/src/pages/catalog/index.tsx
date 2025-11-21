import { UiDefaultLayout } from '@/shared/ui/layouts/ui-layout-default-page'
import { UiProductsList } from '@/widgets/catalog/ui/ui-product-list'

export default function CatalogPage() {
    return (
        <>
            <UiDefaultLayout>
                <UiProductsList title="Каталог" />
            </UiDefaultLayout>
        </>
    )
}
