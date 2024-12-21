<template>
    <div class="flex h-screen max-h-[calc(100vh-4.1rem)] p-0.5">
        <MessagesContact
            :contacts="contacts"
            :select-contact="selectContact"
            :selected-contact="selectedContact"
        />

        <MessagesBody v-if="!isMobile" />
    </div>
</template>

<script setup lang="ts">
import { userFilter } from '~/graphql/User';
import type { Contact } from '~/types/codegen/graphql';
import { getMessages } from '~/graphql/Message';

const contacts = ref<any>([]);
const selectedContact = ref<any>();
const messages = ref<any>([]);
const isMobile = inject('isMobile');

const { result: usersResult } = useQuery(userFilter);
onMounted(() => (contacts.value = usersResult.value.users));

const selectContact = async (contact: Contact) => {
    selectedContact.value = contact;
    const { result: messagesResult } = useQuery(getMessages, {
        id: contact.id,
    });
    messages.value = messagesResult.value.messages.map(
        (msg: { id: number; sender: { name: string }; text: string }) => ({
            id: msg.id,
            sender: msg.sender.name,
            text: msg.text,
        }),
    );
};

provide('messages', messages);
provide('selectContact', selectContact);
provide('selectedContact', selectedContact);
</script>
