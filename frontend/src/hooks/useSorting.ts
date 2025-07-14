import { useCallback, useMemo, useState } from 'react';

export enum DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

export const useSorting = () => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<DIRECTION>(DIRECTION.ASC);

  const handleSort = useCallback((field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC);
    } else {
      setSortField(field);
      setSortDirection(DIRECTION.ASC);
    }
  }, [sortField, sortDirection]);

  const getSortString = useMemo(() => 
    sortField ? `${sortField}:${sortDirection}` : undefined,
  [sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    handleSort,
    getSortString,
  };
}; 
