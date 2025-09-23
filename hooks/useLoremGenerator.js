import { useState, useRef, useEffect } from 'react';
import { loremWordPool } from '@/data/data';

export function useLoremGenerator() {
  const [paragraphs, setParagraphs] = useState("");
  const [avgSentences, setAvgSentences] = useState("");
  const [avgWords, setAvgWords] = useState("");
  const [output, setOutput] = useState([]);
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  
  const outputRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const showNotification = (message, isError = false) => {
    setNotification(message);
    setIsNotificationVisible(true);
    
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setIsNotificationVisible(false);
      setTimeout(() => setNotification(""), 300);
    }, 3000);
  };

  const validateInputs = (t) => {
    const errors = {};
    
    if (!paragraphs || paragraphs < 1 || paragraphs > 100) {
      errors.paragraphs = t("paragraphsError") || "Please enter 1-100 paragraphs";
    }
    
    if (!avgSentences || avgSentences < 1 || avgSentences > 50) {
      errors.sentences = t("sentencesError") || "Please enter 1-50 sentences per paragraph";
    }
    
    if (!avgWords || avgWords < 3 || avgWords > 100) {
      errors.words = t("wordsError") || "Please enter 3-100 words per sentence";
    }
    
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateSentence = (avgWords) => {
    const length = Math.max(
      6,
      Math.round(avgWords + (Math.random() - 0.5) * 6)
    );
    const words = Array.from({ length }, () => {
      const word = loremWordPool[Math.floor(Math.random() * loremWordPool.length)];
      return word.toLowerCase();
    });
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generateParagraph = (avgSentences, avgWords, isFirst = false) => {
    const sentenceCount = Math.max(
      2,
      Math.round(avgSentences + (Math.random() - 0.5) * 2)
    );
    const para = Array.from({ length: sentenceCount }, () =>
      generateSentence(avgWords)
    ).join(" ");
    
    const classicStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    return isFirst ? classicStart + para : para;
  };

  const generateLorem = async (t) => {
    if (!validateInputs(t)) {
      showNotification(t("validationError") || "Please fix the input errors", true);
      return;
    }

    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const paras = Array.from({ length: parseInt(paragraphs) }, (_, index) =>
        generateParagraph(parseInt(avgSentences), parseInt(avgWords), index === 0)
      );
      
      setOutput(paras);
      showNotification(
        t("loremGenerated", { count: paras.length }) || 
        `Generated ${paras.length} paragraph${paras.length > 1 ? 's' : ''} of Lorem Ipsum text`
      );
      
      setTimeout(() => {
        outputRef.current?.focus();
      }, 200);
      
    } catch (error) {
      showNotification(t("generationError") || "Error generating Lorem Ipsum text", true);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetOutput = (t) => {
    setOutput([]);
    setInputErrors({});
    showNotification(t("outputReset") || "Lorem Ipsum output has been cleared");
    setParagraphs("");
    setAvgSentences("");
    setAvgWords("");
  };

  const copyText = async (t) => {
    const textToCopy = output.join('\n\n');
    
    if (!textToCopy.trim()) {
      showNotification(t("noTextToCopy") || "No text to copy. Generate some Lorem Ipsum first.", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      showNotification(t("copiedAlert") || "Lorem Ipsum text copied to clipboard successfully");
    } catch (error) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(t("copiedAlert") || "Lorem Ipsum text copied to clipboard successfully");
      } catch (fallbackError) {
        showNotification(t("copyFailed") || "Failed to copy text. Please select and copy manually.", true);
      }
    }
  };

  return {
    paragraphs,
    setParagraphs,
    avgSentences,
    setAvgSentences,
    avgWords,
    setAvgWords,
    output,
    notification,
    isNotificationVisible,
    isGenerating,
    inputErrors,
    setInputErrors,
    outputRef,
    generateLorem,
    resetOutput,
    copyText
  };
}
