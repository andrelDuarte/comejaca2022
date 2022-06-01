interface ISendMailDTO {
  to: string;
  from: string;
  subject: string;
  html: string;
  cc: string;
}

export { ISendMailDTO };
