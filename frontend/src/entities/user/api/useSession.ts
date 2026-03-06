import { userService } from '@/shared/api/user/userApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useUsersListQuery() {
    const { data, isPending, isError } = useQuery({
        queryKey: ['users-list'],
        queryFn: async () => userService.getUsersList(),
    })

    return { data, isPending, isError }
}

export function useSessionQuery() {
    const { data, isPending } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => userService.getProfile(),
    })

    return { data, isPending }
}

export function useResetSession() {
    const queryClient = useQueryClient()
    return () => queryClient.removeQueries()
}
