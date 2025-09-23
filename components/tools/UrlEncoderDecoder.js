"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import { Copy, Trash2, Lock, Unlock } from 'lucide-react';
import useClipboard from '@/hooks/useClipboard';

const UrlEncoderDecoder = () => {
  const { t } = useTranslation('common');
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  
  const { copied, copy } = useClipboard(2000);

  const processText = (text) => {
    try {
      if (mode === 'encode') return encodeURIComponent(text);
      else return decodeURIComponent(text);
    } catch {
      return t('invalidInputAlert');
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setOutput(processText(val));
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setInput('');
    setOutput('');
  };

  const copyToClipboard = () => {
    copy(output);
  };

  const clearFields = () => {
    setInput('');
    setOutput('');
  };

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-2xl mt-2 md:mt-8 border border-gray-200" aria-label={t('urlEncoderDecoderTitle')}>
      <h1 className="text-xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r text-primary bg-clip-text">
        {t('urlEncoderDecoderTitle')}
      </h1>

      <div role="group" aria-label="Encode or Decode selection" className="flex justify-center mb-4 md:mb-6 space-x-4">
        <Button
          onClick={() => changeMode('encode')}
          variant={mode === 'encode' ? 'primary' : 'secondary'}
          ariaPressed={mode === 'encode'}
          icon={Lock}
          ariaLabel={t('encodeBtn')}
        >
          {t('encodeBtn')}
        </Button>
        <Button
          onClick={() => changeMode('decode')}
          variant={mode === 'decode' ? 'primary' : 'secondary'}
          ariaPressed={mode === 'decode'}
          icon={Unlock}
          ariaLabel={t('decodeBtn')}
        >
          {t('decodeBtn')}
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={handleInputChange}
        rows={1}
        placeholder={mode === 'encode' ? t('encodeInputPlaceholder') : t('decodeInputPlaceholder')}
        ariaLabel={t('inputAreaLabel')}
      />

      <div className="mb-2 mt-4">
        <label htmlFor="result" className="block font-semibold mb-2 text-gray-700">{t('resultLabel')}</label>
        <Textarea id="result" value={output} readOnly rows={6} ariaLabel={t('resultLabel')} />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
        <Button
          onClick={copyToClipboard}
          disabled={!output}
          variant="secondary"
          icon={Copy}
          ariaLabel={t('copyResultBtn')}
        >
          {t('copyResultBtn')}
        </Button>

        <Button
          onClick={clearFields}
          disabled={!input && !output}
          variant="danger"
          icon={Trash2}
          ariaLabel={t('clearBtn')}
        >
          {t('clearBtn')}
        </Button>
      </div>

      {copied && (
        <p role="status" aria-live="polite" className="text-center mt-4 text-green-600 font-medium">
         {t('copiedBtn')}
        </p>
      )}
    </main>
  );
};

export default UrlEncoderDecoder;
