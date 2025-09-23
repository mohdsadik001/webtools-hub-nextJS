import { useState } from 'react';

export function useJsonValidator() {
  const [input, setInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  const validateJson = (text, t) => {
    try {
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError('');
    } catch (err) {
      setFormattedJson('');
      setError(t('invalidJsonAlert') + err.message);
    }
  };

  const onInputChange = (e, t) => {
    const text = e.target.value;
    setInput(text);
    validateJson(text, t);
  };

  const clearAll = () => {
    setInput('');
    setFormattedJson('');
    setError('');
  };

  return { input, formattedJson, error, onInputChange, clearAll };
}
