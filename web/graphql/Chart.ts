import gql from 'graphql-tag';

export const chartsData = gql`
    query chartsData {
        usersCount
        messagesCount
        customersCount
        categoriesCount
        productsCount
        ordersCount
        products {
            id
            name
            price
            inventories {
                qty
            }
        }
        orders {
            total_amount
        }
    }
`;
