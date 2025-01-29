<template>
    <template v-if="!selectedContact">
        <div class="w-full h-full items-center justify-center flex-col flex">
            <SpinnerBlocks class="size-8" />
            <span class="text-xl">Start messaging.</span>
        </div>
    </template>

    <div v-else-if="selectContact" class="w-full p-3 flex flex-col">
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
                :key="message.id"
                :class="{
                    'flex gap-2 mb-2.5 items-center': true,
                    'justify-end': message.sender === currentUser,
                    'justify-start': message.sender !== currentUser,
                }"
            >
                <!-- Sender Icon -->
                <span
                    v-if="message.sender !== currentUser"
                    class="size-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm"
                >
                    {{ message.sender.charAt(0).toUpperCase() }}
                </span>

                <!-- Sender Name and Message -->
                <div
                    :class="{
                        'text-right': message.sender === currentUser,
                        'text-left': message.sender !== currentUser,
                    }"
                >
                    <span
                        :class="{
                            'opacity-50': message.sending,
                            'bg-accent px-3 py-2 rounded-2xl': true,
                            'bg-primary rounded-br-none text-white flex w-full max-w-[500px] text-left break-words overflow-hidden':
                                message.sender === currentUser,
                            'bg-secondary w-full text-foreground max-w-[500px] text-left break-words overflow-hidden rounded-tl-none text-black flex':
                                message.sender !== currentUser,
                        }"
                        class="flex items-center"
                    >
                        {{ message.message }}
                        <SpinnerRotatingCircle
                            v-show="message.sending"
                            class="ml-2"
                        />
                    </span>
                </div>
            </div>
        </div>

        <div
            v-if="selectedContact && !messages.length"
            class="flex-grow flex items-center justify-center"
        >
            <p class="text-xl text-destructive">No messages yet</p>
        </div>

        <div v-if="selectedContact" class="relative">
            <Button
                variant="ghost"
                class="hover:bg-transparent absolute opacity-50 left-0 top-1"
            >
                <Icon name="mdi:email-send" size="25" />
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
                <Icon class="hover:text-accent" name="mdi-send" size="25" />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getMessages, upsertMessage } from '~/graphql/Message';

const messages: any = inject('messages');
const selectContact: any = inject('selectContact');
const selectedContact: any = inject('selectedContact');
const currentUser: any = inject('currentUser');
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
            const newMsg = {
                sender: currentUser.value,
                sending: true,
                text: trimmedMessage,
            };
            messages.value.push(newMsg);

            await mutate({
                input: {
                    message: trimmedMessage,
                    receiver: { connect: selectedContact.value?.id },
                    sender: { connect: currentUser.value },
                },
            });

            newMsg.sending = false;
            newMessage.value = '';

            const { data } = await refetch();
            messages.value = data.messages.data.map((msg: any) => ({
                created_at: msg.created_at,
                id: msg.id,
                message: msg.message,
                receiver: msg.receiver_id,
                sender: msg.sender_id,
            }));
        }
    } catch (e) {
        console.error(e);
    }
};

watch(
    () => messages.value.length,
    () => {
        nextTick(() => {
            if (messagesContainer.value)
                messagesContainer.value.scrollTop =
                    messagesContainer.value.scrollHeight;
        });
    },
);

onMounted(() => {
    if (messagesContainer.value)
        messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
});
</script>
