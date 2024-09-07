export type User = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
};

export type Product = {
    id?: string;
    name?: string;
    image?: string;
    description?: string;
    sku?: string;
    price?: number;
    item?: string;
    inventories?: Inventory[];
};

export type CartProduct = {
    qty: number | undefined;
    item: string | undefined;
    price: number | undefined;
    amount: number | undefined;
};

export type Order = {
    id?: string;
    customer_id?: number;
    order_date?: string;
    total_amount?: number;
    status?: string;
};

export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    points?: number;
};

export type OrderItem = {
    id?: string;
    order_id?: string;
    product_id?: string;
    qty?: string;
    price?: number;
    total?: number;
};

export type Payment = {
    id?: string;
    order_id?: string;
    amount?: number;
    payment_method?: string;
};

export type Inventory = {
    id?: string;
    product_id?: string;
    qty?: string;
    location?: string;
};

export type CrudModalField = {
    name?: string;
    label?: string;
    type?: string;
    required?: boolean;
    relationshipFields?: string[] | undefined;
};

export type Action = {
    icon?: string;
    handler?: (user?: User) => void;
    class?: string;
};

export type Headers = {
    key?: string;
    label?: string;
};

export type UsersPaginateResult = {
    usersPaginate?: {
        data?: User[];
    };
};

export type ProductsPaginateResult = {
    productsPaginate?: {
        data?: User[];
    };
};

export type Field = {
    name?: string;
    label?: string;
    type?:
        | 'text'
        | 'email'
        | 'textarea'
        | 'float'
        | 'number'
        | 'password'
        | 'checkbox';
    required?: boolean;
};

export type LinkItem = {
    title: string;
    icon: string;
    iconColor?: string;
    textColor?: string;
    path?: string;
    show?: boolean;
    items?: LinkItem[];
    model?: string;
};
