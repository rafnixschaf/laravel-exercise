import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { MyButton } from './MyButton';

const meta: Meta<typeof MyButton> = {
    title: 'Atoms/MyButton/MyButton',
    component: MyButton,
    args: {
        children: 'Click me',
    },
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'inherit'],
        },
        disabled: {
            control: 'boolean',
        },
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyButton>;

export const Primary: Story = {
    args: {
        color: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        color: 'secondary',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithClickHandler: Story = {
    args: {
        color: 'primary',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const btn = await canvas.findByRole('button', { name: /click me/i });

        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(1);

        expect(document.activeElement).not.toBe(btn);
    },
};
