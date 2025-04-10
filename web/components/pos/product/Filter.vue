<template>
    <div class="text-gray-500 m-auto flex justify-center items-center">
        <Sheet>
            <SheetTrigger>
                <div
                    class="flex gap-2 items-center justify-center hover:bg-accent rounded md:p-2"
                >
                    <Icon
                        name="solar:filter-outline"
                        size="20"
                        class="text-gray-900 dark:text-gray-300"
                    />
                    <span class="text-sm hidden md:block text-foreground"
                        >Categories</span
                    >
                </div>
            </SheetTrigger>
            <SheetContent side="top" class="rounded border-2 border-secondary">
                <SheetTitle visually-hidden />
                <SheetDescription visually-hidden />

                <div class="flex mt-4">
                    <Button
                        class="text-sm px-2.5 gap-2 hover:bg-destructive transition duration-300 focus:outline-none rounded-full md:rounded"
                        @click.prevent="resetFilter"
                    >
                        <Icon name="solar:filter-broken" size="20" />
                        <span class="text-sm hidden md:block">Reset</span>
                    </Button>
                </div>

                <div class="mb-6 flex items-center justify-center mt-4">
                    <div
                        class="flex items-center justify-center flex-wrap gap-2 h-auto"
                    >
                        <Button
                            v-for="category in categories"
                            :key="category.id"
                            variant="outline"
                            :class="{
                                'bg-secondary':
                                    selectedCategory === category.name,
                                'bg-transparent':
                                    selectedCategory !== category.name,
                            }"
                            class="text-sm p-4 shadow-sm hover:bg-accent transition duration-300 hover:text-foreground text-foreground focus:outline-none whitespace-nowrap"
                            @click.prevent="selectedCategory = category.name"
                        >
                            {{ category.name }}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { useModelCrud } from '~/composables/useModelCrud';
import testData from '~/pages/pos/testData.json';

const modelName = 'category';
const modelFields = ['name'].map((name) => ({
    name,
}));

const { fetchDataPaginate, modelData } = await useModelCrud(
    modelName,
    modelFields,
);
const selectedCategory: any = inject('selectedCategory');
const fallbackData: any = testData.categories;

const resetFilter = () => {
    selectedCategory.value = null;
};

const categories = computed(() => {
    return modelData.value && modelData.value.length > 0
        ? modelData.value
        : fallbackData;
});

onMounted(async () => {
    await fetchDataPaginate(100, 1);
});
</script>
