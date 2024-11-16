<template>
    <div>
        <nav class="bg-primary m-0">
            <!-- Primary Navigation Menu  -->
            <div class="max-w-full mx-auto">
                <div class="flex items-center justify-between h-14">
                    <div class="flex ml-3">
                        <AppSidebar />
                    </div>
                    <!-- Settings Dropdown  -->
                    <div
                        class="flex items-center h-full bg-secondary pl-6 pr-4 rounded-l-2xl gap-3"
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button class="text-foreground" variant="link">
                                    <span>{{
                                        auth.user.name
                                            ? auth.user.name
                                            : 'Guest'
                                    }}</span>
                                    <Icon
                                        name="solar:alt-arrow-down-bold"
                                        size="20"
                                        class="ml-0.5"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-56">
                                <DropdownMenuLabel> Account </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup
                                    v-for="i in dropdownItems"
                                    :key="i.name"
                                >
                                    <DropdownMenuItem @click.prevent="i.action">
                                        <Icon
                                            :name="i.icon"
                                            size="28"
                                            class="mr-2"
                                        />
                                        <span>{{ i.name }}</span>
                                        <DropdownMenuShortcut>
                                            {{ i.shortcut }}
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ClientOnly>
                            <DisplayMode />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from '~/components/ui/dropdown-menu';

const auth = useAuth();

const dropdownItems = [
    {
        name: 'Settings',
        icon: 'solar:settings-linear',
        action: () => {
            navigateTo('/settings');
        },
        shortcut: '⌘S',
    },
    {
        name: 'Logout',
        icon: 'solar:logout-2-outline',
        action: () => {
            logout();
        },
        shortcut: '⇧⌘Q',
    },
];

const logout = () => {
    try {
        toasts('Logging out.', {
            type: 'info',
            position: 'bottom-right',
            autoClose: 1000,
            transition: 'zoom',
        });
        auth.logout();
    } catch (error) {
        console.log(error);
    }
};
</script>
