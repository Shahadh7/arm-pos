<template>
    <div class="grid">
        <div class="col-12 flex justify-content-end">
            <Button label="Create New User" class="mr-2 mb-2" @click="openAdd" />
            <Dialog header="Add new user" v-model:visible="displayAddDialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                <div class="grid">
                    <div class="col-12">
                        <p class="text-secondary">Create a new user with appropriate details</p>
                        <div class="card p-fluid p-0 bg-none" style="background: none; border: unset;">
                            <div class="field">
                                <label for="name1">Full name <span style="color: red;" class="mx-1">*</span></label>
                                <InputText id="name1" type="text" v-model="userDetails.full_name" />
                            </div>
                            <div class="field">
                                <label for="username">Username<span style="color: red;" class="mx-1">*</span></label>
                                <InputText id="username" type="text" v-model="userDetails.username" />
                            </div>
                            <div class="field">
                                <label for="email1">Email<span style="color: red;" class="mx-1">*</span></label>
                                <InputText id="email1" type="text" v-model="userDetails.email" />
                            </div>
                            <div class="field">
                                <label for="password">Password<span style="color: red;" class="mx-1">*</span></label>
                                <Password id="password" toogleMask v-model="userDetails.password" />
                            </div>
                            <div class="field">
                                <label for="phone">Phone<span style="color: red;" class="mx-1">*</span></label>
                                <InputText id="phone" type="text" v-model="userDetails.phone" />
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Create" @click="addNewUser" icon="pi pi-check" class="p-button-outlined"  />
                    <Button label="Cancel" @click="closeAdd" icon="pi pi-check" class="p-button-outlined p-button-secondary"  />
                </template>
            </Dialog>
            <Toast />
        </div>
        <div class="col-12">
            <DataTable 
                :value="users"
                :paginator="true"
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                @row-dblclick="openEdit"
                selectionMode="single"
                dataKey="id_user"
                :globalFilterFields="['full_name', 'username', 'phone', 'email', 'created_at']"
                v-model:filters="filters1"
                :filters="filters1"
                filterDisplay="menu"
            >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                    </span>
                </div>
            </template>
                <Column field="full_name" header="Full name"></Column>
                <Column field="username" header="Username"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="created_at" header="Created at"></Column>
                <Column field="updated_at" header="Updated at"></Column>
            </DataTable>
        </div>
        <Dialog header="Edit user" v-model:visible="displayEditUser" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
            <div class="grid">
                <div class="col-12">
                    <p class="text-secondary">Edit a existing user with appropriate details or remove this user, <span style="color: crimson;">If you need to change the password, enter the old password and new password.</span></p>
                    <div class="card p-fluid p-0 bg-none" style="background: none; border: unset;">
                        <div class="field">
                            <label for="name1">Full name <span style="color: red;" class="mx-1">*</span></label>
                            <InputText id="name1" type="text" v-model="userDetails.full_name" />
                        </div>
                        <div class="field">
                            <label for="username">Username<span style="color: red;" class="mx-1">*</span></label>
                            <InputText id="username" type="text" v-model="userDetails.username" />
                        </div>
                        <div class="field">
                            <label for="email1">Email<span style="color: red;" class="mx-1">*</span></label>
                            <InputText id="email1" type="text" v-model="userDetails.email" />
                        </div>
                        <div class="field">
                            <label for="password-old">Old Password</label>
                            <Password id="password-old" toogleMask v-model="userDetails.oldPassword" />
                        </div>
                        <div class="field">
                            <label for="password">New Password</label>
                            <Password id="password" toogleMask v-model="userDetails.password" />
                        </div>
                        <div class="field">
                            <label for="phone">Phone<span style="color: red;" class="mx-1">*</span></label>
                            <InputText id="phone" type="text" v-model="userDetails.phone" />
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Edit" @click="editUser" icon="pi pi-check" class="p-button-outlined"  />
                <Button label="Delete" @click="openConfirmation" icon="pi pi-check" class="p-button-outlined p-button-danger"  />
                <Button label="Cancel" @click="closeEdit" icon="pi pi-check" class="p-button-outlined p-button-secondary"  />
                <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Are you sure you want to proceed?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" @click="deleteUserWithId" class="p-button-text" autofocus />
                    </template>
                </Dialog>
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeMount } from 'vue';
import { createUser, getAllUsers, updateUser, deleteUser } from '../modelapi/user'
import { useToast } from 'primevue/usetoast';
import moment from 'moment';
import { useConfirm } from 'primevue/useconfirm';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const displayAddDialog = ref(false);
const displayEditUser = ref(false);
const displayConfirmation = ref(false);
const filters1 = ref(null);

