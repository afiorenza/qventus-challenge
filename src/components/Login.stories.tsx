import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, fn } from '@storybook/test';

import Login from './Login';

const meta: Meta<typeof Login> = {
  component: Login,
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default = {
  args: {},
  play: async ({ mount, args }) => {
    const canvas = await mount(<Login {...args} />);

    await expect(await canvas.findByText('Login')).toBeVisible();
  },
} satisfies Story;
