interface ISendMailDTO {
  to: string;
  from: string;
  subject: string;
  html: string;
  bcc: string[];
  cc: string;
}

export { ISendMailDTO };
