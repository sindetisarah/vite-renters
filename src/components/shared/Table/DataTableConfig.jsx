import * as React from "react";
import { comma } from "@/lib/utils";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import * as Cnd from "@/components/ui/command";
import * as Popover from "@/components/ui/popover.jsx";
import * as Pv from "@/components/ui/popover";
import * as Sc from "@/components/ui/select";
import * as Dw from "@/components/ui/dropdown-menu";
import * as Rx from "@radix-ui/react-icons";
import * as Fa from "react-icons/fa";
import { cn } from "@/lib/utils";
import Papa from "papaparse";
// import XLSX from "xlsx";
import printJS from "print-js";
import { jsPDF } from "jspdf"; // or use your library of choice here
import autoTable from "jspdf-autotable";
import { Label } from "components/ui/label";
import { Checkbox } from "components/ui/checkbox";

export const statuses = [
  {
    value: "single",
    label: "Single",
    icon: Rx.StopwatchIcon,
  },
  {
    value: "complicated",
    label: "Complicated",
    icon: Rx.QuestionMarkCircledIcon,
  },
  {
    value: "relationship",
    label: "Relationship",
    icon: Rx.CheckCircledIcon,
  },
  {
    value: "divorced",
    label: "Divorced",
    icon: Rx.CrossCircledIcon,
  },
];

export function DataTableViewOptions({ table }) {
  return (
    <Dw.DropdownMenu>
      <Dw.DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <Rx.MixerHorizontalIcon className="sm:mr-2 h-4 w-4 text-gray-600" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            View
          </span>
        </Button>
      </Dw.DropdownMenuTrigger>
      <Dw.DropdownMenuContent
        align="end"
        className="w-[180px] h-full max-h-[19rem] overflow-auto"
      >
        <Dw.DropdownMenuLabel>Toggle Columns</Dw.DropdownMenuLabel>
        <Dw.DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <Dw.DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </Dw.DropdownMenuCheckboxItem>
            );
          })}
      </Dw.DropdownMenuContent>
    </Dw.DropdownMenu>
  );
}

export function DataTableExportOptions({ table }) {
  let fileName = "okoa";
  const rows = table.getRowModel().rows;
  const columns = table.getAllColumns();

  // console.log(columns);

  function removePunctuation(text) {
    var punctuation = /[\.,#:;*%$()'"<>`~?!]/g;
    var newText = text.replace(punctuation, "");
    return newText;
  }

  let tableHeaders = columns
    .filter(
      (col) =>
        col?.id !== "select" &&
        col?.id !== "space" &&
        col?.id !== "actions" &&
        col.getIsVisible() !== false
    )
    .map((c) => removePunctuation(c.id));

  let dataArray = [];
  rows
    .map((row) => Object.values(row?._valuesCache))
    .forEach((element) => {
      let dataItems = element.filter((element) => {
        return element !== undefined;
      });
      dataArray.push(dataItems);
    });

  //** PDF example
  const handlePDFExport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [tableHeaders],
      body: dataArray,
    });

    doc.save(`${fileName}.pdf`);
  };

  //** CSV example
  const handleCSVExport = () => {
    const csvString = Papa.unparse({
      fields: tableHeaders,
      data: dataArray,
    });

    let csvData = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    let csvLink = null;
    if (navigator.msSaveBlob) {
      csvLink = navigator.msSaveBlob(csvData, `${fileName}`);
    } else {
      csvLink = window.URL.createObjectURL(csvData);
    }

    let doc = document.createElement("a");
    doc.href = csvLink;
    doc.setAttribute("download", `${fileName}`);
    doc.click();
  };

  //** XLSX example
  // const handleXLSXExport = () => {
  //   const compatibleData = dataArray.map((row) => {
  //     const obj = {};
  //     tableHeaders.forEach((col, index) => {
  //       obj[col] = row[index];
  //     });
  //     return obj;
  //   });

  //   let wb = XLSX.utils.book_new();
  //   let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
  //     tableHeaders,
  //   });
  //   XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
  //   XLSX.writeFile(wb, `${fileName}.xlsx`);

  //   // Returning false as downloading of file is already taken care of
  //   return false;
  // };

  //** Print example
  const handlePrintExport = () => {
    const compatibleData = dataArray.map((row) => {
      const obj = {};
      tableHeaders.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    printJS({
      printable: compatibleData ? compatibleData : [],
      properties: tableHeaders,
      type: "json",
      showModal: true,
      repeatTableHeader: true,
      documentTitle: `${fileName}`,
      gridHeaderStyle: "border: 1px solid lightgray; padding: 3px;",
      gridStyle: "border: 1px solid lightgray; padding: 2px;",
      // header: rawHTML,
      style:
        "#export_from_html { display: flex; } #export_from_html img { max-width: 120px;} .texts { width: 100%; padding: 0px; text-align: right; color: #000; } ",
      targetStyles: ["*"],
    });

    return false;
  };

  return (
    <Dw.DropdownMenu>
      <Dw.DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <Rx.FileIcon className="sm:mr-2 h-4 w-4 text-purple-700" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
      </Dw.DropdownMenuTrigger>
      <Dw.DropdownMenuContent align="end" className="w-[150px] px-1">
        <Dw.DropdownMenuLabel>Export File</Dw.DropdownMenuLabel>
        <Dw.DropdownMenuSeparator />
        <Dw.DropdownMenuItem onClick={() => handleCSVExport(rows, columns)}>
          CSV
          <Dw.DropdownMenuShortcut>
            <Fa.FaFileCsv className="text-lg text-green-600" />
          </Dw.DropdownMenuShortcut>
        </Dw.DropdownMenuItem>

        <Dw.DropdownMenuItem onClick={() => handlePDFExport(rows, columns)}>
          PDF
          <Dw.DropdownMenuShortcut>
            <Fa.FaFilePdf className="text-lg text-red-600" />
          </Dw.DropdownMenuShortcut>
        </Dw.DropdownMenuItem>

        {/* <Dw.DropdownMenuItem onClick={() => handleXLSXExport()}>
          XLSX
          <Dw.DropdownMenuShortcut>
            <Fa.FaFileExcel className="text-lg text-blue-600" />
          </Dw.DropdownMenuShortcut>
        </Dw.DropdownMenuItem> */}

        <Dw.DropdownMenuItem onClick={() => handlePrintExport()}>
          PRINT
          <Dw.DropdownMenuShortcut>
            <Fa.FaPrint className="text-lg text-purple-600" />
          </Dw.DropdownMenuShortcut>
        </Dw.DropdownMenuItem>
      </Dw.DropdownMenuContent>
    </Dw.DropdownMenu>
  );
}

export function DataTableFacetedFilter({ column, title, options }) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue());

  return (
    <Pv.Popover>
      <Pv.PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed lg:flex"
        >
          <Filter className="sm:mr-2 size-4 text-gray-600" aria-hidden="true" />

          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {title}
          </span>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </Pv.PopoverTrigger>
      <Pv.PopoverContent className="w-[200px] p-0" align="start">
        <Cnd.Command>
          <Cnd.CommandInput placeholder={title} />
          <Cnd.CommandList>
            <Cnd.CommandEmpty>No results found.</Cnd.CommandEmpty>
            <Cnd.CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <Cnd.CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Rx.CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </Cnd.CommandItem>
                );
              })}
            </Cnd.CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <Cnd.CommandSeparator />
                <Cnd.CommandGroup>
                  <Cnd.CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </Cnd.CommandItem>
                </Cnd.CommandGroup>
              </>
            )}
          </Cnd.CommandList>
        </Cnd.Command>
      </Pv.PopoverContent>
    </Pv.Popover>
  );
}

