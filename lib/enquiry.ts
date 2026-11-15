export type Enquiry = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateEnquiry(
  data: Partial<Enquiry>,
  messages: { name: string; email: string; type: string; message: string },
  types: readonly string[],
): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!data.name?.trim()) errors.name = messages.name;
  if (!data.email || !EMAIL.test(data.email.trim())) errors.email = messages.email;
  if (!data.type || !types.includes(data.type)) errors.type = messages.type;
  if (!data.message?.trim()) errors.message = messages.message;
  return errors;
}
