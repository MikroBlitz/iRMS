import gql from 'graphql-tag';
import { OrderItemFragment } from '~/graphql/Fragment';

export const orderItemFilter = gql`
    query orderItemFilter($search: String) {
        orderItems(search: $search) {
            id
        }
    }
`;

export const orderItems = gql`
    query orderItems {
        orderItems {
            ...orderItem
        }
    }
    ${OrderItemFragment}
`;

export const orderItemsPaginate = gql`
    query orderItemsPaginate($first: Int!, $page: Int) {
        orderItemsPaginate(first: $first, page: $page) {
            data {
                ...orderItem
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${OrderItemFragment}
`;

export const upsertOrderItem = gql`
    mutation upsertOrderItem($input: OrderItemInput!) {
        upsertOrderItem(input: $input) {
            ...orderItem
        }
    }
    ${OrderItemFragment}
`;

export const deleteOrderItem = gql`
    mutation deleteOrderItem($id: [ID!]) {
        deleteOrderItem(id: $id) {
            id
        }
    }
`;

export const restoreOrderItem = gql`
    mutation restoreOrderItem($id: [ID!]) {
        restoreOrderItem(id: $id) {
            id
        }
    }
`;
