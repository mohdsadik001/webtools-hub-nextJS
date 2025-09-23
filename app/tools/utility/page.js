import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { utilityTools } from '@/config/tools/utilityTools';

export default function ColorToolsPage() {
  return <ToolCategoryPage tools={utilityTools} translationKey="utilityTools" />;
}
