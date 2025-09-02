"use client"
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "webtools_hub_service",    // Replace with your service ID
        "template_nkad7xj",   // Replace with your template ID
        form.current,
        "I_IclYARBQGz-L2Na"     // Replace with your public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send. Please try again.");
        }
      );
  };
  const {t} = useTranslation("common")

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h2 className="text-3xl font-bold text-primary mb-6">📬 {t("contact")}</h2>
      <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="border border-gray-300 px-4 py-3 rounded outline-primary"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="border border-gray-300 px-4 py-3 rounded outline-primary"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="border border-gray-300 px-4 py-3 rounded outline-primary resize-none"
        />
        <button
          type="submit"
          className="bg-primary text-white text-lg py-3 px-6 rounded hover:bg-primary-dull transition"
        >
          Send Message ✉️
        </button>
      </form>

      {status && (
        <p className="text-sm text-center mt-4 text-green-600">{status}</p>
      )}
    </div>
  );
};

export default Contact;
