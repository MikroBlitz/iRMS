import type { LinkItem } from '~/types';

function filterLinks(links: LinkItem[], userRole: number): LinkItem[] {
	return links.filter((link) => {
		return link.roles?.includes(userRole) || link.roles === null;
	});
}

export const sidebarLinks: LinkItem[] = [
	{
		icon: 'mdi:view-dashboard-outline',
		iconColor: 'text-foreground',
		path: '/dashboard',
		textColor: 'text-foreground',
		title: 'Dashboard',
		// roles: [0, 1, 2, 3], // TODO: uncomment for production
		roles: null,
	},
	{
		icon: 'solar:user-circle-linear',
		iconColor: 'text-foreground',
		path: '/users',
		textColor: 'text-foreground',
		title: 'Users',
		// roles: [1],
		roles: null,
	},
	{
		icon: 'solar:shop-linear',
		iconColor: 'text-foreground',
		path: '/products',
		textColor: 'text-foreground',
		title: 'Products',
		// roles: [1, 2, 3],
		roles: null,
	},
	{
		icon: 'solar:filter-outline',
		iconColor: 'text-foreground',
		path: '/categories',
		textColor: 'text-foreground',
		title: 'Categories',
		// roles: [1, 2, 3],
		roles: null,
	},
	{
		icon: 'solar:box-minimalistic-linear',
		iconColor: 'text-foreground',
		path: '/inventories',
		textColor: 'text-foreground',
		title: 'Inventories',
		// roles: [1, 2, 3],
		roles: null,
	},
	{
		icon: 'solar:cart-outline',
		iconColor: 'text-foreground',
		path: '/orders',
		textColor: 'text-foreground',
		title: 'Orders',
		// roles: [1, 2, 3],
		roles: null,
	},
	{
		icon: 'solar:user-hand-up-linear',
		iconColor: 'text-foreground',
		path: '/customers',
		textColor: 'text-foreground',
		title: 'Customers',
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
		icon: 'solar:chat-round-line-linear',
		iconColor: 'text-foreground',
		path: '/messages',
		textColor: 'text-foreground',
		title: 'Messages',
		// roles: [0, 1, 2, 3],
		roles: null,
	},
	{
		icon: 'mdi:monitor-dashboard',
		iconColor: 'text-foreground',
		path: '/pos',
		textColor: 'text-foreground',
		title: 'Point of Sale',
		// roles: [1, 2, 3],
		roles: null,
	},
	{
		icon: 'solar:settings-linear',
		iconColor: 'text-foreground',
		path: '/settings',
		textColor: 'text-foreground',
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
