import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppLayout from '../layout/AppLayout.vue';
import InventoryView from '../views/InventoryView.vue';
import DocumentsView from '../views/DocumentsView.vue';
import LostAndDamageView from '../views/LostAndDamageView.vue';
import RepairingView from '../views/RepairingView.vue';
import ReportsView from '../views/ReportsView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'inventory',
                    name: 'inventory',
                    component: InventoryView
                },
                {
                    path: 'repairing',
                    name: 'repairing',
                    component: RepairingView
                },
                {
                    path: 'lost-and-damage',
                    name: 'lost-and-damage',
                    component: LostAndDamageView
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: ReportsView
                },
                {
                    path: 'documents',
                    name: 'documents',
                    component: DocumentsView
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: SettingsView
                }
            ]
        },
    ]
});

export default router;
