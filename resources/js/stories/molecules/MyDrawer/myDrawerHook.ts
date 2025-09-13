import { useMyMediaQuery } from '@/hooks/useMyMediaQuery';
import { logout } from '@/routes';
import { router } from '@inertiajs/react';

export const useMyDrawer = () => {
    const { isMobile } = useMyMediaQuery();
    const handleLogout = () => {
        router.flushAll();
        router.post(logout());
    };

    return {
        handleLogout,
        isMobile,
    };
};
