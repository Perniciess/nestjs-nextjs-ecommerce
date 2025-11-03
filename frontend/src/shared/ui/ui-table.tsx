import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import * as React from 'react'

interface Person {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
]

export function UiTable() {
    const [data, _setData] = React.useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-lg border-1 border-zinc-400">
            <table className="w-full text-sm border-collapse border-spacing-0">
                <thead className="bg-white text-zinc-500">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    className={clsx(
                                        'h-12 px-4 text-left align-middle font-medium ',
                                        index === 0 && 'rounded-tl-lg ',
                                        index === headerGroup.headers.length - 1 && 'rounded-tr-lg ',
                                    )}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={clsx(
                                'transition-colors',
                                rowIndex === table.getRowModel().rows.length - 1 && 'rounded-b-lg ',
                            )}
                        >
                            {row.getVisibleCells().map((cell, cellIndex) => (
                                <td
                                    key={cell.id}
                                    className={clsx(
                                        'p-4 align-middle border-t-1 border-zinc-400',
                                        rowIndex === table.getRowModel().rows.length - 1 && clsx(
                                            cellIndex === 0 && 'rounded-bl-lg',
                                            cellIndex === row.getVisibleCells().length - 1 && 'rounded-br-lg',
                                        ),
                                    )}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
