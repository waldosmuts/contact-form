import { z } from 'zod';
import clsx from 'clsx';
import { useState } from 'react';
// Components
import Toast from './Toast.tsx';
import Textfield from './Textfield';
import Radio from './Radio';
// Assets
import CheckIcon from '../assets/images/icon-checkbox-check.svg';
// Types
import { FormData } from '../../types.ts';

const formSchema = z.object({
  fname: z
    .string()
    .min(1, 'This field is required')
    .min(2, 'First name must contain at least 2 characters'),
  lname: z
    .string()
    .min(1, 'This field is required')
    .min(2, 'Last name must contain at least 2 characters'),
  email: z
    .string()
    .min(1, 'This field is required')
    .email('Please enter a valid email address'),
  query: z.enum(['general', 'support'], {
    required_error: 'Please select a query type',
  }),
  message: z.string().min(1, 'This field is required'),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'To submit this form, please consent to being contacted',
    }),
  }),
});

const initialFormData = {
  fname: '',
  lname: '',
  email: '',
  query: undefined,
  message: '',
  consent: false,
  errors: {},
};

export default function Form() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showToast, setShowToast] = useState(false);

  const validateFormData = () => {
    const result = formSchema.safeParse(formData);

    if (result.success) {
      console.log('Validation successful: ', result.data);
      setFormData(initialFormData);
      setShowToast(true);
    } else {
      console.log('Validation failed');
      const errors = result.error.errors.reduce((acc, { path, message }) => {
        const key = path[0] as keyof FormData;
        if (!acc[key]) acc[key] = message;
        return acc;
      }, {} as Partial<Record<keyof FormData, string>>);
      setFormData((prevData) => ({ ...prevData, errors }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFormData();
  };

  const handleChange = (
    field: keyof Omit<FormData, 'errors'>,
    value: string | boolean
  ) => {
    setFormData((currentState) => ({
      ...currentState,
      [field]: value,
      errors: {
        ...currentState.errors,
        [field]: undefined,
      },
    }));
  };

  return (
    <>
      <Toast
        heading="Message Sent!"
        body="Thanks for completing the form. We'll be in touch soon!"
        show={showToast}
        setShow={setShowToast}
      />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="grid lg:grid-cols-2 gap-4">
          <Textfield
            value={formData.fname}
            field="fname"
            error={formData.errors?.fname}
            handleChange={handleChange}
            label="First Name"
            required
            autoComplete="given-name"
          />
          <Textfield
            value={formData.lname}
            field="lname"
            error={formData.errors?.lname}
            handleChange={handleChange}
            label="Last Name"
            required
            autoComplete="family-name"
          />
        </div>
        <Textfield
          value={formData.email}
          field="email"
          error={formData.errors?.email}
          handleChange={handleChange}
          label="Email Address"
          required
          autoComplete="email"
          type="email"
          className="mt-6"
        />
        <div className="flex flex-col gap-4 mt-6">
          <span className="flex">
            <span>Query Type</span>{' '}
            <span className="text-green-600 ml-2">*</span>
          </span>
          <div className="grid lg:grid-cols-2 gap-4">
            <Radio
              name="query"
              value="general"
              label="General Enquiry"
              checked={formData.query === 'general'}
              handleChange={handleChange}
            />
            <Radio
              name="query"
              value="support"
              label="Support Request"
              checked={formData.query === 'support'}
              handleChange={handleChange}
            />
          </div>
          {formData.errors?.query && (
            <span className="text-red mt-2">{formData.errors.query}</span>
          )}
        </div>
        <label className="mt-6">
          <span className="flex">
            <span>Message</span>
            <span className="text-green-600 font-bold ml-2">*</span>
          </span>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            maxLength={1000}
            className={clsx(
              'w-full font-karla focus:outline-none text-lg rounded-lg px-6 mt-2 transition py-2 border max-h-[500px] h-[238px] lg:h-[105px]',
              formData.errors?.message
                ? 'border-red'
                : 'border-grey-500 hover:border-green-600 focus:border-green-600'
            )}
          />
          {formData.errors?.message && (
            <span className="text-red mt-2">{formData.errors.message}</span>
          )}
        </label>
        <div className="flex flex-col mt-[33px]">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              className="opacity-0 absolute"
              onChange={(e) => handleChange('consent', e.target.checked)}
            />
            <div
              className={clsx(
                'w-[18px] h-[18px] rounded-sm transition select-none',
                !formData.consent && 'border-2 border-grey-500'
              )}
            >
              <img
                src={CheckIcon}
                alt=""
                className={clsx(
                  'transition',
                  formData.consent
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-50'
                )}
              />
            </div>
            <span>
              <span>I consent to being contacted by the team</span>
              <span className="text-green-600 ml-2">*</span>
            </span>
          </label>
          {formData.errors?.consent && (
            <span className="text-red mt-2">{formData.errors.consent}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 transition hover:bg-grey-900 text-green-200 text-lg rounded-lg px-6 h-[59px] font-bold mt-10"
        >
          Submit
        </button>
      </form>
    </>
  );
}
