import { useCallback, useMemo, useState } from 'react';
import { PaginationMeta } from '../types';

export const usePagination = (initialMeta: PaginationMeta = { total: 0, take: 10, skip: 0 }) => {
  const [meta, setMetaState] = useState<PaginationMeta>(initialMeta);

  const setMeta = useCallback((newMeta: PaginationMeta) => {
    setMetaState(newMeta);
  }, []);

  const handlePageChange = useCallback((newSkip: number) => {
    setMetaState(prev => ({ ...prev, skip: newSkip }));
  }, []);

  const totalPages = useMemo(() => Math.ceil(meta.total / meta.take), [meta.total, meta.take]);
  const currentPage = useMemo(() => Math.floor(meta.skip / meta.take) + 1, [meta.skip, meta.take]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(meta.skip + meta.take);
    }
  }, [currentPage, totalPages, meta.skip, meta.take, handlePageChange]);

  const goToPreviousPage = useCallback(() => {
    if (meta.skip > 0) {
      handlePageChange(Math.max(0, meta.skip - meta.take));
    }
  }, [meta.skip, meta.take, handlePageChange]);

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = meta.skip > 0;

  return {
    meta,
    setMeta,
    totalPages,
    currentPage,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrevious
  };
}; 
