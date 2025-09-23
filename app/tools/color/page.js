
import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { colorTools } from '@/config/tools/colorTools';

export default function ColorToolsPage() {
  return <ToolCategoryPage tools={colorTools} translationKey="colorTools" />;
}
