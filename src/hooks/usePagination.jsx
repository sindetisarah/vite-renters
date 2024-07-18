import * as React from "react";

export function usePagination({ initialSize = 10 }) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialSize,
  });

  const { pageIndex, pageSize } = pagination;

  return {
    setPagination,
    pagination,
    pageSize,
    pageIndex,
    page: pageIndex,
    skip: pageSize * pageIndex,
  };
}
