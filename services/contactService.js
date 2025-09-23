import emailjs from '@emailjs/browser';

export class ContactService {
  static async sendContactEmail(formElement, t) {
    try {
      const result = await emailjs.sendForm(
        "webtools_hub_service",    
        "template_nkad7xj",   
        formElement,
        "I_IclYARBQGz-L2Na"     
      );
      
      return {
        success: true,
        message: t("messageSent")
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: t("messageFailed"),
        error: error.text
      };
    }
  }
}
