import gql from 'graphql-tag';
import { userFragment } from '~/graphql/Fragment';

export const userFilter = gql`
    query userFilter($search: String) {
        users(search: $search) {
            id
            complete_name
            email
        }
    }
    ${userFragment}
`;

export const usersPaginate = gql`
    query usersPaginate($first: Int!, $page: Int) {
        usersPaginate(first: $first, page: $page) {
            data {
                ...user
            }
            paginatorInfo {
                count
                currentPage
            }
        }
    }
    ${userFragment}
`;

export const upsertUser = gql`
    mutation upsertUser($input: UserInput!) {
        upsertUser(input: $input) {
            ...user
        }
    }
    ${userFragment}
`;

export const deleteUser = gql`
    mutation deleteUser($id: [ID!]) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export const restoreUser = gql`
    mutation restoreUser($id: [ID!]) {
        restoreUser(id: $id) {
            id
        }
    }
`;
