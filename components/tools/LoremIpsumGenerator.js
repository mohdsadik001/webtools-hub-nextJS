"use client";
import React, { useState, useRef, useEffect } from "react";
import { loremWordPool } from "@/data/data";
import { useTranslation } from "react-i18next";
import { Scissors, Brush, Clipboard, FileText } from "lucide-react";
import Button from "../ui/buttons/Button";

const LoremIpsumGenerator = () => {
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
  const { t } = useTranslation("common");

  // Clean up notification timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced notification system
  const showNotification = (message, isError = false) => {
    setNotification(message);
    setIsNotificationVisible(true);
    
    // Clear existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    // Hide notification after 3 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      setIsNotificationVisible(false);
      setTimeout(() => setNotification(""), 300);
    }, 3000);
  };

  // Input validation
  const validateInputs = () => {
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
      const word =
        loremWordPool[Math.floor(Math.random() * loremWordPool.length)];
      return word.toLowerCase();
    });
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const startWithClassic = true;
  const classicStart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    
  const generateParagraph = (avgSentences, avgWords, isFirst = true) => {
    const sentenceCount = Math.max(
      2,
      Math.round(avgSentences + (Math.random() - 0.5) * 2)
    );
    const para = Array.from({ length: sentenceCount }, () =>
      generateSentence(avgWords)
    ).join(" ");
    return isFirst && startWithClassic ? classicStart + para : para;
  };

  const generateLorem = async () => {
    if (!validateInputs()) {
      showNotification(t("validationError") || "Please fix the input errors", true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Add small delay for better UX with loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const paras = Array.from({ length: parseInt(paragraphs) }, (_, index) =>
        generateParagraph(parseInt(avgSentences), parseInt(avgWords), index === 0)
      );
      
      setOutput(paras);
      showNotification(
        t("loremGenerated", { count: paras.length }) || 
        `Generated ${paras.length} paragraph${paras.length > 1 ? 's' : ''} of Lorem Ipsum text`
      );
      
      // Focus output area for screen readers
      setTimeout(() => {
        outputRef.current?.focus();
      }, 200);
      
    } catch (error) {
      showNotification(t("generationError") || "Error generating Lorem Ipsum text", true);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetOutput = () => {
    setOutput([]);
    setInputErrors({});
    showNotification(t("outputReset") || "Lorem Ipsum output has been cleared");
    setParagraphs("");
    setAvgSentences("")
    setAvgWords("")
  };

  const copyText = async () => {
    const textToCopy = output.join('\n\n');
    
    if (!textToCopy.trim()) {
      showNotification(t("noTextToCopy") || "No text to copy. Generate some Lorem Ipsum first.", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      showNotification(t("copiedAlert") || "Lorem Ipsum text copied to clipboard successfully");
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
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

  // Handle input changes with validation
  const handleInputChange = (setter, fieldName, value) => {
    setter(value);
    
    // Clear field error when user starts typing
    if (inputErrors[fieldName]) {
      setInputErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  // Handle Enter key on generate button
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.closest('.generate-button')) {
      generateLorem();
    }
  };

  const isFormValid = paragraphs && avgSentences && avgWords && Object.keys(inputErrors).length === 0;
  const hasOutput = output.length > 0;
  const totalWords = output.reduce((acc, para) => acc + para.split(' ').length, 0);
  const totalSentences = output.reduce((acc, para) => acc + para.split('.').length - 1, 0);

  return (
    <div className="mt-2 md:mt-8 flex flex-col px-3 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-4 mx-auto w-full">
      {/* ARIA Live Region for Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
        aria-label="Status updates"
      >
        {notification}
      </div>

      {/* Visual Notification Toast */}
      {isNotificationVisible && (
        <div 
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
            notification.includes('Error') || notification.includes('error') || notification.includes('fix') || notification.includes('No text')
              ? 'bg-red-600 text-white' 
              : 'bg-green-600 text-white'
          } ${
            isNotificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
          role="alert"
          aria-live="off"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {notification.includes('Error') || notification.includes('error') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="flex flex-col items-end self-start md:mb-4">
        <h1 className="text-xl md:text-3xl font-semibold uppercase break-words">
          {t("loremIpsum")}
        </h1>
        <div className="w-10 sm:w-24 h-0.5 bg-primary rounded-full mt-1" aria-hidden="true"></div>
      </div>

      {/* Instructions for Screen Readers */}
      <div className="sr-only">
        <p>{t("loremInstructions") || "Enter the number of paragraphs, sentences per paragraph, and words per sentence to generate Lorem Ipsum placeholder text. All fields are required with specific ranges."}</p>
      </div>

      {/* Input Grid */}
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 w-full">
        <legend className="sr-only">{t("loremSettings") || "Lorem Ipsum Generation Settings"}</legend>
        
        {/* Paragraphs Input */}
        <div>
          <label
            htmlFor="paragraphs-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("paragraphCountPlaceholder")}
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          </label>
          <input
            id="paragraphs-input"
            value={paragraphs}
            onChange={(e) => handleInputChange(setParagraphs, 'paragraphs', e.target.value)}
            className={`border px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base min-h-[44px] transition-colors ${
              inputErrors.paragraphs 
                ? 'border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary'
            }`}
            type="number"
            min="1"
            max="100"
            placeholder={t("paragraphCountPlaceholder")}
            aria-describedby={inputErrors.paragraphs ? 'paragraphs-error' : 'paragraphs-help'}
            aria-invalid={inputErrors.paragraphs ? 'true' : 'false'}
            aria-required="true"
          />
          <div id="paragraphs-help" className="sr-only">
            {t("paragraphsHelp") || "Enter a number between 1 and 100 paragraphs"}
          </div>
          {inputErrors.paragraphs && (
            <p id="paragraphs-error" className="text-red-600 text-xs mt-1" role="alert">
              {inputErrors.paragraphs}
            </p>
          )}
        </div>

        {/* Sentences Input */}
        <div>
          <label
            htmlFor="sentences-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("sentenceCountPlaceholder")}
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          </label>
          <input
            id="sentences-input"
            value={avgSentences}
            onChange={(e) => handleInputChange(setAvgSentences, 'sentences', e.target.value)}
            className={`border px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base min-h-[44px] transition-colors ${
              inputErrors.sentences 
                ? 'border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary'
            }`}
            type="number"
            min="1"
            max="50"
            placeholder={t("sentenceCountPlaceholder")}
            aria-describedby={inputErrors.sentences ? 'sentences-error' : 'sentences-help'}
            aria-invalid={inputErrors.sentences ? 'true' : 'false'}
            aria-required="true"
          />
          <div id="sentences-help" className="sr-only">
            {t("sentencesHelp") || "Enter a number between 1 and 50 sentences per paragraph"}
          </div>
          {inputErrors.sentences && (
            <p id="sentences-error" className="text-red-600 text-xs mt-1" role="alert">
              {inputErrors.sentences}
            </p>
          )}
        </div>

        {/* Words Input */}
        <div>
          <label
            htmlFor="words-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("wordCountPlaceholder")}
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          </label>
          <input
            id="words-input"
            value={avgWords}
            onChange={(e) => handleInputChange(setAvgWords, 'words', e.target.value)}
            className={`border px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base min-h-[44px] transition-colors ${
              inputErrors.words 
                ? 'border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary'
            }`}
            type="number"
            min="3"
            max="100"
            placeholder={t("wordCountPlaceholder")}
            aria-describedby={inputErrors.words ? 'words-error' : 'words-help'}
            aria-invalid={inputErrors.words ? 'true' : 'false'}
            aria-required="true"
          />
          <div id="words-help" className="sr-only">
            {t("wordsHelp") || "Enter a number between 3 and 100 words per sentence"}
          </div>
          {inputErrors.words && (
            <p id="words-error" className="text-red-600 text-xs mt-1" role="alert">
              {inputErrors.words}
            </p>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex items-end">
          <Button
            onClick={generateLorem}
            onKeyDown={handleKeyDown}
            
            disabled={isGenerating}
            variant={!paragraphs || !avgSentences || !avgWords ? 'muted' : 'primary'}
            aria-label={isGenerating ? t("generatingText") || "Generating Lorem Ipsum text, please wait" : t("generateBtnAriaLabel") || "Generate Lorem Ipsum text with specified parameters"}
            aria-disabled={isGenerating}
            className="w-full py-3"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                {t("generating") || "Generating..."}
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" aria-hidden="true" />
                {t("generateBtn")}
              </>
            )}
          </Button>
        </div>
      </fieldset>

      {/* Output Statistics */}
      {hasOutput && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg" role="region" aria-labelledby="output-stats">
          <h2 id="output-stats" className="sr-only">{t("outputStatistics") || "Generated Text Statistics"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-blue-800">
            <div>
              <span className="font-medium">{t("paragraphs") || "Paragraphs"}:</span> {output.length}
            </div>
            <div>
              <span className="font-medium">{t("sentences") || "Sentences"}:</span> {totalSentences}
            </div>
            <div>
              <span className="font-medium">{t("words") || "Words"}:</span> {totalWords}
            </div>
          </div>
        </div>
      )}

      {/* Output Box */}
      <div 
        className="border border-gray-400 px-2 sm:px-4 py-2 text-sm sm:text-base md:text-lg font-light rounded mt-5 outline-none text-justify min-h-[30vh] max-h-[50vh] overflow-auto transition-all duration-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
        role="region"
        aria-labelledby="output-label"
        aria-live="polite"
        tabIndex="0"
        ref={outputRef}
      >
        <p id="output-label" className="text-xs sm:text-sm mb-2 text-gray-400">
          {t("loremIpsumTextLabel")}
        </p>
        {hasOutput ? (
          output.map((para, idx) => (
            <p key={idx} className="mb-3 leading-relaxed">
              {para}
            </p>
          ))
        ) : (
          <p className="text-gray-500 italic py-8 text-center">
            {t("noLoremGenerated") || "Your generated Lorem Ipsum text will appear here. Fill in the parameters above and click Generate."}
          </p>
        )}
      </div>

      {/* Reset & Copy buttons */}
      <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 w-full">
        {/* Reset */}
        <button
          onClick={resetOutput}
          disabled={!hasOutput}
          className={`flex gap-3 items-center justify-center w-full px-6 py-3 rounded text-base md:text-lg min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            hasOutput 
              ? 'bg-primary hover:bg-primary-dull text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={t("resetBtnAriaLabel") || "Clear all generated Lorem Ipsum text"}
          aria-disabled={!hasOutput}
        >
          <Brush className="w-5 h-5" aria-hidden="true" />
          {t("resetBtn")}
        </button>

        {/* Copy */}
        <button
          onClick={copyText}
          disabled={!hasOutput}
          className={`flex gap-3 items-center justify-center w-full px-6 py-3 rounded text-base md:text-lg min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            hasOutput 
              ? 'bg-primary hover:bg-primary-dull text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={t("copyTextBtnAriaLabel") || "Copy all generated Lorem Ipsum text to clipboard"}
          aria-disabled={!hasOutput}
        >
          <Clipboard className="w-5 h-5" aria-hidden="true" />
          {t("copyTextBtn")}
        </button>
      </div>

      {/* Additional Help Text for Screen Readers */}
      <div className="sr-only mt-4">
        <h2>{t("usage") || "How to Use"}</h2>
        <ol>
          <li>{t("step1") || "1. Enter the number of paragraphs you want (1-100)"}</li>
          <li>{t("step2") || "2. Set average sentences per paragraph (1-50)"}</li>
          <li>{t("step3") || "3. Set average words per sentence (3-100)"}</li>
          <li>{t("step4") || "4. Click Generate to create your Lorem Ipsum text"}</li>
          <li>{t("step5") || "5. Use Reset to clear the output or Copy to copy text to clipboard"}</li>
        </ol>
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;
