'use client';

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/lib/useAuth';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { styleText } from 'util';
import { useViewport } from '@/lib/hooks/useViewport';
import { ServiceFormData } from './ServiceForm';

type Service = {
    title: string;
    slug: string;
    description: string;
    longDescription: string;
};

interface ServicesTableProps {
    refresh?: boolean;
    onRowClick?: (serviceData: ServiceFormData) => void;
}

const columnHelper = createColumnHelper<Service>();

export default function ServicesTable({ refresh, onRowClick }: ServicesTableProps) {
    const [data, setData] = useState<Service[]>([]);
    const { user, logout, loading, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false); // State untuk memicu reload data
    const { isMobile } = useViewport();

    // Dummy data sementara
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/services', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Terjadi kesalahan pada server');
                }

                const dummy: Service[] = result.data || [];
                setData(dummy);
            } catch (error: unknown) {
                toast.error(`Gagal menambahkan layanan: ${error instanceof Error ? error.message : error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [refresh, reloadFlag]);

    const handleDelete = async (slug: string) => {
        if (!user) {
            toast.error('You must be logged in to delete a service.');
            return;
        }
        if (!confirm(`Apakah kamu yakin ingin menghapus layanan dengan slug "${slug}"? Aksi ini tidak bisa dibatalkan.`)) {
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`/api/services/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (!response.ok) {
                toast.error(result.error || 'Failed to delete service');
                throw new Error(result.error || 'Terjadi kesalahan pada server');
            }
            toast.success('Layanan berhasil dihapus!');
        } catch (error: unknown) {
            toast.error(`Gagal menghapus layanan: ${error instanceof Error ? error.message : error}`);
        } finally {
            setIsLoading(false);
            setReloadFlag(!reloadFlag) // Memicu refresh pada tabel
        }
    }

    const columns = useMemo(() => {

        const desktopColumns = [
            columnHelper.accessor('title', {
                id: 'title',
                header: () => (<h1 className='font-semibold text-base'>Judul</h1>),
                cell: (info) => (
                    <div className="truncate">
                        {info.getValue()}
                    </div>
                ),
                size: 15,
            }),
            columnHelper.accessor('slug', {
                id: 'slug',
                header: () => (<h1 className='font-semibold text-base'>Slug</h1>),
                cell: (info) => (
                    <p className='font-mono text-green-700 '>
                        {info.getValue()}
                    </p>
                ),
                size: 15,
            }),
            columnHelper.accessor('description', {
                id: 'description',
                header: () => (<h1 className='font-semibold text-base'>Deskripsi</h1>),
                cell: (info) => (
                    <div className=''>
                        <p className="line-clamp-4 md:line-clamp-3 break-words whitespace-normal">
                            {info.getValue()}

                        </p>
                    </div>
                ),
                size: 20,
            }),
            columnHelper.accessor('longDescription', {
                id: 'longDescription',
                header: () => (<h1 className='font-semibold text-base'>Deskripsi panjang</h1>),
                cell: (info) => (
                    <div className="line-clamp-3 break-words whitespace-normal ">
                        {info.getValue()}
                    </div>
                ),
                size: 25,
            }),
            {
                header: () => (<h1 className='font-semibold text-base'>Aksi</h1>),
                id: 'actions',
                cell: ({ row }: { row: import('@tanstack/react-table').Row<Service> }) => (
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (onRowClick) {
                                    onRowClick(row.original as ServiceFormData);
                                }
                                console.log('Edit:', row.original.slug)
                            }}
                            className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all'
                        >
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(row.original.slug)}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </div>
                ),
                size: 25,
            },
        ];

        if (isMobile) {
            // Jika mobile, filter kolom 'description'
            // toast.success('Mobile detected, adjusting columns', { icon: '📱' });
            return desktopColumns.filter(col => col.id !== 'longDescription');
        }
        // Always return an array
        return desktopColumns;

    }, [isMobile, onRowClick, isLoading]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="mt-0">
            <Table className="table-fixed">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className={cn(
                                    header.id === 'actions' ? 'text-center' : '',
                                )}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={cn(
                                        "text-xs md:text-sm"
                                        // `w-[${cell.column.getSize()}]`
                                    )}
                                        style={{ width: `${cell.column.columnDef.size}%` }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                {isLoading ? <Loader2 className="mt-6 h-6 w-6 animate-spin mx-auto" /> : 'No Data Available'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
