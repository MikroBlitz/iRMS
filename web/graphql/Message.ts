export const getMessages = gql`
    query messages($first: Int!, $page: Int, $sender: Mixed, $receiver: Mixed) {
        messages(
            first: $first
            page: $page
            where: {
                AND: [
                    { column: SENDER_ID, operator: EQ, value: $sender }
                    { column: RECEIVER_ID, operator: EQ, value: $receiver }
                ]
            }
        ) {
            data {
                id
                sender_id
                receiver_id
                message
                created_at
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
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
