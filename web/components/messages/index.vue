<template>
    <div class="flex h-screen max-h-[calc(100vh-4.1rem)] p-0.5">
        <MessagesContact
            :contacts="contacts"
            :select-contact="selectContact"
            :selected-contact="selectedContact"
        />
        <MessagesBody v-if="!isMobile && !loading" />
        <div
            v-else-if="!isMobile && loading"
            class="w-full flex items-center justify-center"
        >
            <SpinnerTadpole class="size-16 text-accent" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { userFilter } from '~/graphql/User';
import type { Contact } from '~/types/codegen/graphql';
import { getMessages } from '~/graphql/Message';

const auth = useAuth();
const currentUser = ref(auth.user.id);
const contacts = ref<any>([]);
const selectedContact = ref<any>();
const messages = ref<any>([]);
const isMobile = inject('isMobile');
const lastPage = ref<number>(1);
const loading = ref(false);

const { result: usersResult } = useQuery(userFilter);

const selectContact = async (contact: Contact) => {
    loading.value = true;
    selectedContact.value = contact;

    const { loading: fetchLoading, result: messagesResult } = useQuery(
        getMessages,
        {
            first: 100,
            id: contact.id,
            page: lastPage.value,
            receiver: selectedContact.value.id,
            sender: currentUser.value,
        },
    );

    lastPage.value = messagesResult.value?.messages.paginatorInfo.lastPage;

    watch(
        () => fetchLoading.value,
        (isLoading) => {
            if (!isLoading) {
                messages.value = messagesResult.value.messages.data.map(
                    (data: any) => ({
                        created_at: data.created_at,
                        id: data.id,
                        message: data.message,
                        receiver: data.receiver_id,
                        sender: data.sender_id,
                    }),
                );
                loading.value = false;
            }
        },
        { immediate: true },
    );
};

onMounted(() => (contacts.value = usersResult.value.users));

provide('messages', messages);
provide('selectContact', selectContact);
provide('selectedContact', selectedContact);
provide('currentUser', currentUser);
</script>
