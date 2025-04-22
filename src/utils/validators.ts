export const options = {
  hasDigit: {
    label: 'Has a number 0-9',
    validator: (value: string) => /\d/.test(value),
  },
  hasUpperCaseLetter: {
    label: 'Has an uppercase letter',
    validator: (value: string) => /[A-Z]/.test(value),
  },
  hasSpecialCharacter: {
    label: 'Has a special character !@#$%^&*',
    validator: (value: string) => /[!@#$%^&*]/.test(value),
  },
  hasNoConsecutiveLetter: {
    label: 'Has NO consecutive letters',
    validator: (value: string) => /^(?!.*([a-zA-Z])\1).+$/.test(value),
  },
} as const;

export type OptionNames = keyof typeof options;
