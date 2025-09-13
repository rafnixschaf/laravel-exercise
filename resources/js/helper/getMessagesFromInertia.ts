
export const getMessagesFromInertia = (data: Record<string, string>): string  => {
    return Object.values(data).join(' ');
}

//@TODO check if we can get the response type from inertia
export const getMessagesFromInertiaResponse = (response: any): string => {
    return response.props?.flash?.success || '';
}
