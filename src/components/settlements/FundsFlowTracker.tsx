import React, { useMemo, useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar } from "lucide-react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import { TransactionInvestigation } from "./TransactionInvestigation";

// Sample data
const transactions = [
  {
    id: "TX938485",
    initiatedAmount: "₦245,700",
    settledAmount: "₦0",
    status: "missing",
    processor: "Paystack",
    processorFee: "2.5%",
    processorFeeAmount: "₦6,143",
    netAmount: "₦239,557",
    time: "2 hours ago",
    date: "2024-04-27",
  },
  {
    id: "TX938421",
    initiatedAmount: "₦128,500",
    settledAmount: "Pending",
    status: "delayed",
    processor: "Flutterwave",
    processorFee: "2.8%",
    processorFeeAmount: "₦3,598",
    netAmount: "₦124,902",
    time: "4 hours ago",
    date: "2024-04-27",
  },
  {
    id: "TX937712",
    initiatedAmount: "₦75,250",
    settledAmount: "₦72,950",
    status: "partial",
    processor: "Direct Bank",
    processorFee: "1.5%",
    processorFeeAmount: "₦1,129",
    netAmount: "₦74,121",
    time: "Yesterday",
    date: "2024-04-26",
  },
  {
    id: "Multi",
    initiatedAmount: "₦534,200",
    settledAmount: "₦0",
    status: "missing",
    processor: "Interswitch",
    processorFee: "2.2%",
    processorFeeAmount: "₦11,752",
    netAmount: "₦522,448",
    time: "Yesterday",
    date: "2024-04-26",
  },
  {
    id: "TX936547",
    initiatedAmount: "₦187,250",
    settledAmount: "₦182,569",
    status: "matched",
    processor: "Paystack",
    processorFee: "2.5%",
    processorFeeAmount: "₦4,681",
    netAmount: "₦182,569",
    time: "2 days ago",
    date: "2024-04-25",
  }
];

const statusStyles = {
  matched: "bg-green-100 text-green-800",
  delayed: "bg-amber-100 text-amber-800",
  partial: "bg-orange-100 text-orange-800",
  missing: "bg-red-100 text-red-800",
};

const FundsFlowTracker = () => {
  // State
  const [globalFilter, setGlobalFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [processorFilter, setProcessorFilter] = useState('all');

  // Columns definition
  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'Transaction ID', enableSorting: true },
    { accessorKey: 'initiatedAmount', header: 'Initiated', enableSorting: true },
    { accessorKey: 'settledAmount', header: 'Settled', enableSorting: true },
    {
      accessorKey: 'status', header: 'Status', cell: info => (
        <Badge className={statusStyles[info.getValue()]}>
          {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
        </Badge>
      )
    },
    { accessorKey: 'processor', header: 'Processor', enableSorting: true },
    { accessorKey: 'processorFee', header: 'Fee %' },
    { accessorKey: 'processorFeeAmount', header: 'Fee Amount' },
    { accessorKey: 'netAmount', header: 'Net', enableSorting: true },
    { accessorKey: 'time', header: 'Time' },
    {
      id: 'actions', header: 'Action', cell: info => (
        <TransactionInvestigation transactionId={info.row.original.id} />
      )
    }
  ], []);

  // Table instance
  const table = useReactTable({
    data: transactions,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  });

  // Export CSV
  const exportCSV = () => {
    const headers = columns.map(col => col.header).join(',');
    const rows = table.getRowModel().rows.map(row =>
      row.getVisibleCells().map(cell => cell.getValue()).join(',')
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard
      title="Funds Flow Tracker"
      className="mb-6"
      action={
        <Button onClick={exportCSV} size="sm" variant="outline">
          <Download className="mr-1 h-4 w-4" />Export CSV
        </Button>
      }
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
        {/* Global Search */}
        <div className="relative flex-1">
          <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all fields..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFilter.from}
            onChange={e => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
            className="w-36"
          />
          to
          <Input
            type="date"
            value={dateFilter.to}
            onChange={e => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
            className="w-36"
          />
        </div>
        {/* Processor Filter */}
        <Select value={processorFilter} onValueChange={setProcessorFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Processors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Processors</SelectItem>
            <SelectItem value="Paystack">Paystack</SelectItem>
            <SelectItem value="Flutterwave">Flutterwave</SelectItem>
            <SelectItem value="Interswitch">Interswitch</SelectItem>
            <SelectItem value="Direct Bank">Direct Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto relative">
        {/* Sticky Header */}
        <Table className="table-auto">
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {table.getRowModel().rows.map(row => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} size="sm">Prev</Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} size="sm" className="ml-2">Next</Button>
        </div>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </DashboardCard>
  );
};

export default FundsFlowTracker;
