import gql from 'graphql-tag';
import { ProductFragment } from '~/graphql/Fragment';

export const productFilter = gql`
    query productFilter($search: String) {
        products(search: $search) {
            id
            name
        }
    }
`;

export const products = gql`
    query products {
        products {
            ...product
        }
    }
    ${ProductFragment}
`;

export const productsPaginate = gql`
    query productsPaginate($first: Int!, $page: Int) {
        productsPaginate(first: $first, page: $page) {
            data {
                ...product
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${ProductFragment}
`;

export const upsertProduct = gql`
    mutation upsertProduct($input: ProductInput!) {
        upsertProduct(input: $input) {
            ...product
        }
    }
    ${ProductFragment}
`;

export const deleteProduct = gql`
    mutation deleteProduct($id: [ID!]) {
        deleteProduct(id: $id) {
            id
        }
    }
`;

export const restoreProduct = gql`
    mutation restoreProduct($id: [ID!]) {
        restoreProduct(id: $id) {
            id
        }
    }
`;
