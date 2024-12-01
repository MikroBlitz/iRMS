<template>
    <div class="w-full h-screen flex flex-col p-0.5">
        <div>
            <Header
                title="Point of Sale"
                title-mobile="POS"
                back-route="dashboard"
            />
            <PosLinks />
        </div>

        <div class="flex-1 flex justify-center gap-0.5 overflow-hidden">
            <PosProduct />
            <PosCart :class="{ hidden: isMobile }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useModelCrud } from '~/composables/useModelCrud'
import testData from '~/pages/pos/testData.json'

definePageMeta({
    layout: 'pos',
})

const isMobile = inject('isMobile')

// TODO: dynamic input for restock qty and inventory location
const restockQty = ref(10)
const inventoryLocation = ref(0)

const search = ref('')
const selectedCategory = ref('')

const customerName: Ref<string> = ref('')
const cashTendered: Ref<string> = ref('')
const paymentMethod: Ref<number> = ref(0)
const status: Ref<number> = ref(0)

const modelName = 'product'
const modelFields = ['name', 'image', 'price', 'qty'].map((name) => ({
    name,
}))

const { fetchDataPaginate, isLoading, modelData } = await useModelCrud(
    modelName,
    modelFields,
)

const fallbackData = testData.products
const products = ref(fallbackData)

const filteredItems = computed(() => {
    const itemsToFilter =
        modelData.value && modelData.value.length > 0
            ? modelData.value
            : fallbackData

    return itemsToFilter.filter((item: any) => {
        const matchCategory =
            !selectedCategory.value ||
            (item.category && item.category.name === selectedCategory.value)
        const matchSearch = item.name
            .toLowerCase()
            .includes(search.value.toLowerCase())
        return matchCategory && matchSearch
    })
})

onMounted(() => {
    try {
        if (modelData.value.length > 0) {
            products.value = modelData.value
        } else {
            console.warn(
                'No products found in fetched data, using fallback data',
            )
            products.value = fallbackData
        }
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            console.error('Server error 500: Using fallback data')
        } else {
            console.error('Fetch failed, using fallback data:', error)
        }
        products.value = fallbackData
    }
})

onMounted(async () => {
    await fetchDataPaginate(100, 1)
})

provide('restockQty', restockQty)
provide('inventoryLocation', inventoryLocation)
provide('customerName', customerName)
provide('search', search)
provide('selectedCategory', selectedCategory)
provide('filteredItems', filteredItems)
provide('products', products)
provide('isLoading', isLoading)
provide('cashTendered', cashTendered)
provide('status', status)
provide('paymentMethod', paymentMethod)
</script>
