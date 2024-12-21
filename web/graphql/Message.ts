export const getMessages = gql`
    query getMessages($id: ID!) {
        getMessages(id: $id) {
            id
            message
            sender {
                name
            }
        }
    }
`;

export const upsertMessage = gql`
    mutation upsertMessage($input: MessageInput!) {
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
