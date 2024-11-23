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
					class="sm:w-80 w-full border-transparent sm:border-0 rounded-none md:rounded-r-lg"
				>
					<SheetHeader>
						<SheetTitle>
							<div class="flex items-center justify-between">
								<div class="flex items-end gap-2">
									<div>
										<img
											class="size-10"
											src="@/assets/application_logo.svg"
											alt="logo"
										>
									</div>
									<p class="font-bold text-xl">
										APP
									</p>
								</div>
							</div>
						</SheetTitle>
						<SheetDescription>
							<NuxtLink
								v-for="(link, index) in links"
								:key="index"
								:to="link.path"
								class="flex w-full items-center gap-4 px-4 py-3 transition duration-300 rounded-md cursor-pointer hover:bg-accent dark:hover:bg-primary"
								@click="openAppSidebar = false"
							>
								<Icon
									size="25"
									:name="link.icon"
									:class="link.iconColor"
								/>
								<span
									class="text-sm font-medium"
									:class="link.textColor"
								>{{ link.title }}</span>
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
const userRole: ComputedRef<any> = computed(() => auth.user.role);

const { links } = useLinks(userRole.value);
</script>
