import type { Meta, StoryObj } from '@storybook/react-vite';
import { NetworkStatus } from './NetworkStatus';

const meta: Meta<typeof NetworkStatus> = {
    title: 'Atoms/NetworkStatus',
    component: NetworkStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NetworkStatus>;

export const Default: Story = {
    name: 'Default',
    render: () => <NetworkStatus />,
};
