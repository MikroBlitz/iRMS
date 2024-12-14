import gql from 'graphql-tag';

export const logFragment = gql`
    fragment log on Log {
        id
        ip_address
        browser
        event
        user {
            id
            name
        }
        created_at
        deleted_at
        updated_at
    }
`;

export const userFragment = gql`
    fragment user on User {
        id
        first_name
        middle_name
        last_name
        name
        email
        password
        role
        created_at
        updated_at
        deleted_at
    }
`;

export const OrderItemFragment = gql`
    fragment orderItem on OrderItem {
        id
        order_id
        product_id
        product {
            id
            name
        }
        qty
        total_amount
        created_at
        updated_at
        deleted_at
    }
`;

export const CategoryFragment = gql`
    fragment category on Category {
        id
        name
        slug
        created_at
        updated_at
        deleted_at
    }
`;

export const ProductFragment = gql`
    fragment product on Product {
        id
        name
        image
        category_id
        category {
            id
            name
        }
        description
        sku
        price
        inventories {
            id
            qty
            location
        }
        #                order_items {
        #                    ...orderItem
        #                }
        created_at
        updated_at
        deleted_at
    }
`;

export const InventoryFragment = gql`
    fragment inventory on Inventory {
        id
        product_id
        product {
            id
            name
        }
        qty
        location
        created_at
        updated_at
        deleted_at
    }
`;

export const CustomerFragment = gql`
    fragment customer on Customer {
        id
        user {
            id
            first_name
            middle_name
            last_name
            name
        }
        user_id
        name
        phone
        address
        points
        orders {
            id
            customer_id
            total_amount
            payment
            status
        }
        created_at
        updated_at
        deleted_at
    }
`;

export const OrderFragment = gql`
    fragment order on Order {
        id
        cash_tendered
        change
        date
        payment
        status
        total_amount
        transaction_number
        customer_guest
        order_items {
            ...orderItem
        }
        #        customer_id
        #        customer {
        #            id
        #            name
        #            user {
        #                id
        #                first_name
        #                middle_name
        #                last_name
        #                name
        #            }
        #        }
        created_at
        updated_at
        deleted_at
    }
    ${OrderItemFragment}
`;
