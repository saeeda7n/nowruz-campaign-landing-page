"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { faIR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRedirects } from "@/server/actions/dashboard/redirects";

const columns = [
  {
    header: "کاربر",
    accessorKey: "user.fullName",
    cell: (data: any) => data.getValue() || "کاربر غیر عضو",
  },
  {
    header: "آی پی",
    accessorKey: "receiver.fullName",
    cell: (data: any) => data.getValue() || "آی پی ثبت نشده",
  },
  { header: "مدل", accessorKey: "model" },
  { header: "شناسه مرجع", accessorKey: "referenceId" },
  {
    header: "زمان ارجاع",
    accessorKey: "createdAt",
    cell: (data: any) =>
      formatDistance(Date.now(), data.getValue(), { locale: faIR }) + " پیش",
  },
];

const DataTable = (data: Awaited<ReturnType<typeof getRedirects>>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const messagesQuery = useQuery({
    queryFn: () => getRedirects({ pageIndex: pagination.pageIndex }),
    queryKey: ["messages", pagination],
    placeholderData: keepPreviousData,
    initialData: data,
  });

  const table = useReactTable({
    data: messagesQuery.data?.messages || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: messagesQuery.data?.total || 0,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-right">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center gap-5">
        <div className="font-medium">
          صفحه {pagination.pageIndex + 1} از {table.getPageCount() || 1}
        </div>

        <div className="me-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
