<template>
    <main v-auto-animate class="max-w-screen-2xl mx-auto">
        <TableHeader :title="pageTitle" :icon="icon" />
        <Datatable :options="options" :columns="columns" :data="users">
            <template #actions="{ cellData }: { cellData: any }">
                <Button
                    class="h-7 text-xs"
                    size="sm"
                    @click="console.log('edit')"
                >
                    Edit
                </Button>
            </template>
        </Datatable>
    </main>
</template>

<script lang="ts" setup>
import type { Config, ConfigColumns } from 'datatables.net';
import Datatable from '~/components/ui/Datatable.client.vue';

const pageTitle = ref('Reports');
const icon = 'mdi:form-select';

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete reports',
            name: 'Manage reports',
        },
    ],
    title: pageTitle.value,
});

const { data: users } = await useAsyncData<any[]>(
    'fakerUsers',
    () => {
        return new Promise((resolve) => {
            const users = Array.from({ length: 10 }, () => {
                return {
                    age: 23,
                    name: 'SDFSDF',
                    office: 'ASDASD',
                    position: 'adasd',
                    salary: 132132,
                };
            });
            resolve(users);
        });
    },
    { default: () => [] },
);

const columns: ConfigColumns[] = [
    { data: 'name', title: 'Name' },
    { data: 'position', title: 'Position' },
    { data: 'office', title: 'Office' },
    { data: 'age', title: 'Age' },
    { data: 'salary', title: 'Salary' },
    {
        className: 'no-export',
        data: null,
        name: 'actions',
        orderable: false,
        render: '#actions',
        responsivePriority: 1,
        searchable: false,
        title: '',
    },
];

const options: Config = {
    autoWidth: true,
    buttons: [
        {
            columns: ':not(.no-export)',
            extend: 'colvis',
            text: 'Columns',
        },
        'copy',
        'excel',
        'pdf',
        'print',
        'csv',
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    responsive: true,
    select: true,
};
</script>
