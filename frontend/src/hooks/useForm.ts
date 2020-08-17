import { useState } from 'react';

type Values = {
  [key: string]: string;
};

export const useForm = () => {
  const [values, setValues] = useState<Values>({
    firstName: '',
    lastName: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    getInput: (name: string) => ({
      name,
      value: values[name],
      onChange,
    }),
  };
};
