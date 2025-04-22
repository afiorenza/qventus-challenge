import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, fn } from '@storybook/test';
import { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { LoginIndicator, type LoginIndicatorProps } from './';

const Login = (args: LoginIndicatorProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-row items-center gap-4">
      <div>
        <input
          className="border p-0.5"
          onChange={event => setValue(event.currentTarget.value)}
          value={value}
        />
      </div>

      <LoginIndicator {...args} value={value} />
    </div>
  );
};

const meta: Meta<typeof LoginIndicator> = {
  component: LoginIndicator,
  beforeEach: async ({ args, mount }) => {
    await mount(<Login {...args} />);
  },
};

export default meta;

type Story = StoryObj<typeof LoginIndicator>;

export const Default = {
  args: {
    onChange: action('change'),
    options: [
      'hasDigit',
      'hasUpperCaseLetter',
      'hasSpecialCharacter',
      'hasNoConsecutiveLetter',
    ],
  },
  play: async ({ args, canvas, step }) => {
    const input = await canvas.findByRole('input');

    await step('It should comply digit validation', async () => {
      await userEvent.type(input, '1');

      await expect(
        (await canvas.findByText('Has a number 0-9')).ariaLabel
      ).toBe('Has a number 0-9 is true');
    });

    await step('It should comply upper case validation', async () => {
      await userEvent.type(input, 'A');

      await expect(
        (await canvas.findByText('Has an uppercase letter')).ariaLabel
      ).toBe('Has an uppercase letter is true');
    });

    await step('It should comply special character validation', async () => {
      await userEvent.type(input, '$');

      await expect(
        (await canvas.findByText('Has a special character !@#$%^&*')).ariaLabel
      ).toBe('Has a special character !@#$%^&* is true');
    });

    await expect(args.onChange).toHaveBeenCalledWith({
      isValid: true,
      failedRules: [],
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
        isValid: true,
        failedRules: [],
      });
    });
  },
} satisfies Story;

export const WithOneRuleOnly = {
  args: {
    options: ['hasDigit'],
  },
  play: ({ canvas }) => {
    canvas.findAllByAltText;
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
