"use client";
import React, { useState, useRef } from "react";
import {Brush, Copy, Scissors} from 'lucide-react'
import { useTranslation } from "react-i18next";
import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import useClipboard from '@/hooks/useClipboard';

const TextCaseConverter = () => {
  const { t } = useTranslation("common");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { copied, copy } = useClipboard();

  const upperCase = () => setText(text.toUpperCase());
  const sentenceCase = () => setText(text.toLowerCase().replace(/([.?!]\s*|^)([a-z])/g, (match, sep, char) => sep + char.toUpperCase()));
  const lowerCase = () => setText(text.toLowerCase());
  const titleCase = () => setText(text.toLowerCase().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
  const inverseCase = () => setText(text.split("").map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase())).join(""));
  const mixedCase = () => {
   let sortedResult = "";
    for(let char of text){
      if(!sortedResult.includes(char)){
        sortedResult += char;
      }
    }
    setText(sortedResult.split('').sort().join(''));
  };

  const resetText = () => {
    setText("");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const caseButtons = [
    { onClick: sentenceCase, label: t("sentenceCaseBtn"), ariaLabel: t("sentenceCaseAriaLabel") },
    { onClick: upperCase, label: t("upperCaseBtn"), ariaLabel: t("upperCaseAriaLabel") },
    { onClick: lowerCase, label: t("lowerCaseBtn"), ariaLabel: t("lowerCaseAriaLabel") },
    { onClick: titleCase, label: t("titleCaseBtn"), ariaLabel: t("titleCaseAriaLabel") },
    { onClick: mixedCase, label: t("mixedCaseBtn"), ariaLabel: t("mixedCaseAriaLabel") },
    { onClick: inverseCase, label: t("inverseCaseBtn"), ariaLabel: t("inverseCaseAriaLabel") }
  ];

  return (
    <main className="mt-2 md:mt-8 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-4" role="main" aria-labelledby="case-converter-heading">
      <div className="flex flex-col items-end self-start mb-4">
        <h1 id="case-converter-heading" className="text-2xl md:text-3xl font-semibold uppercase">
          {t("caseConverterTitle")}
        </h1>
        <div className="w-24 h-0.5 bg-primary rounded-full mt-1" aria-hidden="true"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mt-5">
        {caseButtons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            disabled={!text.trim()}
            variant={text.trim() ? 'secondary' : 'muted'}
            ariaLabel={button.ariaLabel}
            className="rounded-full"
          >
            {button.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 w-full">
        <label htmlFor="text-case-input" className="block mb-2 font-medium text-lg">
          {t("textareaPlaceholder")}
        </label>
        <Textarea 
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("textareaPlaceholder")}
          rows={10}
          ariaLabel={t("textareaAriaLabel")}
        />
      </div>

      <p className="mt-2 text-sm text-gray-600" aria-live="polite">
        {text.length} {t("charactersCount")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 sm:flex-row items-center mt-4 gap-3 w-full">
        <Button
          icon ={Scissors}
          onClick={resetText}
          disabled={!text.trim()}
          variant={text.trim() ? 'primary' : 'muted'}
          ariaLabel={t("resetBtnAriaLabel")}
        >
          <i className="ri-brush-2-line mr-2" aria-hidden="true"></i>
          {t("resetBtn")}
        </Button>

        <Button
          icon={Copy}
          onClick={() => copy(text)}
          disabled={!text.trim()}
          variant={text.trim() ? 'primary' : 'muted'}
          ariaLabel={t("copyTextBtnAriaLabel")}
        >
          <i className="ri-clipboard-line mr-2" aria-hidden="true"></i>
          {copied ? t("copiedBtn") : t("copyTextBtn")}
        </Button>
      </div>
    </main>
  );
};

export default TextCaseConverter;