export function DataTableToolbar({
  table,
  filterFields = [],
  className,
  children,
  tableFilters,
  pageSizeOptions = [10, 25, 50, 100],
  ...props
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 flex-wrap pt-2",
        className
      )}
      {...props}
    >
      {" "}
      <div className="flex items-center space-x-2 ml-[1px]">
        {/* <p className="whitespace-nowrap text-sm font-medium">Page Size</p> */}
        <Sc.Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <Sc.SelectTrigger className="h-8 w-[4.5rem]">
            <Sc.SelectValue
              placeholder={table.getState().pagination.pageSize}
            />
          </Sc.SelectTrigger>
          <Sc.SelectContent side="bottom">
            {pageSizeOptions.map((pageSize) => (
              <Sc.SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </Sc.SelectItem>
            ))}
          </Sc.SelectContent>
        </Sc.Select>
      </div>
      <div className="flex flex-1 items-center gap-2 pl-[1.4px] ml-auto">
        {tableFilters}
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <div key={String(column.value)} className="relative">
                  <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                  <Input
                    key={String(column.value)}
                    placeholder={column.placeholder}
                    value={
                      table.getColumn(String(column.value))?.getFilterValue() ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn(String(column.value))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 md:w-full lg:w-[230px] max-w-md pl-8"
                    // className="h-8 md:w-full lg:w-[230px] max-w-md focus:bg-white focus:flex-1 focus:pr-12 transition-all duration-700 transform focus:w-64"
                  />
                </div>
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(String(column.value)) && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(String(column.value))}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Rx.Cross2Icon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableExportOptions table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

export function DataTableColumnHeader({ column, title, className }) {
  // if (!column.getCanSort() && !column.getCanHide()) {
  //   return <div className={cn(className)}>{title}</div>;
  // }

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Dw.DropdownMenu>
        <Dw.DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? "Sorted descending. Click to sort ascending."
                : column.getIsSorted() === "asc"
                  ? "Sorted ascending. Click to sort descending."
                  : "Not sorted. Click to sort ascending."
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <Rx.ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <Rx.ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <Rx.CaretSortIcon className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </Dw.DropdownMenuTrigger>
        <Dw.DropdownMenuContent align="start">
          <Dw.DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => column.toggleSorting(false)}
          >
            <Rx.ArrowUpIcon
              className="mr-2 size-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </Dw.DropdownMenuItem>
          <Dw.DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => column.toggleSorting(true)}
          >
            <Rx.ArrowDownIcon
              className="mr-2 size-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </Dw.DropdownMenuItem>

          {column.getCanSort() && column.getCanHide() && (
            <Dw.DropdownMenuSeparator />
          )}
          <Dw.DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <Rx.EyeNoneIcon
              className="mr-2 size-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Hide
          </Dw.DropdownMenuItem>
        </Dw.DropdownMenuContent>
      </Dw.DropdownMenu>
    </div>
  );
}

export function DataTablePagination({
  table,
  pageSizeOptions = [100, 50, 25, 10],
}) {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto py-1 sm:flex-row sm:gap-8 pl-2">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        {/* <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Sc.Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <Sc.SelectTrigger className="h-8 w-[4.5rem]">
              <Sc.SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </Sc.SelectTrigger>
            <Sc.SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <Sc.SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </Sc.SelectItem>
              ))}
            </Sc.SelectContent>
          </Sc.Select>
        </div> */}
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Rx.DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Rx.ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Rx.ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Rx.DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
