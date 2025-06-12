<template>
	<template v-if="!selectedContact">
		<div class="w-full h-full items-center justify-center flex-col flex">
			<SpinnerBlocks class="size-8" />
			<span class="text-xl">Start messaging.</span>
		</div>
	</template>

	<div
		v-else
		class="w-full p-3 flex flex-col"
	>
		<h2 class="text-xl mb-4">
			{{ selectedContact ? `Chat with ${selectedContact.name}` : '' }}
		</h2>
		<div
			v-if="selectedContact && messages.length"
			ref="messagesContainer"
			class="flex-grow overflow-y-auto mb-4 p-2"
		>
			<div
				v-for="message in messages"
				:key="message.id || message.tempId"
				class="flex gap-2 mb-2.5 items-start"
				:class="{
					'justify-end': message.sender_id === currentUser || message.sender === currentUser,
					'justify-start': message.sender_id !== currentUser && message.sender !== currentUser,
				}"
			>
				<!-- Sender icon only for received messages -->
				<span
					v-if="message.sender_id !== currentUser && message.sender !== currentUser"
					class="size-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm shrink-0 mt-1"
				>
					{{ (message.sender_id || message.sender).toString().charAt(0).toUpperCase() }}
				</span>

				<!-- Message bubble with timestamp -->
				<div
					:class="{
						'text-right': message.sender_id === currentUser || message.sender === currentUser,
						'text-left': message.sender_id !== currentUser && message.sender !== currentUser,
					}"
				>
					<span
						class="px-3 py-2 rounded-2xl flex items-center break-words overflow-hidden max-w-[500px]"
						:class="{
							'opacity-50': message.sending,
							'bg-primary text-white rounded-br-none':
								message.sender_id === currentUser || message.sender === currentUser,
							'bg-secondary text-black rounded-tl-none':
								message.sender_id !== currentUser && message.sender !== currentUser,
						}"
					>
						{{ message.message }}
						<SpinnerRotatingCircle
							v-show="message.sending"
							class="ml-2"
						/>
					</span>
					<!-- Time ago display -->
					<div
						class="text-xs text-gray-500 mt-1 px-1"
						:class="{
							'text-right': message.sender_id === currentUser || message.sender === currentUser,
							'text-left': message.sender_id !== currentUser && message.sender !== currentUser,
						}"
					>
						{{ formatTimeAgo(message.created_at) }}
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="selectedContact && !messages.length"
			class="flex-grow flex items-center justify-center"
		>
			<p class="text-xl text-destructive">
				No messages yet
			</p>
		</div>

		<div
			v-if="selectedContact"
			class="relative"
		>
			<Button
				variant="ghost"
				class="hover:bg-transparent absolute opacity-50 left-0 top-1"
			>
				<Icon
					name="mdi:email-send"
					size="25"
				/>
			</Button>
			<Input
				v-model="newMessage"
				placeholder="Type a message..."
				class="p-3 px-12 w-full rounded outline-none bg-secondary dark:bg-primary"
				@keyup.enter="sendMessage"
			/>
			<Button
				class="hover:bg-transparent absolute right-0 top-1"
				variant="ghost"
				@click.prevent="sendMessage"
			>
				<Icon
					class="hover:text-accent"
					name="mdi-send"
					size="25"
				/>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getMessages, upsertMessage } from '~/graphql/Message';
import { formatTimeAgo } from '~/utils/dataHelper';

const auth = useAuth();
const messages: any = inject('messages');
const selectContact: any = inject('selectContact');
const selectedContact: any = inject('selectedContact');
const currentUser = ref(auth.user.id);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const lastPage = ref<number>(1);

const sendMessage = async () => {
	const { mutate } = useMutation(upsertMessage);
	const { refetch, result } = useQuery(getMessages, {
		first: 100,
		id: selectedContact.value?.id,
		page: lastPage.value,
		receiver: selectedContact.value?.id,
		sender: currentUser.value,
	});
	lastPage.value = result.value?.messages.paginatorInfo.lastPage;

	try {
		const trimmedMessage = newMessage.value.trim();

		if (trimmedMessage) {
			// Create temporary message for immediate UI feedback
			const tempMessage = {
				created_at: new Date().toISOString(),
				id: null,
				message: trimmedMessage,
				receiver_id: selectedContact.value?.id,
				sender_id: currentUser.value,
				sending: true,
				tempId: Date.now(),
			};

			messages.value.push(tempMessage);
			newMessage.value = '';

			// Send the actual message
			await mutate({
				input: {
					message: trimmedMessage,
					receiver: { connect: selectedContact.value?.id },
					sender: { connect: currentUser.value },
				},
			});

			// Remove the temporary message and refetch to get the real data
			const tempIndex = messages.value.findIndex((msg: any) => msg.tempId === tempMessage.tempId);
			if (tempIndex !== -1) {
				messages.value.splice(tempIndex, 1);
			}

			// Refetch messages to get the latest data with proper IDs
			const { data } = await refetch();
			messages.value = data.messages.data.map((msg: any) => ({
				created_at: msg.created_at,
				id: msg.id,
				message: msg.message,
				receiver_id: msg.receiver_id,
				sender_id: msg.sender_id,
				sending: false,
			}));
		}
	}
	catch (e) {
		console.error(e);
		// Remove the temporary message on error
		const tempIndex = messages.value.findIndex((msg: any) => msg.sending);
		if (tempIndex !== -1) {
			messages.value.splice(tempIndex, 1);
		}
	}
};

watch(
	() => messages.value.length,
	() => {
		nextTick(() => {
			if (messagesContainer.value)
				messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
		});
	},
);

onMounted(() => {
	if (messagesContainer.value)
		messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
});
</script>
