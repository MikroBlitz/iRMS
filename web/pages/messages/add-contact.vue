<template>
    <div>
        <h2>Send Message</h2>
        <form @submit.prevent="sendMessage">
            <label for="receiver">Receiver:</label>
            <select v-model="selectedReceiverId">
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.name }}
                </option>
            </select>
            <label for="message">Message:</label>
            <textarea v-model="messageText" />
            <button type="submit">Send Message</button>
        </form>
    </div>
</template>

<script setup>
const GET_USERS = gql`
    query {
        users {
            id
            name
        }
    }
`;

const UPSERT_MESSAGE = gql`
    mutation UpsertMessage($input: MessageInput!) {
        upsertMessage(input: $input) {
            id
            sender {
                id
                name
            }
            receiver {
                id
                name
            }
            message
        }
    }
`;

const authStore = useAuth();
const users = ref([]);
const selectedReceiverId = ref(null);
const messageText = ref('');

const { result } = useQuery(GET_USERS);
onMounted(() => {
    users.value = result.value.users;
});

const sendMessage = async () => {
    const { mutate } = useMutation(UPSERT_MESSAGE);
    await mutate({
        input: {
            message: messageText.value,
            receiver: { connect: selectedReceiverId.value },
            sender: { connect: authStore.user.id },
        },
    });
    alert('Message sent successfully');
};
</script>
