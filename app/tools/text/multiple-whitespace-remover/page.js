"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Scissors, Brush, Clipboard } from "lucide-react";

const MultipleWhiteSpaceRemover = () => {
  const [text, setText] = useState("");
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
  const textareaRef = useRef(null);
  const notificationTimeoutRef = useRef(null);
  const { t } = useTranslation("common");

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

  const removeExtraSpaces = () => {
    if (!text.trim()) {
      showNotification(t("noTextToProcess") || "No text to process", true);
      return;
    }

    const cleanText = text.replace(/\s+/g, " ").trim();
    const spacesRemoved = text.length - cleanText.length;
    setText(cleanText);
    showNotification(
      t("spacesRemoved", { count: spacesRemoved }) || 
      `Removed ${spacesRemoved} extra space${spacesRemoved !== 1 ? 's' : ''}`
    );
  };

  const resetText = () => {
    setText("");
    showNotification(t("textReset") || "Text has been reset");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const copyText = async () => {
    if (!text.trim()) {
      showNotification(t("noTextToCopy") || "No text to copy", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
    } catch (error) {
      try {
        textareaRef.current?.select();
        document.execCommand('copy');
        showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
      } catch (fallbackError) {
        showNotification(t("copyFailed") || "Failed to copy text", true);
      }
    }
  };

  const hasText = text.trim().length > 0;

  return (
    <main className="mt-2 md:mt-8 flex flex-col px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 w-full" role="main" aria-labelledby="white-space-remover-title">
      {/* ARIA Live Region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {notification}
      </div>

      {/* Visual Notification Toast */}
      {isNotificationVisible && (
        <div 
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
            notification.includes('Failed') || notification.includes('No text')
              ? 'bg-red-600 text-white' 
              : 'bg-green-600 text-white'
          } ${isNotificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          role="alert"
          aria-live="off"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {notification.includes('Failed') || notification.includes('No text') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col items-end self-start md:mb-4">
        <h1 id="white-space-remover-title" className="text-lg md:text-3xl font-semibold uppercase">
          {t("multipleWhiteSpaceRemover")}
        </h1>
        <div className="w-24 h-0.5 bg-primary rounded-full self-end" aria-hidden="true"></div>
      </div>

      {/* Instructions for Screen Readers */}
      <div className="sr-only">
        <p>{t("whiteSpaceInstructions") || "Enter text with multiple spaces to clean up. The tool will remove extra whitespace and leave single spaces between words."}</p>
      </div>

      {/* Textarea */}
      <div className="mt-4">
        <label htmlFor="white-space-remover-input" className="block mb-2 font-medium text-lg">
          {t("textareaPlaceholder")}
        </label>
        <textarea
          ref={textareaRef}
          id="white-space-remover-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-400 px-4 py-2 text-base md:text-lg font-light rounded outline-primary text-justify resize-y w-full focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          placeholder={t("textareaPlaceholder")}
          rows={10}
          aria-describedby="character-count textarea-help"
          aria-label={t("textInputAriaLabel") || "Enter text with multiple spaces to clean"}
        />
        <div id="textarea-help" className="sr-only">
          {t("textareaHelp") || "Paste or type text with multiple spaces. Use the clean button to remove extra whitespace."}
        </div>
      </div>

      {/* Character Count */}
      <p id="character-count" className="text-sm mt-2 text-gray-600" aria-live="polite">
        {text.length} {t("charactersCount")}
      </p>

      {/* Remove spaces button */}
      <button
        onClick={removeExtraSpaces}
        disabled={!hasText}
        className={`flex gap-3 items-center justify-center w-full px-6 py-3 mt-3 rounded-lg text-base md:text-lg min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          hasText 
            ? 'bg-primary hover:bg-primary-dull text-white cursor-pointer' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        aria-label={t("removeMultipleSpacesBtnAriaLabel") || "Remove extra spaces from text"}
        aria-disabled={!hasText}
      >
        <Scissors className="w-5 h-5" aria-hidden="true" />
        {t("removeMultipleSpacesBtn")}
      </button>

      {/* Reset & Copy buttons */}
      <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 w-full">
        <button
<<<<<<< HEAD
          onClick={() => setText("")}
          className="flex gap-3 items-center justify-center cursor-pointer w-full px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-lg"
          aria-label={t("resetBtn")}
=======
          onClick={resetText}
          disabled={!hasText}
          className={`flex gap-3 items-center justify-center w-full px-6 py-3 rounded text-base md:text-lg min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            hasText 
              ? 'bg-primary hover:bg-primary-dull text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={t("resetBtnAriaLabel") || "Clear all text"}
          aria-disabled={!hasText}
>>>>>>> test
        >
          <Brush className="w-5 h-5" aria-hidden="true" />
          {t("resetBtn")}
        </button>

        <button
<<<<<<< HEAD
          onClick={() =>
            navigator.clipboard
              .writeText(text)
              .then(() => alert(t("copiedAlert")))
          }
          className="flex gap-3 items-center justify-center cursor-pointer w-full px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-lg"
          aria-label={t("copyTextBtn")}
=======
          onClick={copyText}
          disabled={!hasText}
          className={`flex gap-3 items-center justify-center w-full px-6 py-3 rounded text-base md:text-lg min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            hasText 
              ? 'bg-primary hover:bg-primary-dull text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={t("copyTextBtnAriaLabel") || "Copy cleaned text to clipboard"}
          aria-disabled={!hasText}
>>>>>>> test
        >
          <Clipboard className="w-5 h-5" aria-hidden="true" />
          {t("copyTextBtn")}
        </button>
      </div>

      {/* Usage tip for Screen Readers */}
      <div className="sr-only mt-4">
        <p>{t("usageTip") || "Tip: This tool removes multiple consecutive spaces, tabs, and line breaks, leaving single spaces between words. It also trims leading and trailing whitespace."}</p>
      </div>
    </main>
  );
};

export default MultipleWhiteSpaceRemover;
