import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppLayout from '../layout/AppLayout.vue';

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
                    component: () => import('../views/InventoryView.vue')
                },
                {
                    path: 'repairing',
                    name: 'repairing',
                    component: () => import('../views/RepairingView.vue')
                },
                {
                    path: 'lost-and-damage',
                    name: 'lost-and-damage',
                    component: () => import('../views/LostAndDamageView.vue')
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: () => import('../views/ReportsView.vue')
                },
                {
                    path: 'documents',
                    name: 'documents',
                    component: () => import('../views/DocumentsView.vue')
                },
                {
                    path: 'settings',
                    name: 'settings',
                    redirect: { name: 'app-settings' },
                    component: () => import('../views/SettingsView.vue'),
                    children: [
                        {
                            path: 'users',
                            name: 'users',
                            component: () => import('../views/UsersView.vue')
                        },
                        {
                            path: 'app-settings',
                            name: 'app-settings',
                            component: () => import('../views/AppSettingsView.vue')
                        },
                        {
                            path: 'backup-and-restore',
                            name: 'backup-and-restore',
                            component: () => import('../views/BackupAndRestoreView.vue')
                        }

                    ]
                }
            ]
        },
    ]
});

export default router;
