import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import {
  type OptionNames,
  options as availableOptions,
} from '../utils/validators';
import Option, { type OptionProps } from './Option';

export type LoginProps = {
  className?: string;
  onChange?: ({
    failedRules,
    isValid,
    value,
  }: {
    failedRules: OptionNames[];
    isValid: boolean;
    value: string;
  }) => void;
  options: OptionNames[];
  placeholder?: string;
} & Partial<Pick<OptionProps, 'iconSize' | 'icons'>>;

const Login = ({
  className,
  onChange,
  options = [],
  placeholder = 'Type your password...',
  ...props
}: LoginProps) => {
  const [value, setValue] = useState('');

  const result = useMemo(() => {
    const results = options.map(option => {
      const { validator } = availableOptions[option];

      return {
        name: option,
        isValid: validator(value),
      };
    });

    const isValid = results.every(({ isValid }) => isValid);
    const failedRules = results
      .filter(({ isValid }) => !isValid)
      .map(({ name }) => name);

    return {
      failedRules,
      isValid,
      value,
    };
  }, [options, value]);

  useEffect(() => {
    if (onChange) onChange(result);
  }, [onChange, result.isValid, result.failedRules.length]);

  return (
    <div className="flex flex-row items-center gap-4">
      <div>
        <input
          className="border p-0.5"
          onChange={event => setValue(event.currentTarget.value)}
          value={value}
          placeholder={placeholder}
        />
      </div>

      <ul className={classNames('flex flex-col items-start', className)}>
        {options.length > 0 && (
          <>
            {options.map(option => (
              <Option {...props} key={option} option={option} value={value} />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Login;
