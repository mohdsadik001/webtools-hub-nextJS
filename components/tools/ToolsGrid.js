'use client';
import { Search } from 'lucide-react';
import ToolCard from '../shared/ToolCard';
import EmptyState from '../ui/EmptyState';
import  Button  from '../ui/buttons/Button';

export default function ToolsGrid({ 
  tools, 
  emptyStateTitle = "No tools found",
  emptyStateDescription,
  onClearSearch,
  className = "" 
}) {
  if (!tools || tools.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={emptyStateTitle}
        description={emptyStateDescription}
        action={onClearSearch && (
          <Button variant="outline" onClick={onClearSearch}>
            Clear Search
          </Button>
        )}
        className={className}
      />
    );
  }

  return (
    <section
      role="list"
      aria-label="Available tools"
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full ${className}`}
    >
      {tools
        .filter((tool) => tool.name)
        .map((tool, index) => (
          <ToolCard
            key={tool.id || index}
            tool={tool}
            role="listitem"
            aria-label={tool.name}
          />
        ))}
    </section>
  );
}
