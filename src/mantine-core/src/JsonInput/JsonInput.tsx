import React, { forwardRef, useState } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { DefaultProps, useComponentDefaultProps } from '@mantine/styles';
import { validateJson } from './validate-json/validate-json';
import { Textarea, TextareaProps } from '../Textarea';
import { TextInputStylesNames } from '../TextInput';
import useStyles from './JsonInput.styles';

export type JsonInputStylesNames = TextInputStylesNames;

export interface JsonInputProps
  extends DefaultProps<JsonInputStylesNames>,
    Omit<TextareaProps, 'onChange'> {
  /** Value for controlled input */
  value?: string;

  /** Default value for uncontrolled input */
  defaultValue?: string;

  /** onChange value for controlled input */
  onChange?(value: string): void;

  /** Format json on blur */
  formatOnBlur?: boolean;

  /** Error message shown when json is not valid */
  validationError?: React.ReactNode;
}

const defaultProps: Partial<JsonInputProps> = {
  formatOnBlur: false,
  size: 'sm',
};

export const JsonInput = forwardRef<HTMLTextAreaElement, JsonInputProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    error,
    formatOnBlur,
    size,
    validationError,
    classNames,
    unstyled,
    readOnly,
    ...others
  } = useComponentDefaultProps('JsonInput', defaultProps, props);

  const { classes, cx } = useStyles({ size }, { name: 'JsonInput', unstyled });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange,
  });

  const [valid, setValid] = useState(validateJson(_value));

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    typeof onFocus === 'function' && onFocus(event);
    setValid(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    typeof onBlur === 'function' && onBlur(event);
    const isValid = validateJson(event.currentTarget.value);
    formatOnBlur && !readOnly;
    isValid &&
      event.currentTarget.value.trim() !== '' &&
      setValue(JSON.stringify(JSON.parse(event.currentTarget.value), null, 2));
    setValid(isValid);
  };

  return (
    <Textarea
      value={_value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={valid ? error : validationError || true}
      __staticSelector="JsonInput"
      classNames={{ ...classNames, input: cx(classes.input, classNames?.input) }}
      autoComplete="nope"
      ref={ref}
      unstyled={unstyled}
      readOnly={readOnly}
      {...others}
    />
  );
});

JsonInput.displayName = '@mantine/core/JsonInput';
