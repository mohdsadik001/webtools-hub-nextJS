'use client';
import { useEffect, useState } from 'react';

export function useToolsFilter(tools, searchQuery) {
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredTools(
        tools.filter((tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTools(tools);
    }
  }, [tools, searchQuery]);

  return {
    filteredTools,
    hasResults: filteredTools.length > 0,
    resultCount: filteredTools.length
  };
}
