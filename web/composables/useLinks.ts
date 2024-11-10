import type { LinkItem } from '~/types';

function filterLinks(links: LinkItem[], userRole: number): LinkItem[] {
    return links.filter((link) => {
        return link.roles?.includes(userRole) || link.roles === null;
    });
}

export const sidebarLinks: LinkItem[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'mdi:view-dashboard-outline',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [0, 1, 2, 3], // TODO: uncomment for production
        roles: null,
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'solar:user-circle-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1],
        roles: null,
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'solar:shop-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        title: 'Categories',
        path: '/categories',
        icon: 'solar:filter-outline',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        title: 'Inventories',
        path: '/inventories',
        icon: 'solar:box-minimalistic-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'solar:cart-outline',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'solar:user-hand-up-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    // {
    //     title: 'Jobs',
    //     path: '/jobs',
    //     icon: 'mdi:calendar-check',
    //     textColor: 'text-foreground',
    //     iconColor: 'text-foreground',
    //     // roles: [0, 1, 3],
    //     roles: null,
    // },
    // {
    //     title: 'Online Forms',
    //     path: '/online-forms',
    //     icon: 'mdi:form-select',
    //     textColor: 'text-foreground',
    //     iconColor: 'text-foreground',
    //     // roles: [0, 1, 3],
    //     roles: null,
    // },
    {
        title: 'Messages',
        path: '/messages',
        icon: 'solar:chat-round-line-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [0, 1, 2, 3],
        roles: null,
    },
    {
        title: 'Point of Sale',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
        // roles: [1, 2, 3],
        roles: null,
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: 'solar:settings-linear',
        textColor: 'text-foreground',
        iconColor: 'text-foreground',
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
