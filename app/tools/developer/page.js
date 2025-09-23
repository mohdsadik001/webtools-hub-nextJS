import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { developerTools } from '@/config/tools/developerTools';

export default function ColorToolsPage() {
  return <ToolCategoryPage tools={developerTools} translationKey="developerTools" />;
}
