import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, expect } from '@storybook/test';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/16/solid';

import { action } from '@storybook/addon-actions';

import { Login } from './';

const meta: Meta<typeof Login> = {
  component: Login,
  args: {
    onChange: action('change'),
    options: [
      'hasDigit',
      'hasUpperCaseLetter',
      'hasSpecialCharacter',
      'hasNoConsecutiveLetter',
    ],
  },
  argTypes: {
    options: {
      control: 'inline-check',
      options: [
        'hasDigit',
        'hasUpperCaseLetter',
        'hasSpecialCharacter',
        'hasNoConsecutiveLetter',
      ],
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  beforeEach: async ({ args, mount }) => {
    await mount(<Login {...args} />);
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default = {
  play: async ({ args, canvas, step }) => {
    const input = await canvas.findByRole('textbox');

    await step('It should comply digit validation', async () => {
      await userEvent.type(input, '1');

      await expect(
        (await canvas.findByText('Has a number 0-9')).ariaLabel
      ).toBe('Has a number 0-9 is true');

      await expect(args.onChange).toHaveBeenCalledWith({
        failedRules: ['hasUpperCaseLetter', 'hasSpecialCharacter'],
        isValid: false,
        value: '1',
      });
    });

    await step('It should comply upper case validation', async () => {
      await userEvent.type(input, 'A');

      await expect(
        (await canvas.findByText('Has an uppercase letter')).ariaLabel
      ).toBe('Has an uppercase letter is true');

      await expect(args.onChange).toHaveBeenCalledWith({
        failedRules: ['hasSpecialCharacter'],
        isValid: false,
        value: '1A',
      });
    });

    await step('It should comply special character validation', async () => {
      await userEvent.type(input, '$');

      await expect(
        (await canvas.findByText('Has a special character !@#$%^&*')).ariaLabel
      ).toBe('Has a special character !@#$%^&* is true');

      await expect(args.onChange).toHaveBeenCalledWith({
        failedRules: [],
        isValid: true,
        value: '1A$',
      });
    });

    await step(
      'It should fail due double consecutive letter validation',
      async () => {
        await userEvent.type(input, 'AA');

        await expect(
          (await canvas.findByText('Has NO consecutive letters')).ariaLabel
        ).toBe('Has NO consecutive letters is false');

        await expect(args.onChange).toHaveBeenCalledWith({
          isValid: false,
          failedRules: ['hasNoConsecutiveLetter'],
          value: '1A$AA',
        });
      }
    );

    await step('It should be able to correct the error', async () => {
      await userEvent.click(input);

      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('{Backspace}');

      await expect(
        (await canvas.findByText('Has NO consecutive letters')).ariaLabel
      ).toBe('Has NO consecutive letters is true');

      await expect(args.onChange).toHaveBeenCalledWith({
        failedRules: [],
        isValid: true,
        value: '1A$',
      });
    });
  },
} satisfies Story;

export const WithOneRuleOnly = {
  args: {
    options: ['hasDigit'],
  },
} satisfies Story;

export const WithCustomStyle = {
  args: {
    options: [
      'hasDigit',
      'hasUpperCaseLetter',
      'hasSpecialCharacter',
      'hasNoConsecutiveLetter',
    ],
    className: 'flex-row',
  },
} satisfies Story;

export const WithPlaceholder = {
  args: {
    placeholder: 'I am a custom placeholder',
  },
  play: async ({ args, canvas }) => {
    await expect(
      await canvas.findByPlaceholderText(args.placeholder!)
    ).toBeVisible();
  },
} satisfies Story;

export const WithCustomIcons = {
  args: {
    icons: {
      valid: <PlusCircleIcon className="size-6 fill-yellow-300" />,
      invalid: <MinusCircleIcon className="size-6 fill-red-400" />,
    },
  },
} satisfies Story;

export const WithCustomIconSize = {
  args: {
    iconSize: 'lg',
  },
} satisfies Story;
