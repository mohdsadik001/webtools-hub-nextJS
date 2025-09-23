import React from 'react';
import Button from './buttons/Button'; // existing reusable Button component
import { useTranslation } from 'react-i18next';

const DirectionSelector = ({ direction, setDirection, directions }) => {
  const { t } = useTranslation("common");
  return (
    <div role="group" aria-label={t("directionLabel")} className="flex flex-wrap justify-center gap-3">
      {directions.map((dir) => (
        <Button
          key={dir.value}
          variant={direction === dir.value ? "primary" : "outline"}
          onClick={() => setDirection(dir.value)}
          aria-pressed={direction === dir.value}
          size="md"
          className="border-2"
        >
          {t(dir.labelKey)}
        </Button>
      ))}
    </div>
  );
};

export default DirectionSelector;
