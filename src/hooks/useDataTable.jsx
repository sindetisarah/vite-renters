import * as React from "react";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useSorting } from "./useSorting";
import { usePagination } from "./usePagination";

const columnHelper = createColumnHelper();

export function useDataTable({
  data,
  columns,
  rowCount,
  pageCount,
  pagination,
  setPagination,
}) {
  // const cols = React.useMemo(
  //   () =>
  //     columns.map(
  //       ({
  //         id,
  //         accessorKey,
  //         header,
  //         enableSorting,
  //         enableHiding,
  //         show,
  //         cell,
  //         filterFn,
  //       }) => ({
  //         header: ({ column, table }) => {
  //           return id === "select" ? (
  //             <Checkbox
  //               checked={
  //                 table.getIsAllPageRowsSelected() ||
  //                 (table.getIsSomePageRowsSelected() && "indeterminate")
  //               }
  //               onCheckedChange={(value) =>
  //                 table.toggleAllPageRowsSelected(!!value)
  //               }
  //               aria-label="Select all"
  //               className="translate-y-[2px]"
  //             />
  //           ) : (
  //             <DataTableColumnHeader column={column} title={header} />
  //           );
  //         },
  //         id,
  //         accessorKey,
  //         enableSorting,
  //         enableHiding,
  //         show,
  //         cell,
  //         filterFn,
  //       })
  //     ),
  //   [columns]
  // );

  // sorting state of the table

  const { sorting, setSorting, field, order } = useSorting();

  // pagination state of the table
  const [rowSelection, setRowSelection] = React.useState({});

  // column filters state of the table
  const [columnFilters, setColumnFilters] = React.useState([]);
  // const debouncedColumnFilters = useDebounce(columnFilters, 1000);

  // column visibility state of the table
  const [columnVisibility, setColumnVisibility] = React.useState(
    columns
      .filter((col) => col.show === false)
      .map((col) => col.id || col.accessorKey)
      .reduce((visibilityState, columnId) => {
        visibilityState[columnId] = !columns
          .map((col) => col.id || col.accessorKey)
          .includes(columnId);
        return visibilityState;
      }, {})
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(pageCount / pagination?.pageSize) ?? 1,
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    // manualSorting: true,
    // manualFiltering: true,
  });

  return { table };
}
