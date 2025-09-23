"use client";
import { useAppContext } from "../../app/Context/AppContext";
import { useAuthProtection } from "../../hooks/useAuthProtection";
import { useToolsFilter } from "../../hooks/useToolsFilter";
import { useTranslation } from "react-i18next";

// Components
import LoadingSpinner from "../ui/LoadingSpinner";
import PageHeader from "../ui/PageHeader";
import ToolsGrid from "../tools/ToolsGrid";

export default function AllToolsPage() {
  const { allTools, searchQuery, setSearchQuery } = useAppContext();
  const { isLoading, isAuthenticated } = useAuthProtection(
    "/auth/signin",
    "/tools"
  );
  const { filteredTools, hasResults } = useToolsFilter(allTools, searchQuery);
  const { t } = useTranslation("common");

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main
      className="mt-2 md:mt-8 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6"
      role="main"
      aria-labelledby="all-tools-heading"
    >
      <PageHeader title={t("allToolsHead")} alignment="left" className="mb-8" />

      <ToolsGrid
        tools={filteredTools}
        emptyStateTitle={t("noToolsFound")}
        emptyStateDescription={
          searchQuery ? `No tools found for "${searchQuery}"` : undefined
        }
        onClearSearch={searchQuery ? handleClearSearch : undefined}
      />
    </main>
  );
}
