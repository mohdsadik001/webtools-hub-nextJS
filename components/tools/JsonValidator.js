// components/tools/JsonValidator.js

"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import { Copy, Download, Trash2, FileJson, FileText } from 'lucide-react';
import { useJsonValidator } from '@/hooks/useJsonValidator';

const JsonValidator = () => {
  const { t } = useTranslation('common');
  const { input, formattedJson, error, onInputChange, clearAll } = useJsonValidator();

  const copyToClipboard = () => {
    if (!formattedJson) return;
    navigator.clipboard.writeText(formattedJson);
    alert(t('copiedAlert'));
  };

  const exportFile = (type) => {
    const blob = new Blob([formattedJson], {
      type: type === 'json' ? 'application/json' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="json-validator-title" className="max-w-5xl mx-auto p-4 md:p-6 mt-2 md:mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition">
      <h2 id="json-validator-title" className="text-xl md:text-3xl font-bold text-center text-primary mb-6">
        {t('jsonValidatorTitle')}
      </h2>

      <label htmlFor="json-input" className="sr-only">{t('inputPlaceholder')}</label>
      <Textarea
        id="json-input"
        value={input}
        onChange={(e) => onInputChange(e, t)}
        placeholder={t('inputPlaceholder')}
        rows={10}
        aria-invalid={!!error}
        error={!!error}
      />

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm font-medium" role="alert">
          {error}
        </div>
      )}

      {formattedJson && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">{t('formattedJsonLabel')}</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-sm font-mono overflow-auto max-h-80" tabIndex={0}>
            {formattedJson}
          </pre>

          <div className="flex flex-wrap gap-3 mt-4">
            <Button onClick={copyToClipboard} ariaLabel={t('copyBtn')} variant="primary" icon={Copy}>
              {t('copyBtn')}
            </Button>

            <Button onClick={() => exportFile('json')} ariaLabel={t('exportJsonBtn')} variant="secondary" icon={FileJson}>
              {t('exportJsonBtn')}
            </Button>

            <Button onClick={() => exportFile('txt')} ariaLabel={t('exportTxtBtn')} variant="secondary" icon={FileText}>
              {t('exportTxtBtn')}
            </Button>
          </div>
        </>
      )}

      {(input || formattedJson) && (
        <div className="mt-6 text-center">
          <Button onClick={clearAll} ariaLabel={t('clearAllBtn')} variant="muted" icon={Trash2}>
            {t('clearAllBtn')}
          </Button>
        </div>
      )}
    </section>
  );
};

export default JsonValidator;
