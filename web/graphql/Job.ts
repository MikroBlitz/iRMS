import gql from 'graphql-tag';
import { jobFragment } from '~/graphql/Fragment';

export const jobsPaginate = gql`
    query jobsPaginate($first: Int!, $page: Int) {
        jobsPaginate(first: $first, page: $page) {
            data {
                ...job
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${jobFragment}
`;
