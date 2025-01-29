<template>
    <div
        class="xl:w-[450px] md:w-[350px] w-full border-r border-secondary overflow-y-auto p-2"
    >
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
        <h2 class="text-xl border-b border-secondary py-2 mb-2">Contacts</h2>
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
</template>

<script setup lang="ts">
defineProps({
    contacts: {
        default: {},
        type: Object,
    },
    selectContact: {
        default: () => {},
        type: Function,
    },
    selectedContact: {
        default: {},
        type: Object,
    },
});
</script>
