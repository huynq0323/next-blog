'use client';

import { useGetData } from "@/hooks/useGetData.swr";
import { getPost } from "@/services/post.service";
import { useEffect, useState } from "react";

export const usePostTable = (initialData: IResponseGetDataDto<IPaginationTable>) => {
  const [pagination, setPagination] = useState<IPaginationTable>({
    page: 1,
    pageSize: 10,
    total: 0
  });

  const { data, isLoading, error, refetch } = useGetData({
    key: 'admin-get-posts',
    fetcher: getPost,
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    enabled: true,
    initialData
  });

  const handleTableChange = (newPagination: IPaginationTable) => {
    setPagination({
      ...pagination,
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  useEffect(() => {
    if (data) {
      setPagination(prev => ({ ...prev, total: data.total }));
    }
  }, [data?.total]);

  return {
    dataSource: data?.data || [],
    loading: isLoading,
    pagination,
    handleTableChange,
  };
};