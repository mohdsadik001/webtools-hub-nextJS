"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TextCounter = () => {
  const [text, setText] = useState("");
  const [charsCount, setCharsCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);

  const { t } = useTranslation("common");

  useEffect(() => {
    const cleanText = text || "";

    // Characters
    setCharsCount(cleanText.length);

    // Words
    setWordsCount(cleanText.trim().split(/\s+/).filter(Boolean).length);

    // Sentences
    setSentenceCount(
      (cleanText.match(/[^.!?]+[.!?]+["']?\s*/g) || []).length
    );
  }, [text]);

  return (
    <main
      className="mt-2 md:mt-8 flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6"
      aria-labelledby="textCounterHeading"
    >
      {/* Heading */}
      <header className="flex flex-col items-end self-start md:mb-4">
        <h1 id="textCounterHeading" className="text-xl md:text-3xl font-semibold uppercase">{t("textCounter")}</h1>
        <div className="w-12 sm:w-16 h-0.5 bg-primary rounded-full"></div>
      </header>

      {/* Textarea Input */}
      <label htmlFor="text-input" className="sr-only">
        {t("textareaPlaceholder")}
      </label>
      <textarea
        id="text-input"
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-400 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg lg:text-xl font-light rounded mt-4 outline-primary resize-y"
        placeholder={t("textareaPlaceholder")}
        aria-describedby="textStats"
        rows={10}
      ></textarea>

      {/* Stats Section */}
      <section
        id="textStats"
        aria-live="polite"
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 mt-2"
      >
        {/* Characters */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {charsCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {charsCount === 1 ? t("characterSingular") : t("characterPlural")}
          </p>
        </div>

        {/* Words */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {wordsCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {wordsCount === 1 ? t("wordSingular") : t("wordPlural")}
          </p>
        </div>

        {/* Sentences */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {sentenceCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {sentenceCount === 1
              ? t("sentenceSingular")
              : t("sentencePlural")}
          </p>
        </div>
      </section>
    </main>
  );
};

export default TextCounter;


// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { FileText, RotateCcw, Copy, Clock, BarChart3 } from "lucide-react";

// const TextCounter = () => {
//   const [text, setText] = useState("");
//   const [charsCount, setCharsCount] = useState(0);
//   const [charsNoSpacesCount, setCharsNoSpacesCount] = useState(0);
//   const [wordsCount, setWordsCount] = useState(0);
//   const [sentenceCount, setSentenceCount] = useState(0);
//   const [paragraphCount, setParagraphCount] = useState(0);
//   const [avgWordsPerSentence, setAvgWordsPerSentence] = useState(0);
//   const [readingTime, setReadingTime] = useState(0);
//   const [notification, setNotification] = useState("");
//   const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
//   const textareaRef = useRef(null);
//   const notificationTimeoutRef = useRef(null);
//   const { t } = useTranslation("common");

//   // Clean up notification timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (notificationTimeoutRef.current) {
//         clearTimeout(notificationTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Enhanced notification system
//   const showNotification = (message, isError = false) => {
//     setNotification(message);
//     setIsNotificationVisible(true);
    
//     // Clear existing timeout
//     if (notificationTimeoutRef.current) {
//       clearTimeout(notificationTimeoutRef.current);
//     }
    
//     // Hide notification after 3 seconds
//     notificationTimeoutRef.current = setTimeout(() => {
//       setIsNotificationVisible(false);
//       setTimeout(() => setNotification(""), 300);
//     }, 3000);
//   };

//   useEffect(() => {
//     const cleanText = text || "";

//     // Characters (with spaces)
//     setCharsCount(cleanText.length);

//     // Characters (without spaces)
//     setCharsNoSpacesCount(cleanText.replace(/\s/g, '').length);

//     // Words
//     const words = cleanText.trim().split(/\s+/).filter(Boolean);
//     setWordsCount(words.length);

//     // Sentences
//     const sentences = cleanText.match(/[^.!?]+[.!?]+["']?\s*/g) || [];
//     setSentenceCount(sentences.length);

//     // Paragraphs
//     const paragraphs = cleanText.trim().split(/\n\s*\n/).filter(Boolean);
//     setParagraphCount(paragraphs.length);

//     // Average words per sentence
//     const avgWords = sentences.length > 0 ? Math.round(words.length / sentences.length * 10) / 10 : 0;
//     setAvgWordsPerSentence(avgWords);

//     // Reading time (assuming 200 words per minute)
//     const readingTimeMinutes = words.length > 0 ? Math.ceil(words.length / 200) : 0;
//     setReadingTime(readingTimeMinutes);
//   }, [text]);

//   const resetText = () => {
//     setText("");
//     showNotification(t("textReset") || "Text has been cleared");
//     // Focus back to textarea after reset
//     setTimeout(() => {
//       textareaRef.current?.focus();
//     }, 100);
//   };

//   const copyText = async () => {
//     if (!text.trim()) {
//       showNotification(t("noTextToCopy") || "No text to copy", true);
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(text);
//       showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
//     } catch (error) {
//       // Fallback for browsers that don't support clipboard API
//       try {
//         textareaRef.current?.select();
//         document.execCommand('copy');
//         showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
//       } catch (fallbackError) {
//         showNotification(t("copyFailed") || "Failed to copy text. Please select and copy manually.", true);
//       }
//     }
//   };

//   const copyStats = async () => {
//     const stats = `Text Statistics:
// Characters: ${charsCount}
// Characters (no spaces): ${charsNoSpacesCount}
// Words: ${wordsCount}
// Sentences: ${sentenceCount}
// Paragraphs: ${paragraphCount}
// Average words per sentence: ${avgWordsPerSentence}
// Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;

//     try {
//       await navigator.clipboard.writeText(stats);
//       showNotification(t("statisticsCopied") || "Text statistics copied to clipboard");
//     } catch (error) {
//       showNotification(t("copyFailed") || "Failed to copy statistics", true);
//     }
//   };

//   // Handle keyboard shortcuts
//   const handleKeyDown = (e) => {
//     // Ctrl/Cmd + A to select all
//     if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
//       e.preventDefault();
//       textareaRef.current?.select();
//     }
//     // Ctrl/Cmd + C to copy
//     if ((e.ctrlKey || e.metaKey) && e.key === 'c' && text.trim()) {
//       setTimeout(() => showNotification(t("copiedAlert") || "Text copied to clipboard"), 100);
//     }
//   };

//   const statisticsData = [
//     {
//       value: charsCount,
//       label: charsCount === 1 ? t("characterSingular") : t("characterPlural"),
//       description: t("charactersIncludingSpaces") || "Including spaces and punctuation",
//       icon: FileText,
//       color: "text-blue-600"
//     },
//     {
//       value: charsNoSpacesCount,
//       label: t("charactersNoSpaces") || "Characters (no spaces)",
//       description: t("charactersExcludingSpaces") || "Excluding spaces and line breaks",
//       icon: FileText,
//       color: "text-green-600"
//     },
//     {
//       value: wordsCount,
//       label: wordsCount === 1 ? t("wordSingular") : t("wordPlural"),
//       description: t("wordsDescription") || "Separated by spaces",
//       icon: BarChart3,
//       color: "text-purple-600"
//     },
//     {
//       value: sentenceCount,
//       label: sentenceCount === 1 ? t("sentenceSingular") : t("sentencePlural"),
//       description: t("sentencesDescription") || "Ending with . ! or ?",
//       icon: FileText,
//       color: "text-orange-600"
//     },
//     {
//       value: paragraphCount,
//       label: paragraphCount === 1 ? t("paragraphSingular") : t("paragraphPlural"),
//       description: t("paragraphsDescription") || "Separated by line breaks",
//       icon: FileText,
//       color: "text-red-600"
//     },
//     {
//       value: readingTime,
//       label: readingTime === 1 ? t("minuteSingular") || "minute" : t("minutePlural") || "minutes",
//       description: t("readingTimeDescription") || "Estimated reading time",
//       icon: Clock,
//       color: "text-indigo-600"
//     }
//   ];

//   const hasText = text.trim().length > 0;

//   return (
//     <main
//       className="mt-2 md:mt-8 flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6"
//       role="main"
//       aria-labelledby="textCounterHeading"
//     >
//       {/* ARIA Live Region for Announcements */}
//       <div 
//         aria-live="polite" 
//         aria-atomic="true" 
//         className="sr-only"
//         role="status"
//         aria-label="Status updates"
//       >
//         {notification}
//       </div>

//       {/* Visual Notification Toast */}
//       {isNotificationVisible && (
//         <div 
//           className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
//             notification.includes('Failed') || notification.includes('No text')
//               ? 'bg-red-600 text-white' 
//               : 'bg-green-600 text-white'
//           } ${
//             isNotificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
//           }`}
//           role="alert"
//           aria-live="off"
//         >
//           <div className="flex items-center gap-2">
//             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               {notification.includes('Failed') || notification.includes('No text') ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               )}
//             </svg>
//             <span className="text-sm font-medium">{notification}</span>
//           </div>
//         </div>
//       )}

//       {/* Heading */}
//       <header className="flex flex-col items-end self-start md:mb-4">
//         <h1 id="textCounterHeading" className="text-xl md:text-3xl font-semibold uppercase">
//           {t("textCounter")}
//         </h1>
//         <div className="w-12 sm:w-16 h-0.5 bg-primary rounded-full" aria-hidden="true"></div>
//       </header>

//       {/* Instructions for Screen Readers */}
//       <div className="sr-only">
//         <p>{t("textCounterInstructions") || "Enter or paste text in the text area below to see detailed statistics including character count, word count, sentence count, paragraphs, and estimated reading time. You can also copy the text or statistics using the buttons provided."}</p>
//       </div>

//       {/* Textarea Input */}
//       <div className="mt-4">
//         <label htmlFor="text-input" className="block mb-2 font-medium text-lg">
//           {t("textareaPlaceholder")}
//         </label>
//         <textarea
//           ref={textareaRef}
//           id="text-input"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="w-full border border-gray-400 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg lg:text-xl font-light rounded outline-primary resize-y focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
//           placeholder={t("textareaPlaceholder")}
//           aria-describedby="textStats textarea-help"
//           rows={10}
//           aria-label={t("textInputAriaLabel") || "Enter your text to analyze"}
//         />
//         <div id="textarea-help" className="sr-only">
//           {t("textareaHelp") || "Type or paste your text here to see real-time statistics. Use Ctrl+A to select all text, Ctrl+C to copy."}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-4">
//         <button
//           onClick={resetText}
//           disabled={!hasText}
//           className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
//             hasText 
//               ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//           aria-label={t("resetTextAriaLabel") || "Clear all text from the text area"}
//           aria-disabled={!hasText}
//         >
//           <RotateCcw className="w-4 h-4" aria-hidden="true" />
//           {t("resetBtn") || "Reset"}
//         </button>

//         <button
//           onClick={copyText}
//           disabled={!hasText}
//           className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
//             hasText 
//               ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//           aria-label={t("copyTextAriaLabel") || "Copy the text to clipboard"}
//           aria-disabled={!hasText}
//         >
//           <Copy className="w-4 h-4" aria-hidden="true" />
//           {t("copyTextBtn") || "Copy Text"}
//         </button>

//         <button
//           onClick={copyStats}
//           disabled={!hasText}
//           className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] touch-manipulation transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
//             hasText 
//               ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//           aria-label={t("copyStatsAriaLabel") || "Copy text statistics to clipboard"}
//           aria-disabled={!hasText}
//         >
//           <BarChart3 className="w-4 h-4" aria-hidden="true" />
//           {t("copyStatsBtn") || "Copy Stats"}
//         </button>
//       </div>

//       {/* Advanced Statistics */}
//       {hasText && avgWordsPerSentence > 0 && (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" role="region" aria-labelledby="advanced-stats">
//           <h2 id="advanced-stats" className="text-lg font-semibold text-blue-900 mb-2">
//             {t("advancedStatistics") || "Advanced Statistics"}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-800">
//             <div>
//               <span className="font-medium">{t("averageWordsPerSentence") || "Average words per sentence"}:</span> {avgWordsPerSentence}
//             </div>
//             <div>
//               <span className="font-medium">{t("averageSentencesPerParagraph") || "Average sentences per paragraph"}:</span> {paragraphCount > 0 ? Math.round(sentenceCount / paragraphCount * 10) / 10 : 0}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Stats Section */}
//       <section
//         id="textStats"
//         aria-live="polite"
//         aria-label={t("textStatistics") || "Text statistics"}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
//         role="region"
//       >
//         {statisticsData.map((stat, index) => {
//           const IconComponent = stat.icon;
//           return (
//             <div 
//               key={index}
//               className="p-4 flex flex-col items-center justify-center border border-primary rounded-lg hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary transition-all duration-200 min-h-[120px]"
//               role="article"
//               aria-labelledby={`stat-${index}-label`}
//               aria-describedby={`stat-${index}-description`}
//             >
//               <div className="flex items-center justify-center mb-2">
//                 <IconComponent className={`w-6 h-6 ${stat.color} mr-2`} aria-hidden="true" />
//                 <span className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${stat.color}`} aria-label={`${stat.value} ${stat.label}`}>
//                   {stat.value}
//                 </span>
//               </div>
//               <p id={`stat-${index}-label`} className="text-base sm:text-lg lg:text-xl text-center font-medium">
//                 {stat.label}
//               </p>
//               <p id={`stat-${index}-description`} className="text-xs sm:text-sm text-gray-600 text-center mt-1">
//                 {stat.description}
//               </p>
//             </div>
//           );
//         })}
//       </section>

//       {/* Empty State */}
//       {!hasText && (
//         <div className="mt-8 p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg" role="region" aria-label="Empty state">
//           <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" aria-hidden="true" />
//           <h2 className="text-xl font-medium mb-2">{t("noTextEntered") || "No text entered"}</h2>
//           <p className="text-sm">{t("enterTextToSeeStats") || "Enter or paste some text above to see detailed statistics and analysis."}</p>
//         </div>
//       )}

//       {/* Additional Help Text for Screen Readers */}
//       <div className="sr-only mt-4">
//         <h2>{t("keyboardShortcuts") || "Keyboard Shortcuts"}</h2>
//         <ul>
//           <li>{t("selectAllShortcut") || "Ctrl+A (Cmd+A on Mac): Select all text"}</li>
//           <li>{t("copyShortcut") || "Ctrl+C (Cmd+C on Mac): Copy selected text"}</li>
//           <li>{t("pasteShortcut") || "Ctrl+V (Cmd+V on Mac): Paste text"}</li>
//         </ul>
        
//         <h2>{t("statisticsExplanation") || "Statistics Explanation"}</h2>
//         <ul>
//           <li>{t("charactersExplanation") || "Characters: Total count including spaces, punctuation, and line breaks"}</li>
//           <li>{t("wordsExplanation") || "Words: Text segments separated by spaces"}</li>
//           <li>{t("sentencesExplanation") || "Sentences: Text segments ending with period, exclamation, or question mark"}</li>
//           <li>{t("paragraphsExplanation") || "Paragraphs: Text blocks separated by double line breaks"}</li>
//           <li>{t("readingTimeExplanation") || "Reading time: Estimated based on 200 words per minute"}</li>
//         </ul>
//       </div>
//     </main>
//   );
// };

// export default TextCounter;
