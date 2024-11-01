import gql from 'graphql-tag';

export const totalUsers = gql`
    query totalUsers {
        usersCount
    }
`;

export const totalCategories = gql`
    query totalCategories {
        categoriesCount
    }
`;

export const totalProducts = gql`
    query totalProducts {
        productsCount
    }
`;

export const totalOrders = gql`
    query totalOrders {
        ordersCount
    }
`;

export const totalInventoryStockValue = gql`
    query {
        products {
            id
            name
            price
            inventories {
                qty
            }
        }
    }
`;

export const totalSales = gql`
    query {
        orders {
            total_amount
        }
    }
`;
