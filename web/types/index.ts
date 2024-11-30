export type AuthUser = {
    id: string
    role: any
    first_name: string
    middle_name: string
    last_name: string
    name: string
}

export type AuthState = {
    user: AuthUser
}

export type User = {
    id?: string
    name?: string
    email?: string
    password?: string
}

export type Product = {
    id?: string
    name?: string
    image?: string
    description?: string
    sku?: string
    price?: number
    item?: string
    inventories?: Inventory[] | any
}

export type Stock = {
    id?: string
    product_id?: string
    qty?: number | null
    location?: string
}

export type CrudButton = {
    id: string
    iconName: string
    iconSize: number
    iconClass: string
    action?: Function
    roles?: number[]
}

export type CartProduct = {
    id?: any
    item?: string | any
    image?: string | undefined
    price?: number | undefined
    qty?: number | undefined
    amount?: number | undefined
    stock?: Stock[] | any
    totalAmount?: number | any
    totalTax?: number | any
    promotionAmount?: number | any
}

export type CartStore = {
    cartItems?: CartProduct[]
    totalAmount?: number
    totalAmountWithTaxAndDiscount?: number
}

export type Order = {
    id?: string
    customer_id?: number
    order_date?: string
    total_amount?: number
    status?: string
}

export type Customer = {
    id?: string
    name?: string
    email?: string
    phone?: string
    address?: string
    points?: number
}

export type OrderItem = {
    id?: string
    order_id?: string
    product_id?: string
    qty?: string
    price?: number
    total?: number
}

export type Payment = {
    id?: string
    order_id?: string
    amount?: number
    payment_method?: string
}

export type Inventory = {
    id?: string
    product_id?: string
    qty?: string
    location?: string
}

export type CrudModalField = {
    name?: any
    label?: string
    type?: string
    required?: boolean
    model?: string
    queryName?: string
    min?: number
    max?: number
    step?: number
    optionTitle?: string
}

export type Action = {
    icon?: string
    handler?: (user?: User) => void
    class?: string
}

export type Headers = {
    key?: string | ((data: any) => string)
    label?: string
}

export type UsersPaginateResult = {
    usersPaginate?: {
        data?: User[]
    }
}

export type ProductsPaginateResult = {
    productsPaginate?: {
        data?: User[]
    }
}

export type ModalField = {
    name?: any
    label?: string | undefined
    type?: string | undefined
}

export type Field = {
    name?: any
    label?: string
    type?:
        | 'text'
        | 'email'
        | 'textarea'
        | 'float'
        | 'number'
        | 'password'
        | 'checkbox'
        | 'select'
    options?: { value: string; label: string }[]
    min?: number
    max?: number
    step?: number
    required?: boolean
    model?: string
}

export type LinkItem = {
    title: string
    icon: string
    iconColor?: string
    textColor?: string
    path: string
    show?: boolean
    items?: LinkItem[]
    model?: string
    roles?: number[] | null
}

export type PaginatorInfo = {
    currentPage?: number
    lastPage?: number
    perPage?: number
    total?: number
}
