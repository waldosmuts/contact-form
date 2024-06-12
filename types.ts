export interface FormData {
  fname: string;
  lname: string;
  email: string;
  query: 'general' | 'support' | undefined;
  message: string;
  consent: boolean;
  errors?: Partial<Record<keyof Omit<FormData, 'errors'>, string>>;
}
