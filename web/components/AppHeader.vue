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
                        <Dropdown align="right">
                            <template #trigger>
                                <span
                                    class="flex items-center text-sm font-medium text-foreground focus:outline-none transition duration-250 ease-in-out"
                                >
                                    <div>
                                        {{
                                            auth.user.name
                                                ? auth.user.name
                                                : 'Guest'
                                        }}
                                    </div>

                                    <Icon
                                        name="mdi:arrow-down-drop"
                                        size="18"
                                        class="ml-0.5"
                                    />
                                </span>
                            </template>
                            <!-- Authentication  -->
                            <DropdownButton class="hover:bg-transparent">
                                <span
                                    class="flex items-center gap-1 justify-center"
                                    @click.prevent="logout"
                                >
                                    <Icon
                                        name="ri:logout-circle-line"
                                        size="25"
                                    />
                                    Logout
                                </span>
                            </DropdownButton>
                        </Dropdown>
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
const auth = useAuth();

const logout = () => {
    try {
        auth.logout();
        toasts('Logging out.', {
            type: 'info',
            position: 'bottom-right',
            autoClose: 1000,
            transition: 'zoom',
        });
        setTimeout(() => {
            navigateTo('/login');
        }, 2000);
    } catch (error) {
        console.log(error);
    }
};
</script>
