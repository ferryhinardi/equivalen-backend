import sgMail from '@sendgrid/mail';
import { apiKey } from 'config/send-grid';

sgMail.setApiKey(apiKey);

const sendEmail = ({ to, from, subject, text, html, templateId, dynamicTemplateData }) => {
  sgMail.send({
    to,
    from,
    subject,
    text,
    html,
    templateId,
    dynamic_template_data: dynamicTemplateData,
  });
};

export default sendEmail;

