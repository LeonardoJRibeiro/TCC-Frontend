import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import useField from '../../Hooks/useField';
import { KeyboardDatePicker, DatePickerViewsProps } from '@material-ui/pickers';

interface DateFieldProps extends DatePickerViewsProps {
  name: string,
  required?: boolean;
  label?: string;
  fullWidth?: boolean;
  format?: string;
  disabled?: boolean;
}


interface Ref {
  value: Date | string | null;
}

const DateField: React.FC<DateFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<Date | null>(null);
  const ref = useRef<Ref>({} as Ref);
  const inputRef = useRef<HTMLInputElement>();
  const { registerField, fieldName, defaultValue } = useField(name);

  ref.current.value = value;

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required && ref.current.value === null) {
        return true;
      }
      if (!Number.isNaN(new Date(ref.current.value ? ref.current.value : "").getTime()) && ref.current.value) {
        setValid(true);
        return (true);
      }
      else {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        setValid(false);
        return (false);
      }
    }
    else {
      throw new Error("");

    }
  }, [props.required]);

  const clear = useCallback(() => {
    setValue(new Date());
    setValid(true);
  }, [])

  useEffect(() => {
    registerField({
      validate,
      ref: ref.current,
      name: fieldName,
      path: "value",
      clear
    });
  }, [clear, fieldName, registerField, validate]);

  useEffect(() => {
    if (defaultValue) {
      const value = new Date(defaultValue)
      setValue(value);
      ref.current.value = value;
    }
  }, [defaultValue]);

  const handleChange = useCallback((valor) => {
    ref.current.value = value;
    if (!valid) {
      validate();
    }
    setValue(valor);
  }, [value, valid, validate]);

  return (
    <KeyboardDatePicker
      defaultChecked={false}
      value={value}
      onChange={handleChange}
      format="dd/MM/yyyy"
      error={!valid}
      invalidDateMessage="Formato de data inválido."
      inputRef={inputRef}
      minDateMessage="A data não pode ser antes do que a data mínima."
      maxDateMessage="A data não pode ser depois do que a data máxima."
      {...props}
    />
  );
}

export default memo(DateField);