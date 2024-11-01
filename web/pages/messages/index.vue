<template>
    <div>
        <Head>
            <Title>Messenger</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-full mx-auto">
            <MessagesHeader />
            <div class="flex h-screen">
                <div class="xl:w-1/4 w-1/2 border-r border-gray-300 p-2">
                    <div class="flex items-center relative">
                        <span
                            ><Icon
                                name="mdi-search"
                                class="absolute text-gray-900 dark:text-gray-300 left-2 top-2 text-gray-900"
                                size="25"
                        /></span>
                        <input
                            placeholder="Search Contacts"
                            class="pl-8 py-2 w-full rounded-xl dark:bg-gray-900 text-gray-900 outline-none"
                        />
                    </div>
                    <h2 class="text-xl font-bold mb-4">Contacts</h2>
                    <ul class="space-y-2">
                        <li
                            v-for="contact in contacts"
                            :key="contact.id"
                            :class="[
                                'cursor-pointer p-2 rounded',
                                selectedContact?.id === contact.id
                                    ? 'bg-gray-200'
                                    : 'hover:bg-gray-100',
                            ]"
                            @click="selectContact(contact)"
                        >
                            {{ contact.name }}
                        </li>
                    </ul>
                </div>
                <div class="w-2/3 p-4 flex flex-col">
                    <h2 class="text-xl font-bold mb-4">
                        {{
                            selectedContact
                                ? `Chat with ${selectedContact.name}`
                                : 'Select a contact'
                        }}
                    </h2>
                    <div
                        v-if="selectedContact"
                        class="flex-grow overflow-y-auto mb-4"
                    >
                        <div
                            v-for="message in messages"
                            :key="message.id"
                            class="mb-2"
                        >
                            <span class="font-bold">{{ message.sender }}:</span>
                            {{ message.text }}
                        </div>
                    </div>
                    <div v-if="selectedContact" class="flex">
                        <input
                            v-model="newMessage"
                            placeholder="Type a message..."
                            class="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @keyup.enter="sendMessage"
                        />
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @click="sendMessage"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

definePageMeta({
    layout: 'messages',
});

interface Contact {
    id: number;
    name: string;
}

interface Message {
    id: number;
    sender: string;
    text: string;
}

const contacts = ref<Contact[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]);

const selectedContact = ref<Contact | null>(null);
const messages = ref<Message[]>([]);
const newMessage = ref('');

const selectContact = (contact: Contact) => {
    selectedContact.value = contact;
    // In a real app, you'd fetch messages for the selected contact here
    messages.value = [
        { id: 1, sender: contact.name, text: 'Hello!' },
        { id: 2, sender: 'You', text: 'Hi there!' },
    ];
};

const sendMessage = () => {
    if (newMessage.value.trim() && selectedContact.value) {
        messages.value.push({
            id: messages.value.length + 1,
            sender: 'You',
            text: newMessage.value.trim(),
        });
        newMessage.value = '';
    }
};
</script>
