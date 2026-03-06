import { useUsersListQuery } from '@/entities/user/api/useSession'
import { UiDefaultLayout } from '@/shared/ui/layouts/ui-layout-default-page'
import { UiProductsList } from '@/widgets/catalog/ui/ui-product-list'
import { UiDescription } from '@/widgets/description/ui/ui-description'

export default function Home() {
    const { data: users, isPending, isError } = useUsersListQuery()

    return (
        <>
            <UiDefaultLayout>
                <UiDescription />
                <UiProductsList title="Популярные товары" />
                <section className="container mx-auto mt-8 rounded-lg border border-zinc-200 p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-bold">Все учетные записи</h2>
                    {isPending && <p>Загрузка учетных записей...</p>}
                    {isError && <p className="text-rose-600">Не удалось загрузить учетные записи.</p>}
                    {!isPending && !isError && (
                        <ul className="space-y-2">
                            {users?.map(user => (
                                <li key={user.id} className="rounded-md border border-zinc-200 px-3 py-2">
                                    <span className="font-medium">{user.login}</span>
                                    <span className="text-zinc-600"> ({user.email})</span>
                                    <span className="ml-2 text-xs uppercase text-zinc-500">{user.role}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </UiDefaultLayout>
        </>
    )
}
