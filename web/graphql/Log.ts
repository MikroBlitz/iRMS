import gql from 'graphql-tag';
import { logFragment } from '~/graphql/Fragment';

export const logs = gql`
    query logsPaginate($search: String) {
        logsPaginate(search: $search) {
            ...log
        }
    }
    ${logFragment}
`;

export const logsPaginate = gql`
    query logsPaginate($search: String, $first: Int!, $page: Int) {
        logsPaginate(search: $search, first: $first, page: $page) {
            data {
                ...log
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${logFragment}
`;

export const upsertLog = gql`
    mutation upsertLog($input: LogInput!) {
        upsertLog(input: $input) {
            ...log
        }
    }
    ${logFragment}
`;

export const deleteLog = gql`
    mutation deleteLog($id: [ID!]) {
        deleteLog(id: $id) {
            id
        }
    }
`;

export const restoreLog = gql`
    mutation restoreLog($id: [ID!]) {
        restoreLog(id: $id) {
            id
        }
    }
`;
