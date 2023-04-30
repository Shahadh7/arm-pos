<template>
    <div class="grid">
        <div class="col-12 flex justify-content-end">
            <Button label="Create New User" class="mr-2 mb-2" @click="open" />
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
                    <Button label="Cancel" @click="close" icon="pi pi-check" class="p-button-outlined p-button-secondary"  />
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
                @row-dblclick="editItem"
                selectionMode="single"
                dataKey="id_user"

            >
                <Column field="id_user" header="ID"></Column>
                <Column field="full_name" header="Full name"></Column>
                <Column field="username" header="Username"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="created_at" header="Created at"></Column>
                <Column field="updated_at" header="Updated at"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { createUser, getAllUsers } from '../modelapi/user'
import { useToast } from 'primevue/usetoast';
import moment from 'moment';

const displayAddDialog = ref(false);

const toast = useToast();

const open = () => {
    clearUserDetails(); 
    displayAddDialog.value = true;
};

const close = () => {
    displayAddDialog.value = false;
};


type User = {
    id_user?: number | null,
    full_name: string,
    username: string | null,
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
        getUsers()
    }
};

const clearUserDetails = () => {
    userDetails.full_name = "";
    userDetails.username = null;
    userDetails.email = null;
    userDetails.password = null;
    userDetails.phone = null;
    userDetails.id_user = null;
};


const users = ref([]);

const getUsers = async() => {
    const response = await getAllUsers();

    response.map((user) => {
        console.log(user)
        user.dataValues.created_at = moment(user.dataValues.created_at).format('DD-MM-YYYY HH:mm:ss');
        user.dataValues.updated_at = moment(user.dataValues.updated_at).format('DD-MM-YYYY HH:mm:ss');
    });

    users.value.push(...response)
    console.log(users.value)
};

const editItem = (event) => {
    console.log(event.data);
    userDetails.full_name = event.data.full_name;
    userDetails.username = event.data.username;
    userDetails.email = event.data.email;
    userDetails.phone = event.data.phone;
    userDetails.id_user = event.data.id_user;
    displayAddDialog.value = true;
};

onMounted(() => {
    getUsers();
});



</script>

<style scoped>

</style>