import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { textTools } from '@/config/tools/textTools';

export default function ColorToolsPage() {
  return <ToolCategoryPage tools={textTools} translationKey="textTools" />;
}
