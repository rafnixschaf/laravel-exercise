import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LoadingIndicator } from './LoadingIndicator';

const meta: Meta<typeof LoadingIndicator> = {
    title: 'Atoms/LoadingIndicator',
    component: LoadingIndicator,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        isLoading: { control: 'boolean' },
    },
};
export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Visible: Story = {
    args: {
        isLoading: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const progress = await canvas.findByRole('progressbar');
        expect(progress).toBeInTheDocument();
    },
};

export const Hidden: Story = {
    args: {
        isLoading: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const query = canvas.queryByRole('progressbar');
        expect(query).toBeNull();
    },
};
