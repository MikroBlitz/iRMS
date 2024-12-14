/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query categoryFilter($search: String) {\n        categories(search: $search) {\n            id\n            name\n        }\n    }\n": types.CategoryFilterDocument,
    "\n    query categories {\n        categories {\n            ...category\n        }\n    }\n    \n": types.CategoriesDocument,
    "\n    query categoriesPaginate($first: Int!, $page: Int) {\n        categoriesPaginate(first: $first, page: $page) {\n            data {\n                ...category\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.CategoriesPaginateDocument,
    "\n    mutation upsertCategory($input: CategoryInput!) {\n        upsertCategory(input: $input) {\n            ...category\n        }\n    }\n    \n": types.UpsertCategoryDocument,
    "\n    mutation deleteCategory($id: [ID!]) {\n        deleteCategory(id: $id) {\n            id\n        }\n    }\n": types.DeleteCategoryDocument,
    "\n    mutation restoreCategory($id: [ID!]) {\n        restoreCategory(id: $id) {\n            id\n        }\n    }\n": types.RestoreCategoryDocument,
    "\n    query chartsData {\n        usersCount\n        customersCount\n        categoriesCount\n        productsCount\n        ordersCount\n        products {\n            id\n            name\n            price\n            inventories {\n                qty\n            }\n        }\n        orders {\n            total_amount\n        }\n    }\n": types.ChartsDataDocument,
    "\n    query customerFilter($search: String) {\n        customers(search: $search) {\n            id\n        }\n    }\n": types.CustomerFilterDocument,
    "\n    query customers {\n        customers {\n            ...customer\n        }\n    }\n    \n": types.CustomersDocument,
    "\n    query CustomersPaginate($page: Int, $first: Int!, $search: String) {\n        customersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...customer\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.CustomersPaginateDocument,
    "\n    mutation upsertCustomer($input: CustomerInput!) {\n        upsertCustomer(input: $input) {\n            ...customer\n        }\n    }\n    \n": types.UpsertCustomerDocument,
    "\n    mutation deleteCustomer($id: [ID!]!) {\n        deleteCustomer(id: $id) {\n            id\n        }\n    }\n": types.DeleteCustomerDocument,
    "\n    mutation restoreCustomer($id: [ID!]!) {\n        restoreCustomer(id: $id) {\n            id\n        }\n    }\n": types.RestoreCustomerDocument,
    "\n    fragment log on Log {\n        id\n        ip_address\n        browser\n        event\n        user {\n            id\n            name\n        }\n        created_at\n        deleted_at\n        updated_at\n    }\n": types.LogFragmentDoc,
    "\n    fragment user on User {\n        id\n        first_name\n        middle_name\n        last_name\n        name\n        email\n        password\n        role\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.UserFragmentDoc,
    "\n    fragment orderItem on OrderItem {\n        id\n        order_id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        total_amount\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.OrderItemFragmentDoc,
    "\n    fragment category on Category {\n        id\n        name\n        slug\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.CategoryFragmentDoc,
    "\n    fragment product on Product {\n        id\n        name\n        image\n        category_id\n        category {\n            id\n            name\n        }\n        description\n        sku\n        price\n        inventories {\n            id\n            qty\n            location\n        }\n        #                order_items {\n        #                    ...orderItem\n        #                }\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.ProductFragmentDoc,
    "\n    fragment inventory on Inventory {\n        id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        location\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.InventoryFragmentDoc,
    "\n    fragment customer on Customer {\n        id\n        user {\n            id\n            first_name\n            middle_name\n            last_name\n            name\n        }\n        user_id\n        name\n        phone\n        address\n        points\n        orders {\n            id\n            customer_id\n            total_amount\n            payment\n            status\n        }\n        created_at\n        updated_at\n        deleted_at\n    }\n": types.CustomerFragmentDoc,
    "\n    fragment order on Order {\n        id\n        cash_tendered\n        change\n        date\n        payment\n        status\n        total_amount\n        transaction_number\n        customer_guest\n        order_items {\n            ...orderItem\n        }\n        #        customer_id\n        #        customer {\n        #            id\n        #            name\n        #            user {\n        #                id\n        #                first_name\n        #                middle_name\n        #                last_name\n        #                name\n        #            }\n        #        }\n        created_at\n        updated_at\n        deleted_at\n    }\n    \n": types.OrderFragmentDoc,
    "\n    query inventoryFilter($search: String) {\n        inventories(search: $search) {\n            id\n            qty\n            location\n        }\n    }\n": types.InventoryFilterDocument,
    "\n    query inventories {\n        inventories {\n            ...inventory\n        }\n    }\n    \n": types.InventoriesDocument,
    "\n    query inventoriesPaginate($first: Int!, $page: Int) {\n        inventoriesPaginate(first: $first, page: $page) {\n            data {\n                ...inventory\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.InventoriesPaginateDocument,
    "\n    mutation upsertInventory($input: InventoryInput!) {\n        upsertInventory(input: $input) {\n            ...inventory\n        }\n    }\n    \n": types.UpsertInventoryDocument,
    "\n    mutation deleteInventory($id: [ID!]) {\n        deleteInventory(id: $id) {\n            id\n        }\n    }\n": types.DeleteInventoryDocument,
    "\n    mutation reduceInventory($products: [CartProductQuantityInput!]!) {\n        reduceInventory(products: $products) {\n            id\n            product {\n                id\n                name\n                inventories {\n                    qty\n                }\n            }\n        }\n    }\n": types.ReduceInventoryDocument,
    "\n    query logs($search: String) {\n        logs(search: $search) {\n            ...log\n        }\n    }\n    \n": types.LogsDocument,
    "\n    query logsPaginate($search: String, $first: Int!, $page: Int) {\n        logsPaginate(search: $search, first: $first, page: $page) {\n            data {\n                ...log\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.LogsPaginateDocument,
    "\n    mutation upsertLog($input: LogInput!) {\n        upsertLog(input: $input) {\n            ...log\n        }\n    }\n    \n": types.UpsertLogDocument,
    "\n    mutation deleteLog($id: [ID!]) {\n        deleteLog(id: $id) {\n            id\n        }\n    }\n": types.DeleteLogDocument,
    "\n    mutation restoreLog($id: [ID!]) {\n        restoreLog(id: $id) {\n            id\n        }\n    }\n": types.RestoreLogDocument,
    "\n    query orderFilter($search: String) {\n        orders(search: $search) {\n            id\n        }\n    }\n": types.OrderFilterDocument,
    "\n    query orders {\n        orders {\n            ...order\n        }\n    }\n    \n": types.OrdersDocument,
    "\n    query OrdersPaginate($page: Int, $first: Int!, $search: String) {\n        ordersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...order\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.OrdersPaginateDocument,
    "\n    mutation upsertOrder($input: OrderInput!) {\n        upsertOrder(input: $input) {\n            ...order\n        }\n    }\n    \n": types.UpsertOrderDocument,
    "\n    mutation deleteOrder($id: [ID!]!) {\n        deleteOrder(id: $id) {\n            id\n        }\n    }\n": types.DeleteOrderDocument,
    "\n    mutation restoreOrder($id: [ID!]!) {\n        restoreOrder(id: $id) {\n            id\n        }\n    }\n": types.RestoreOrderDocument,
    "\n    query orderItemFilter {\n        orderItems {\n            id\n        }\n    }\n": types.OrderItemFilterDocument,
    "\n    query orderItems {\n        orderItems {\n            ...orderItem\n        }\n    }\n    \n": types.OrderItemsDocument,
    "\n    query orderItemsPaginate($first: Int!, $page: Int) {\n        orderItemsPaginate(first: $first, page: $page) {\n            data {\n                ...orderItem\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.OrderItemsPaginateDocument,
    "\n    mutation upsertOrderItem($input: OrderItemInput!) {\n        upsertOrderItem(input: $input) {\n            ...orderItem\n        }\n    }\n    \n": types.UpsertOrderItemDocument,
    "\n    mutation deleteOrderItem($id: [ID!]) {\n        deleteOrderItem(id: $id) {\n            id\n        }\n    }\n": types.DeleteOrderItemDocument,
    "\n    mutation restoreOrderItem($id: [ID!]) {\n        restoreOrderItem(id: $id) {\n            id\n        }\n    }\n": types.RestoreOrderItemDocument,
    "\n    query productFilter($search: String) {\n        products(search: $search) {\n            id\n            name\n        }\n    }\n": types.ProductFilterDocument,
    "\n    query products {\n        products {\n            ...product\n        }\n    }\n    \n": types.ProductsDocument,
    "\n    query productsPaginate($first: Int!, $page: Int) {\n        productsPaginate(first: $first, page: $page) {\n            data {\n                ...product\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.ProductsPaginateDocument,
    "\n    mutation upsertProduct($input: ProductInput!) {\n        upsertProduct(input: $input) {\n            ...product\n        }\n    }\n    \n": types.UpsertProductDocument,
    "\n    mutation deleteProduct($id: [ID!]) {\n        deleteProduct(id: $id) {\n            id\n        }\n    }\n": types.DeleteProductDocument,
    "\n    mutation restoreProduct($id: [ID!]) {\n        restoreProduct(id: $id) {\n            id\n        }\n    }\n": types.RestoreProductDocument,
    "\n    query userFilter($search: String) {\n        users(search: $search) {\n            id\n            name\n            email\n        }\n    }\n": types.UserFilterDocument,
    "\n    query users {\n        users {\n            ...user\n        }\n    }\n    \n": types.UsersDocument,
    "\n    query filterCustomer($limit: Int) {\n        filterCustomer(limit: $limit, filter: \"role = 0\") {\n            id\n            name\n            email\n        }\n    }\n": types.FilterCustomerDocument,
    "\n    query usersPaginate($first: Int!, $page: Int) {\n        usersPaginate(first: $first, page: $page) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n": types.UsersPaginateDocument,
    "\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n": types.UpsertUserDocument,
    "\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n": types.DeleteUserDocument,
    "\n    mutation restoreUser($id: [ID!]) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n": types.RestoreUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query categoryFilter($search: String) {\n        categories(search: $search) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query categoryFilter($search: String) {\n        categories(search: $search) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query categories {\n        categories {\n            ...category\n        }\n    }\n    \n"): (typeof documents)["\n    query categories {\n        categories {\n            ...category\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query categoriesPaginate($first: Int!, $page: Int) {\n        categoriesPaginate(first: $first, page: $page) {\n            data {\n                ...category\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query categoriesPaginate($first: Int!, $page: Int) {\n        categoriesPaginate(first: $first, page: $page) {\n            data {\n                ...category\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertCategory($input: CategoryInput!) {\n        upsertCategory(input: $input) {\n            ...category\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertCategory($input: CategoryInput!) {\n        upsertCategory(input: $input) {\n            ...category\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteCategory($id: [ID!]) {\n        deleteCategory(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteCategory($id: [ID!]) {\n        deleteCategory(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreCategory($id: [ID!]) {\n        restoreCategory(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreCategory($id: [ID!]) {\n        restoreCategory(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query chartsData {\n        usersCount\n        customersCount\n        categoriesCount\n        productsCount\n        ordersCount\n        products {\n            id\n            name\n            price\n            inventories {\n                qty\n            }\n        }\n        orders {\n            total_amount\n        }\n    }\n"): (typeof documents)["\n    query chartsData {\n        usersCount\n        customersCount\n        categoriesCount\n        productsCount\n        ordersCount\n        products {\n            id\n            name\n            price\n            inventories {\n                qty\n            }\n        }\n        orders {\n            total_amount\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query customerFilter($search: String) {\n        customers(search: $search) {\n            id\n        }\n    }\n"): (typeof documents)["\n    query customerFilter($search: String) {\n        customers(search: $search) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query customers {\n        customers {\n            ...customer\n        }\n    }\n    \n"): (typeof documents)["\n    query customers {\n        customers {\n            ...customer\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CustomersPaginate($page: Int, $first: Int!, $search: String) {\n        customersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...customer\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query CustomersPaginate($page: Int, $first: Int!, $search: String) {\n        customersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...customer\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertCustomer($input: CustomerInput!) {\n        upsertCustomer(input: $input) {\n            ...customer\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertCustomer($input: CustomerInput!) {\n        upsertCustomer(input: $input) {\n            ...customer\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteCustomer($id: [ID!]!) {\n        deleteCustomer(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteCustomer($id: [ID!]!) {\n        deleteCustomer(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreCustomer($id: [ID!]!) {\n        restoreCustomer(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreCustomer($id: [ID!]!) {\n        restoreCustomer(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment log on Log {\n        id\n        ip_address\n        browser\n        event\n        user {\n            id\n            name\n        }\n        created_at\n        deleted_at\n        updated_at\n    }\n"): (typeof documents)["\n    fragment log on Log {\n        id\n        ip_address\n        browser\n        event\n        user {\n            id\n            name\n        }\n        created_at\n        deleted_at\n        updated_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment user on User {\n        id\n        first_name\n        middle_name\n        last_name\n        name\n        email\n        password\n        role\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment user on User {\n        id\n        first_name\n        middle_name\n        last_name\n        name\n        email\n        password\n        role\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment orderItem on OrderItem {\n        id\n        order_id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        total_amount\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment orderItem on OrderItem {\n        id\n        order_id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        total_amount\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment category on Category {\n        id\n        name\n        slug\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment category on Category {\n        id\n        name\n        slug\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment product on Product {\n        id\n        name\n        image\n        category_id\n        category {\n            id\n            name\n        }\n        description\n        sku\n        price\n        inventories {\n            id\n            qty\n            location\n        }\n        #                order_items {\n        #                    ...orderItem\n        #                }\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment product on Product {\n        id\n        name\n        image\n        category_id\n        category {\n            id\n            name\n        }\n        description\n        sku\n        price\n        inventories {\n            id\n            qty\n            location\n        }\n        #                order_items {\n        #                    ...orderItem\n        #                }\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment inventory on Inventory {\n        id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        location\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment inventory on Inventory {\n        id\n        product_id\n        product {\n            id\n            name\n        }\n        qty\n        location\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment customer on Customer {\n        id\n        user {\n            id\n            first_name\n            middle_name\n            last_name\n            name\n        }\n        user_id\n        name\n        phone\n        address\n        points\n        orders {\n            id\n            customer_id\n            total_amount\n            payment\n            status\n        }\n        created_at\n        updated_at\n        deleted_at\n    }\n"): (typeof documents)["\n    fragment customer on Customer {\n        id\n        user {\n            id\n            first_name\n            middle_name\n            last_name\n            name\n        }\n        user_id\n        name\n        phone\n        address\n        points\n        orders {\n            id\n            customer_id\n            total_amount\n            payment\n            status\n        }\n        created_at\n        updated_at\n        deleted_at\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment order on Order {\n        id\n        cash_tendered\n        change\n        date\n        payment\n        status\n        total_amount\n        transaction_number\n        customer_guest\n        order_items {\n            ...orderItem\n        }\n        #        customer_id\n        #        customer {\n        #            id\n        #            name\n        #            user {\n        #                id\n        #                first_name\n        #                middle_name\n        #                last_name\n        #                name\n        #            }\n        #        }\n        created_at\n        updated_at\n        deleted_at\n    }\n    \n"): (typeof documents)["\n    fragment order on Order {\n        id\n        cash_tendered\n        change\n        date\n        payment\n        status\n        total_amount\n        transaction_number\n        customer_guest\n        order_items {\n            ...orderItem\n        }\n        #        customer_id\n        #        customer {\n        #            id\n        #            name\n        #            user {\n        #                id\n        #                first_name\n        #                middle_name\n        #                last_name\n        #                name\n        #            }\n        #        }\n        created_at\n        updated_at\n        deleted_at\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query inventoryFilter($search: String) {\n        inventories(search: $search) {\n            id\n            qty\n            location\n        }\n    }\n"): (typeof documents)["\n    query inventoryFilter($search: String) {\n        inventories(search: $search) {\n            id\n            qty\n            location\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query inventories {\n        inventories {\n            ...inventory\n        }\n    }\n    \n"): (typeof documents)["\n    query inventories {\n        inventories {\n            ...inventory\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query inventoriesPaginate($first: Int!, $page: Int) {\n        inventoriesPaginate(first: $first, page: $page) {\n            data {\n                ...inventory\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query inventoriesPaginate($first: Int!, $page: Int) {\n        inventoriesPaginate(first: $first, page: $page) {\n            data {\n                ...inventory\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertInventory($input: InventoryInput!) {\n        upsertInventory(input: $input) {\n            ...inventory\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertInventory($input: InventoryInput!) {\n        upsertInventory(input: $input) {\n            ...inventory\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteInventory($id: [ID!]) {\n        deleteInventory(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteInventory($id: [ID!]) {\n        deleteInventory(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation reduceInventory($products: [CartProductQuantityInput!]!) {\n        reduceInventory(products: $products) {\n            id\n            product {\n                id\n                name\n                inventories {\n                    qty\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation reduceInventory($products: [CartProductQuantityInput!]!) {\n        reduceInventory(products: $products) {\n            id\n            product {\n                id\n                name\n                inventories {\n                    qty\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query logs($search: String) {\n        logs(search: $search) {\n            ...log\n        }\n    }\n    \n"): (typeof documents)["\n    query logs($search: String) {\n        logs(search: $search) {\n            ...log\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query logsPaginate($search: String, $first: Int!, $page: Int) {\n        logsPaginate(search: $search, first: $first, page: $page) {\n            data {\n                ...log\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query logsPaginate($search: String, $first: Int!, $page: Int) {\n        logsPaginate(search: $search, first: $first, page: $page) {\n            data {\n                ...log\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertLog($input: LogInput!) {\n        upsertLog(input: $input) {\n            ...log\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertLog($input: LogInput!) {\n        upsertLog(input: $input) {\n            ...log\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteLog($id: [ID!]) {\n        deleteLog(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteLog($id: [ID!]) {\n        deleteLog(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreLog($id: [ID!]) {\n        restoreLog(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreLog($id: [ID!]) {\n        restoreLog(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query orderFilter($search: String) {\n        orders(search: $search) {\n            id\n        }\n    }\n"): (typeof documents)["\n    query orderFilter($search: String) {\n        orders(search: $search) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query orders {\n        orders {\n            ...order\n        }\n    }\n    \n"): (typeof documents)["\n    query orders {\n        orders {\n            ...order\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query OrdersPaginate($page: Int, $first: Int!, $search: String) {\n        ordersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...order\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query OrdersPaginate($page: Int, $first: Int!, $search: String) {\n        ordersPaginate(page: $page, first: $first, search: $search) {\n            data {\n                ...order\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertOrder($input: OrderInput!) {\n        upsertOrder(input: $input) {\n            ...order\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertOrder($input: OrderInput!) {\n        upsertOrder(input: $input) {\n            ...order\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteOrder($id: [ID!]!) {\n        deleteOrder(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteOrder($id: [ID!]!) {\n        deleteOrder(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreOrder($id: [ID!]!) {\n        restoreOrder(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreOrder($id: [ID!]!) {\n        restoreOrder(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query orderItemFilter {\n        orderItems {\n            id\n        }\n    }\n"): (typeof documents)["\n    query orderItemFilter {\n        orderItems {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query orderItems {\n        orderItems {\n            ...orderItem\n        }\n    }\n    \n"): (typeof documents)["\n    query orderItems {\n        orderItems {\n            ...orderItem\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query orderItemsPaginate($first: Int!, $page: Int) {\n        orderItemsPaginate(first: $first, page: $page) {\n            data {\n                ...orderItem\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query orderItemsPaginate($first: Int!, $page: Int) {\n        orderItemsPaginate(first: $first, page: $page) {\n            data {\n                ...orderItem\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertOrderItem($input: OrderItemInput!) {\n        upsertOrderItem(input: $input) {\n            ...orderItem\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertOrderItem($input: OrderItemInput!) {\n        upsertOrderItem(input: $input) {\n            ...orderItem\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteOrderItem($id: [ID!]) {\n        deleteOrderItem(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteOrderItem($id: [ID!]) {\n        deleteOrderItem(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreOrderItem($id: [ID!]) {\n        restoreOrderItem(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreOrderItem($id: [ID!]) {\n        restoreOrderItem(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query productFilter($search: String) {\n        products(search: $search) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query productFilter($search: String) {\n        products(search: $search) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query products {\n        products {\n            ...product\n        }\n    }\n    \n"): (typeof documents)["\n    query products {\n        products {\n            ...product\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query productsPaginate($first: Int!, $page: Int) {\n        productsPaginate(first: $first, page: $page) {\n            data {\n                ...product\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query productsPaginate($first: Int!, $page: Int) {\n        productsPaginate(first: $first, page: $page) {\n            data {\n                ...product\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertProduct($input: ProductInput!) {\n        upsertProduct(input: $input) {\n            ...product\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertProduct($input: ProductInput!) {\n        upsertProduct(input: $input) {\n            ...product\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteProduct($id: [ID!]) {\n        deleteProduct(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteProduct($id: [ID!]) {\n        deleteProduct(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreProduct($id: [ID!]) {\n        restoreProduct(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreProduct($id: [ID!]) {\n        restoreProduct(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query userFilter($search: String) {\n        users(search: $search) {\n            id\n            name\n            email\n        }\n    }\n"): (typeof documents)["\n    query userFilter($search: String) {\n        users(search: $search) {\n            id\n            name\n            email\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query users {\n        users {\n            ...user\n        }\n    }\n    \n"): (typeof documents)["\n    query users {\n        users {\n            ...user\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query filterCustomer($limit: Int) {\n        filterCustomer(limit: $limit, filter: \"role = 0\") {\n            id\n            name\n            email\n        }\n    }\n"): (typeof documents)["\n    query filterCustomer($limit: Int) {\n        filterCustomer(limit: $limit, filter: \"role = 0\") {\n            id\n            name\n            email\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query usersPaginate($first: Int!, $page: Int) {\n        usersPaginate(first: $first, page: $page) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query usersPaginate($first: Int!, $page: Int) {\n        usersPaginate(first: $first, page: $page) {\n            data {\n                ...user\n            }\n            paginatorInfo {\n                currentPage\n                lastPage\n                perPage\n                total\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n"): (typeof documents)["\n    mutation upsertUser($input: UserInput!) {\n        upsertUser(input: $input) {\n            ...user\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation deleteUser($id: [ID!]) {\n        deleteUser(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation restoreUser($id: [ID!]) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation restoreUser($id: [ID!]) {\n        restoreUser(id: $id) {\n            id\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;