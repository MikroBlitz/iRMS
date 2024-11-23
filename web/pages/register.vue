<template>
	<div>
		<Head>
			<Title>POS - Create Account</Title>
		</Head>
		<div class="p-5 sm:w-auto max-w-xl m-auto">
			<Card class="w-full p-10 mt-40">
				<NuxtLink to="/">
					<Button variant="destructive">
						Back
					</Button>
				</NuxtLink>
				<p class="text-3xl font-bold text-center pb-8">
					Create Account
				</p>
				<form @submit.prevent="submit">
					<!-- Name -->
					<div>
						<Label
							class="text-gray-500"
							for="name"
						>Name</Label>
						<Input
							id="name"
							v-model="data.name"
							type="text"
							class="block mt-1 w-full"
							:errors="errors.name"
							required
							auto-focus
						/>
					</div>

					<!-- Email Address -->
					<div class="mt-4">
						<Label
							class="text-gray-500"
							for="email"
						>Email</Label>
						<Input
							id="email"
							v-model="data.email"
							type="email"
							class="block mt-1 w-full"
							:errors="errors.email"
							required
						/>
					</div>

					<!-- Password -->
					<div class="mt-4">
						<Label
							class="text-gray-500"
							for="password"
						>Password</Label>
						<Input
							id="password"
							v-model="data.password"
							type="password"
							class="block mt-1 w-full"
							:errors="errors.password"
							required
							auto-complete="new-password"
						/>
					</div>

					<!-- Confirm Password -->
					<div class="mt-4">
						<Label
							class="text-gray-500"
							for="password_confirmation"
						>Confirm Password</Label>
						<Input
							id="password_confirmation"
							v-model="data.password_confirmation"
							type="password"
							class="block mt-1 w-full"
							:errors="errors.password_confirmation"
							required
						/>
					</div>

					<div class="flex items-center justify-end mt-4">
						<NuxtLink
							href="/login"
							class="underline text-sm text-gray-600 hover:text-gray-900"
						>
							Already registered?
						</NuxtLink>

						<Button
							class="ml-3"
							:disabled="inProgress"
						>
							Register
						</Button>
					</div>
				</form>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

const router = useRouter();

const data = reactive({
	email: '',
	name: '',
	password: '',
	password_confirmation: '',
});

const {
	inProgress,
	submit,
	validationErrors: errors,
} = useSubmit(() => register(data), {
	onSuccess: () => router.push('/dashboard'),
});

definePageMeta({
	middleware: ['guest'],
});
</script>
