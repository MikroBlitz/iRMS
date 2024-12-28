import type { LinkItem } from '~/types';

function filterLinks(links: LinkItem[], userRole: number): LinkItem[] {
    return links.filter((link) => {
        return link.roles?.includes(userRole) || link.roles === null;
    });
}

export const sidebarLinks: LinkItem[] = [
    {
        icon: 'mdi:view-dashboard-outline',
        iconColor: 'text-foreground/80',
        path: '/dashboard',
        textColor: 'text-foreground/80',
        title: 'Dashboard',
        // roles: [0, 1, 2, 3], // TODO: uncomment for production
        roles: null,
    },
    {
        icon: 'solar:user-circle-linear',
        iconColor: 'text-foreground/80',
        path: '/users',
        textColor: 'text-foreground/80',
        title: 'Users',
        // roles: [1],
        roles: null,
    },
    {
        icon: 'solar:shop-linear',
        iconColor: 'text-foreground/80',
        path: '/products',
        textColor: 'text-foreground/80',
        title: 'Products',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'solar:filter-outline',
        iconColor: 'text-foreground/80',
        path: '/categories',
        textColor: 'text-foreground/80',
        title: 'Categories',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'solar:box-minimalistic-linear',
        iconColor: 'text-foreground/80',
        path: '/inventories',
        textColor: 'text-foreground/80',
        title: 'Inventories',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'solar:user-hand-up-linear',
        iconColor: 'text-foreground/80',
        path: '/customers',
        textColor: 'text-foreground/80',
        title: 'Customers',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'mdi:form-select',
        iconColor: 'text-foreground/80',
        path: '/reports',
        textColor: 'text-foreground/80',
        title: 'Reports',
        // roles: [0, 1, 3],
        roles: null,
    },
    {
        icon: 'solar:chat-round-line-linear',
        iconColor: 'text-foreground/80',
        path: '/messages',
        textColor: 'text-foreground/80',
        title: 'Messages',
        // roles: [0, 1, 2, 3],
        roles: null,
    },
    {
        icon: 'solar:cart-outline',
        iconColor: 'text-foreground/80',
        path: '/orders',
        textColor: 'text-foreground/80',
        title: 'Orders',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'mdi:monitor-dashboard',
        iconColor: 'text-foreground/80',
        path: '/pos',
        textColor: 'text-foreground/80',
        title: 'Point of Sale',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        icon: 'solar:settings-linear',
        iconColor: 'text-foreground/80',
        path: '/settings',
        textColor: 'text-foreground/80',
        title: 'Settings',
        // roles: [1, 2, 3],
        roles: null,
    },
];

export default function useLinks(userRole: number) {
    const links = computed<LinkItem[]>(() => {
        return filterLinks(sidebarLinks, userRole);
    });

    return { links };
}
