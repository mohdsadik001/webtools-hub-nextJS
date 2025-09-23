import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { untiConverterTools } from '@/config/tools/untiConverterTools';

export default function unitConverterToolsPage() {
  return <ToolCategoryPage tools={untiConverterTools} translationKey="Unit Converter Tools" />;
}
