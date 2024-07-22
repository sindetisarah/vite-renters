import { usePagination } from "@/hooks/usePagination";
import { useDataTable } from "@/hooks/useDataTable";
import React, { useState } from "react";
import { datas } from "@/data";
import { CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/shared/Table/DataTable";
import {
  DataTableColumnHeader,
  DataTableToolbar,
} from "@/components/shared/Table/DataTableConfig";
import { Checkbox } from "@/components/ui/checkbox";
import { comma, maskPhoneNumber } from "@/lib/utils";
import Add from "./Add";
import { Button } from "components/ui/button";
import { Eye, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import Update from "./Update";

const filterFields = [
  {
    label: "Name",
    value: "name",
    placeholder: "Filter Name...",
  },
];

function DataTableToolbarActions({ ...props }) {
  return (
    <div className="flex items-center gap-2">
      {/* Refresh icon */}

      <Button
        // onClick={props.OnRefresh}
        variant="outline"
        size="sm"
        className="h-8 lg:flex"
      >
        <RefreshCw
          className="sm:mr-2 size-4 text-blue-700"
          aria-hidden="true"
        />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Refresh
        </span>
      </Button>

      {/* Add Dialog Trigger */}
      <Add />
    </div>
  );
}
function DataTableRowActions({ ...props }) {
  return (
    <div className="flex items-center gap-x-2 ml-[-0.23rem]">
      {/* Buttons with toolTip */}

      <Button
        variant="ghost"
        size="icon"
        tooltip={String("View")}
        className="h-6 w-6 lg:flex"
        // onClick={() => props.navigateDetailedView(item)}
      >
        <Eye className="size-4 text-green-600" aria-hidden="true" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        tooltip={String(`Edit`)}
        className="h-6 w-6 lg:flex"
        onClick={() => props.handleEdit()}
      >
        <Pencil className="size-4 text-cyan-600" aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        tooltip={String("Delete")}
        className="h-6 w-6 lg:flex"
        onClick={() => props.handleDelete()}
      >
        <Trash2 className="size-4 text-red-600" aria-hidden="true" />
      </Button>
    </div>
  );
}

const Lease = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  //import pagination hook here
  const {
    page: pageIndex,
    pageSize,
    pagination,
    setPagination,
  } = usePagination({ initialSize: 10 });

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px] mr-3"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "actions",
        accessorKey: "Action",
        enableSorting: false,
        enableHiding: true,
        show: true, // Use this state to hide your column
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => (
          <DataTableRowActions row={row} handleEdit={handleEdit} />
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {row.getValue("name")}
          </div>
        ),
      },

      {
        id: "amount",
        accessorKey: "amount",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {comma(row.getValue("amount"))}
          </div>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {row.getValue("description")}
          </div>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {row.getValue("status")}
          </div>
        ),
      },
      {
        id: "company",
        accessorKey: "company",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {row.getValue("company")}
          </div>
        ),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[500px] truncate hover:text-balance hover:w-full font-medium">
            {row.getValue("createdAt")}
          </div>
        ),
      },
    ],
    []
  );

  const { table } = useDataTable({
    columns: columns,
    data: datas,
    pageCount: 100,
    pagination: pagination,
    setPagination: setPagination,
  });

  return (
    <>
      {" "}
      <CardContent>
        {/* Or here */}
        <DataTable
          table={table}
          // loading={loading ? <Loader /> : <Message>{error}</Message>}
        >
          <DataTableToolbar table={table} filterFields={filterFields}>
            <DataTableToolbarActions table={table} />
          </DataTableToolbar>
        </DataTable>
      </CardContent>
      <Update
        // tableData={tableData}
        // currentData={currentData}
        // setCurrentData={setCurrentData}
        showDialog={showEditDialog}
        setShowDialog={setShowEditDialog}
      />
    </>
  );
};

export default Lease;