const toast = useToast();
const confirmPopup = useConfirm();

const openAdd = () => {
    clearUserDetails(); 
    displayAddDialog.value = true;
};

const closeAdd = () => {
    displayAddDialog.value = false;
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const openEdit = (event) => {
    userDetails.id_user = event.data.id_user;
    userDetails.full_name = event.data.full_name;
    userDetails.username = event.data.username;
    userDetails.email = event.data.email;
    userDetails.phone = event.data.phone;
    userDetails.password = event.data.password;
    console.log(userDetails.id_user)
    displayEditUser.value = true;
};

const closeEdit = () => {
    displayEditUser.value = false;
};

const confirm = (event) => {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};




type User = {
    id_user?: number | null,
    full_name: string,
    username: string | null,
    oldPassword?: string | null,
    password: string | null ,
    phone: string | null,
    email: string | null,
}

const userDetails: User = reactive({
    full_name: "",
    username: null,
    email: null,
    password: null,
    phone: null,
    id_user: null,
});

const addNewUser = async() => {

    const response = await createUser(userDetails);
    console.log(response);
    toast.add({ severity: 'success', summary: 'Success', detail: 'User has been created succesfully', life: 3000 });
    displayAddDialog.value = false;
    clearUserDetails(); 
    if(response.dataValues){
        await getUsers()
    }
};

const clearUserDetails = () => {
    userDetails.full_name = "";
    userDetails.username = null;
    userDetails.email = null;
    userDetails.password = null;
    userDetails.phone = null;
    userDetails.id_user = null;
    userDetails.oldPassword = null;
};


const users = ref([]);

const getUsers = async() => {
    const response = await getAllUsers();

    response.map((user) => {
        user.dataValues.created_at = moment(user.dataValues.created_at).format('DD-MM-YYYY HH:mm:ss');
        user.dataValues.updated_at = moment(user.dataValues.updated_at).format('DD-MM-YYYY HH:mm:ss');
    });

    console.log(response);
    users.value = [];
    response.forEach(element => {
        users.value.push(element.dataValues);
    });
};

const editUser = async() => {
    const response = await updateUser(userDetails);
    toast.add({ severity: 'success', summary: 'Success', detail: 'User has been edited succesfully', life: 3000 });
    displayEditUser.value = false;
    clearUserDetails(); 
    if(response){
        await getUsers()
    }
    
};

const deleteUserWithId = async() => {

    const userId = userDetails.id_user;

    const response = await deleteUser(userId);
    toast.add({ severity: 'success', summary: 'Success', detail: 'User has been deleted succesfully', life: 3000 });
    displayEditUser.value = false;
    clearUserDetails(); 
    await getUsers()

    displayConfirmation.value = false;
}

onMounted(() => {
    getUsers();
    initFilters1()
});

onBeforeMount(() => {
    initFilters1()
});


const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        full_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        phone: { value: null, matchMode: FilterMatchMode.IN },
        email: { value: null, matchMode: FilterMatchMode.IN },
        created_at: { value: null, matchMode: FilterMatchMode.IN },
    };
};

const clearFilter1 = () => {
    initFilters1();
};



</script>

<style scoped>

</style>