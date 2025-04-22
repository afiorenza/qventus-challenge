import { useEffect, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';
import {
  type OptionNames,
  options as availableOptions,
} from '../utils/validators';

type Option = {
  option: OptionNames;
  value: string;
};

export type LoginIndicatorProps = {
  className?: string;
  onChange?: ({
    isValid,
    failedRules,
  }: {
    isValid: boolean;
    failedRules: OptionNames[];
  }) => void;
  options: OptionNames[];
  value: string;
};

const Option = ({ option, value }: Option) => {
  const { label, validator } = availableOptions[option];
  const isValid = validator(value);

  return (
    <li
      className="flex flex-row items-center gap-2"
      key={label}
      aria-label={`${label} is ${validator(value)}`}
    >
      {isValid ? (
        <CheckCircleIcon className="size-8 fill-green-600" />
      ) : (
        <XCircleIcon className="size-8 fill-amber-800" />
      )}

      {label}
    </li>
  );
};

const LoginIndicator = ({
  className,
  onChange,
  options = [],
  value,
}: LoginIndicatorProps) => {
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
      isValid,
      failedRules,
    };
  }, [options, value]);

  useEffect(() => {
    if (onChange) onChange(result);
  }, [result.isValid, result.failedRules.length]);

  return (
    <ul className={classNames('flex flex-col items-start', className)}>
      {options.length > 0 && (
        <>
          {options.map(option => (
            <Option key={option} option={option} value={value} />
          ))}
        </>
      )}
    </ul>
  );
};

export default LoginIndicator;
