import gql from 'graphql-tag';
import { InventoryFragment } from './Fragment';

export const inventoryFilter = gql`
    query inventoryFilter($search: String) {
        inventories(search: $search) {
            id
            qty
            location
        }
    }
`;

export const inventories = gql`
    query inventories {
        inventories {
            ...inventory
        }
    }
    ${InventoryFragment}
`;

export const inventoriesPaginate = gql`
    query inventoriesPaginate($first: Int!, $page: Int) {
        inventoriesPaginate(first: $first, page: $page) {
            data {
                ...inventory
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${InventoryFragment}
`;

export const upsertInventory = gql`
    mutation upsertInventory($input: InventoryInput!) {
        upsertInventory(input: $input) {
            ...inventory
        }
    }
    ${InventoryFragment}
`;

export const deleteInventory = gql`
    mutation deleteInventory($id: [ID!]) {
        deleteInventory(id: $id) {
            id
        }
    }
`;

export const reduceInventory = gql`
    mutation reduceInventory($products: [CartProductQuantityInput!]!) {
        reduceInventory(products: $products) {
            id
            product {
                id
                name
                inventories {
                    qty
                }
            }
        }
    }
`;
