// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";

import TextCaseConverter from "@/components/tools/TextCaseConverter";

// const TextCaseConverter = () => {
//   const { t } = useTranslation("common");
//   const [text, setText] = useState("");
//   // const [notification, setNotification] = useState("");
//   // const [isNotificationVisible, setIsNotificationVisible] = useState(false);
//   const textareaRef = useRef(null);
//   // const notificationTimeoutRef = useRef(null);

 
//   // Enhanced case conversion functions with notifications
//   const upperCase = () => {
//     const newText = text.toUpperCase();
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("upperCase") }) || "Text converted to uppercase");
//   };

//   const sentenceCase = () => {
//     const newText = text
//       .toLowerCase()
//       .replace(/([.?!]\s*|^)([a-z])/g, (match, sep, char) => sep + char.toUpperCase());
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("sentenceCase") }) || "Text converted to sentence case");
//   };

//   const lowerCase = () => {
//     const newText = text.toLowerCase();
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("lowerCase") }) || "Text converted to lowercase");
//   };

//   const titleCase = () => {
//     const newText = text
//       .toLowerCase()
//       .split(" ")
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(" ");
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("titleCase") }) || "Text converted to title case");
//   };

//   const inverseCase = () => {
//     const newText = text
//       .split("")
//       .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
//       .join("");
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("inverseCase") }) || "Text converted to inverse case");
//   };

//   const mixedCase = () => {
//     let result = "";
//     for (let i = 0; i < text.length; i++) {
//       if(text[i] === 'a' || text[i] === 'e' || text[i] === 'i' || text[i] === 'o' || text[i] === 'u'){
//         result += text[i].toUpperCase();
//       }else{
//         result += text[i].toLocaleLowerCase();
//       }
//     }
//     let sortedResult = "";
//     for(let char of result){
//       if(!sortedResult.includes(char)){
//         sortedResult += char;
//       }
//     }
//     const newText = sortedResult.split('').sort().join('');
//     setText(newText);
//     // showNotification(t("textConvertedTo", { caseType: t("mixedCase") }) || "Text converted to mixed case");
//   };

//   const resetText = () => {
//     setText("");
//     // showNotification(t("textReset") || "Text has been reset");
//     // Focus back to textarea after reset
//     setTimeout(() => {
//       textareaRef.current?.focus();
//     }, 100);
//   };

//   const copyText = async () => {
//     if (!text.trim()) {
//       // showNotification(t("noTextToCopy") || "No text to copy");
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(text);
//       // showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
//     } catch (error) {
//       // Fallback for browsers that don't support clipboard API
//       try {
//         textareaRef.current?.select();
//         document.execCommand('copy');
//         // showNotification(t("copiedAlert") || "Text copied to clipboard successfully");
//       } catch (fallbackError) {
//         // showNotification(t("copyFailed") || "Failed to copy text. Please select and copy manually.");
//       }
//     }
//   };

//   // Handle keyboard shortcuts
//   const handleKeyDown = (e) => {
//     // Ctrl/Cmd + A to select all
//     if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
//       e.preventDefault();
//       textareaRef.current?.select();
//     }
//     // Ctrl/Cmd + C to copy (handled by browser, but we can show notification)
//     if ((e.ctrlKey || e.metaKey) && e.key === 'c' && text.trim()) {
//       // setTimeout(() => showNotification(t("copiedAlert") || "Text copied to clipboard"), 100);
//     }
//   };

//   const caseButtons = [
//     { 
//       onClick: sentenceCase, 
//       label: t("sentenceCaseBtn"),
//       ariaLabel: t("sentenceCaseAriaLabel") || "Convert text to sentence case"
//     },
//     { 
//       onClick: upperCase, 
//       label: t("upperCaseBtn"),
//       ariaLabel: t("upperCaseAriaLabel") || "Convert text to uppercase"
//     },
//     { 
//       onClick: lowerCase, 
//       label: t("lowerCaseBtn"),
//       ariaLabel: t("lowerCaseAriaLabel") || "Convert text to lowercase"
//     },
//     { 
//       onClick: titleCase, 
//       label: t("titleCaseBtn"),
//       ariaLabel: t("titleCaseAriaLabel") || "Convert text to title case"
//     },
//     { 
//       onClick: mixedCase, 
//       label: t("mixedCaseBtn"),
//       ariaLabel: t("mixedCaseAriaLabel") || "Convert text to mixed case"
//     },
//     { 
//       onClick: inverseCase, 
//       label: t("inverseCaseBtn"),
//       ariaLabel: t("inverseCaseAriaLabel") || "Convert text to inverse case"
//     }
//   ];

//   return (
//     <main className="mt-2 md:mt-8 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-4" role="main" aria-labelledby="case-converter-heading">
//       {/* ARIA Live Region for Announcements */}
//       <div 
//         aria-live="polite" 
//         aria-atomic="true" 
//         className="sr-only"
//         role="status"
//         aria-label="Status updates"
//       >
//         {/* {notification} */}
//       </div>

