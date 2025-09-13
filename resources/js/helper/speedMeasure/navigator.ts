
export function checkNavigatorConnectionSpeed(): number|undefined {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection) {
            return connection?.downlink;
        }
    }
}
