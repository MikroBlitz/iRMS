export type User = {
    id: string;
    customers: Customer[];
    first_name: string | null;
    middle_name: string | null;
    last_name: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    email_verified_at: string | null;
    jobs: Job[];
    usersCount: number | null;
    role: number | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
};

export type Category = {
    id: string;
    name: string;
    slug: string | null;
    products: Product[];
    categoriesCount: number | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
};

export type Product = {
    id: string;
    name: string;
    image: string | null;
    description: string | null;
    sku: string | null;
    price: number | null;
    item: string | null;
    inventories: Inventory[];
    productsCount: number | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
};

export type Order = {
    id: string;
    customer_id: number | null;
    order_date: string | null;
    total_amount: number | null;
    status: string | null;
    ordersCount: number | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
};

export type Customer = {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    points: number | null;
};

export type OrderItem = {
    id: string;
    order_id: string | null;
    product_id: string | null;
    qty: string | null;
    price: number | null;
    total: number | null;
};

export type Payment = {
    id: string;
    order_id: string | null;
    amount: number | null;
    payment_method: string | null;
};

export type Inventory = {
    id: string;
    product_id: string | null;
    qty: string | null;
    location: string | null;
};

export type Job = {
    id: string;
    name: string | null;
    description: string | null;
    status: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
};
