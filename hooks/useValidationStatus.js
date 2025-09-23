import { useState, useEffect } from 'react';

export function useValidationStatus(value, validatorFunc) {
  const [isValid, setIsValid] = useState(null);
  const [details, setDetails] = useState({});
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!value) {
      setIsValid(null);
      setDetails({});
      setAnnouncement('');
      return;
    }

    const result = validatorFunc(value);
    setIsValid(result.isValid);
    setDetails(result.details);

    if (result.isValid === true) setAnnouncement('Valid input');
    else if (result.isValid === false) setAnnouncement('Invalid input');
  }, [value, validatorFunc]);

  return { isValid, details, announcement };
}
