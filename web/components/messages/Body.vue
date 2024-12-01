<template>
    <div class="flex h-screen max-h-[calc(100vh-4.1rem)] p-0.5">
        <div class="xl:w-1/4 w-1/2 border-r border-secondary p-2">
            <div class="flex items-center relative w-full">
                <Icon
                    name="mdi-search"
                    class="absolute left-2 top-2 text-foreground"
                    size="25"
                />
            </div>
            <Input
                type="text"
                placeholder="Search Contacts"
                class="pl-9 py-2 rounded w-full outline-none bg-secondary dark:bg-primary"
            />
            <h2 class="text-xl font-bold border-b border-secondary py-2 mb-2">
                Contacts
            </h2>
            <ul class="space-y-2">
                <li
                    v-for="contact in contacts"
                    :key="contact.id"
                    :class="[
                        'cursor-pointer p-2 rounded',
                        selectedContact?.id === contact.id
                            ? 'bg-secondary'
                            : 'hover:bg-accent',
                    ]"
                    @click="selectContact(contact)"
                >
                    {{ contact.name }}
                </li>
            </ul>
        </div>

        <div class="w-full p-3 flex flex-col">
            <h2 class="text-xl font-bold mb-4">
                {{
                    selectedContact
                        ? `Chat with ${selectedContact.name}`
                        : 'Select a contact'
                }}
            </h2>
            <div
                v-if="selectedContact"
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
                                'bg-accent px-3 py-2 rounded-2xl': true,
                                'bg-primary rounded-br-none text-white flex w-full max-w-[500px] text-left break-words overflow-hidden':
                                    message.sender === currentUser,
                                'bg-secondary w-full text-foreground max-w-[500px] text-left break-words overflow-hidden rounded-tl-none text-black flex':
                                    message.sender !== currentUser,
                            }"
                        >
                            {{ message.text }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="selectedContact" class="relative">
                <Button
                    variant="ghost"
                    class="hover:bg-transparent absolute left-0 top-1"
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
                    @click="sendMessage"
                >
                    <Icon class="hover:text-accent" name="mdi-send" size="25" />
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Contact {
    id: number
    name: string
}

interface Message {
    id: number
    text: string
    sender: string
}

const currentUser = ref('Mak')

const contacts = ref<Contact[]>([
    { id: 1, name: 'Mr. Test' },
    { id: 2, name: 'Minow' },
    { id: 3, name: 'Gin Xi' },
])

const selectedContact = ref<Contact | null>(null)
const messages = ref<Message[]>([])
const newMessage = ref('')

const selectContact = (contact: Contact) => {
    selectedContact.value = contact
    messages.value = [
        { id: 1, sender: contact.name, text: 'Hello World! Quick test' },
        { id: 2, sender: contact.name, text: 'Testing testing testing' },
        {
            id: 3,
            sender: contact.name,
            text: 'Testing testing testing Testing testing testingTesting testing testingTesting testing testing',
        },
        {
            id: 4,
            sender: contact.name,
            text: 'Testing testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testing',
        },
        {
            id: 5,
            sender: contact.name,
            text: 'Testing testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testingTesting testing testing',
        },
        { id: 6, sender: 'Mak', text: 'Messenger is a messenger' },
    ]
}

const sendMessage = () => {
    if (newMessage.value.trim() && selectedContact.value) {
        messages.value.push({
            id: messages.value.length + 1,
            sender: 'Mak',
            text: newMessage.value.trim(),
        })
        newMessage.value = ''
    }
}
</script>
