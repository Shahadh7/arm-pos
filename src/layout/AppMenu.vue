<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        items: [
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Inventory', icon: 'pi pi-fw pi-database', to: '/inventory' },
            { label: 'Reparing', icon: 'pi pi-fw pi-wrench', to: '/repairing' },
            { label: 'Lost and damage', icon: 'pi pi-fw pi-times-circle', to: '/lost-and-damage' },
            { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', to: '/reports' },
            { label: 'Documents', icon: 'pi pi-fw pi-book', to: '/documents' },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
