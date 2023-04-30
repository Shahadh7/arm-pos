<template>
    <div class="grid">
        <div class="col-12">
            <div class="card card-w-title">
                <h4>Settings</h4>
                <TabMenu :model="nestedRouteItems"   class="my-4" />
                <router-view />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const nestedRouteItems = ref([
    {
        label: 'App Settings',
        to: '/settings/app-settings/'
    },
    {
        label: 'Users',
        to: '/settings/users'
    },
    {
        label: 'Backup & Restore',
        to: '/settings/backup-and-restore/'
    },
]);

</script>

<style scoped>

</style>