//       {/* Visual Notification Toast */}
//       {/* {isNotificationVisible && (
//         <div 
//           className={`fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
//             isNotificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
//           }`}
//           role="alert"
//           aria-live="off" // Handled by the sr-only live region above
//         >
//           <div className="flex items-center gap-2">
//             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//             <span className="text-sm font-medium">{notification}</span>
//           </div>
//         </div>
//       )} */}

//       {/* Title Section */}
//       <div className="flex flex-col items-end self-start mb-4">
//         <h1 id="case-converter-heading" className="text-2xl md:text-3xl font-semibold uppercase">
//           {t("caseConverterTitle")}
//         </h1>
//         <div className="w-24 h-0.5 bg-primary rounded-full mt-1" aria-hidden="true"></div>
//       </div>

//       {/* Instructions for Screen Readers */}
//       <div className="sr-only">
//         <p>{t("converterInstructions") || "Use the buttons below to convert your text to different cases. Enter or paste text in the text area, then click any conversion button. You can also use keyboard shortcuts: Ctrl+A to select all, Ctrl+C to copy."}</p>
//       </div>

//       {/* Buttons Section */}
//       <div 
//         className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mt-5" 
//         role="group" 
//         aria-labelledby="case-options-label"
//       >
//         <div id="case-options-label" className="sr-only">
//           {t("caseOptions") || "Text case conversion options"}
//         </div>
//         {caseButtons.map((button, index) => (
//           <button
//             key={index}
//             onClick={button.onClick}
//             className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg min-h-[44px] touch-manipulation"
//             aria-label={button.ariaLabel}
//             disabled={!text.trim()}
//             aria-disabled={!text.trim()}
//           >
//             {button.label}
//           </button>
//         ))}
//       </div>

//       {/* Textarea Section */}
//       <div className="mt-6 w-full">
//         <label 
//           htmlFor="text-case-input" 
//           className="block mb-2 font-medium text-lg"
//         >
//           {t("textareaPlaceholder")}
//         </label>
//         <textarea 
//           ref={textareaRef}
//           id="text-case-input" 
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="border border-gray-400 px-4 py-2 text-base sm:text-lg font-light rounded-md outline-primary text-justify w-full resize-y focus:ring-2 focus:ring-primary focus:border-primary transition-colors" 
//           value={text} 
//           placeholder={t("textareaPlaceholder")} 
//           rows={10} 
//           aria-describedby="character-count textarea-help"
//           aria-label={t("textareaAriaLabel") || "Enter text to convert between different cases"}
//         />
//         <div id="textarea-help" className="sr-only">
//           {t("textareaHelp") || "Type or paste your text here. Use the conversion buttons above to change the text case. Keyboard shortcuts: Ctrl+A to select all, Ctrl+C to copy text."}
//         </div>
//       </div>

//       {/* Character Count */}
//       <p 
//         id="character-count" 
//         className="mt-2 text-sm text-gray-600"
//         aria-live="polite"
//         aria-label={`Character count: ${text.length}`}
//       >
//         {text.length} {t("charactersCount")}
//       </p>

//       {/* Reset + Copy Buttons */}
//       <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 w-full">
//         <button 
//           onClick={resetText}
//           className="flex gap-2 items-center justify-center cursor-pointer w-full sm:w-1/2 px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] touch-manipulation"
//           aria-label={t("resetBtnAriaLabel") || "Clear all text from the text area"}
//           disabled={!text.trim()}
//           aria-disabled={!text.trim()}
//         >
//           <i className="ri-brush-2-line" aria-hidden="true"></i>
//           {t("resetBtn")}
//         </button>
//         <button 
//           onClick={copyText}
//           className="flex gap-2 items-center justify-center cursor-pointer w-full sm:w-1/2 px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] touch-manipulation"
//           aria-label={t("copyTextBtnAriaLabel") || "Copy the converted text to clipboard"}
//           disabled={!text.trim()}
//           aria-disabled={!text.trim()}
//         >
//           <i className="ri-clipboard-line" aria-hidden="true"></i>
//           {t("copyTextBtn")}
//         </button>
//       </div>

//       {/* Additional Help Text for Screen Readers */}
//       <div className="sr-only mt-4">
//         <h2>{t("keyboardShortcuts") || "Keyboard Shortcuts"}</h2>
//         <ul>
//           <li>{t("selectAllShortcut") || "Ctrl+A (Cmd+A on Mac): Select all text"}</li>
//           <li>{t("copyShortcut") || "Ctrl+C (Cmd+C on Mac): Copy selected text"}</li>
//           <li>{t("pasteShortcut") || "Ctrl+V (Cmd+V on Mac): Paste text"}</li>
//         </ul>
//       </div>
//     </main>
//   );
// };

// export default TextCaseConverter;



export default function Page () {
  return <TextCaseConverter />
}