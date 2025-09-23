import ToolCategoryPage from '@/components/pages/ToolCategoryPage';
import { financeTools } from '@/config/tools/financeTools';

export default function ColorToolsPage() {
  return <ToolCategoryPage tools={financeTools} translationKey="financeTools" />;
}
