import {
  type OptionNames,
  options as availableOptions,
} from '../utils/validators';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { ReactElement } from 'react';
import classNames from 'classnames';

const iconSizes = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-12',
} as const;

type IconSizes = keyof typeof iconSizes;

export type OptionProps = {
  icons?: {
    valid: ReactElement;
    invalid: ReactElement;
  };
  iconSize?: IconSizes;
  option: OptionNames;
  value: string;
};

const Option = ({ icons, iconSize = 'md', option, value }: OptionProps) => {
  const { label, validator } = availableOptions[option];
  const isValid = validator(value);
  const size = iconSizes[iconSize];

  const validIcon = icons?.valid ?? (
    <CheckCircleIcon className={classNames('fill-green-600', size)} />
  );
  const invalidIcon = icons?.invalid ?? (
    <XCircleIcon className={classNames('fill-amber-600', size)} />
  );

  return (
    <li
      className="flex flex-row items-center gap-2"
      key={label}
      aria-label={`${label} is ${validator(value)}`}
    >
      {isValid ? validIcon : invalidIcon}

      {label}
    </li>
  );
};

export default Option;
