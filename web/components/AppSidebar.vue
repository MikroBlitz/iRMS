<template>
    <div>
        <ClientOnly>
            <Sheet v-model:open="openAppSidebar">
                <SheetTrigger class="flex items-center justify-center">
                    <Icon
                        name="solar:hamburger-menu-broken"
                        size="35"
                        class="text-gray-100"
                    />
                </SheetTrigger>

                <SheetContent
                    side="left"
                    class="sm:w-80 w-full border-transparent sm:border-0 rounded-none md:rounded-r"
                >
                    <SheetHeader>
                        <SheetTitle>
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-end gap-2">
                                    <div>
                                        <img
                                            class="size-10 ml-4"
                                            src="@/assets/application_logo.svg"
                                            alt="logo"
                                        />
                                    </div>
                                    <span class="font-bold text-3xl">APP</span>
                                </div>
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            <NuxtLink
                                v-for="(link, index) in links"
                                :key="index"
                                :to="link.path"
                                class="flex w-full items-center gap-4 px-4 py-3 transition duration-100 rounded-md cursor-pointer group"
                                :class="{
                                    'bg-primary': route.path.startsWith(
                                        link.path,
                                    ),
                                }"
                                @click="openAppSidebar = false"
                            >
                                <Icon
                                    size="20"
                                    :name="link.icon"
                                    :class="[
                                        'transition duration-100 group-hover:text-accent dark:group-hover:text-accent',
                                        route.path.startsWith(link.path)
                                            ? 'text-accent dark:text-foreground'
                                            : link.iconColor,
                                    ]"
                                />
                                <span
                                    class="font-bold transition duration-100 group-hover:text-accent dark:group-hover:text-accent"
                                    :class="[
                                        'transition duration-100 group-hover:text-accent dark:group-hover:text-accent',
                                        route.path.startsWith(link.path)
                                            ? 'text-accent dark:text-foreground'
                                            : link.textColor,
                                    ]"
                                >
                                    {{ link.title }}
                                </span>
                            </NuxtLink>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import {
    Sheet,
    SheetTitle,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '~/components/ui/sheet';

const openAppSidebar = ref(false);

const auth = useAuth();
const route = useRoute();
const userRole: ComputedRef<any> = computed(() => auth.user.role);

const { links } = useLinks(userRole.value);
</script>
