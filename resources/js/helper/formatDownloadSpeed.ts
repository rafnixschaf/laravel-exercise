

export const formatDownloadSpeed = (speed: number) =>
    `${Number.isNaN(speed) ? 0 : speed} Mbit/s`;
