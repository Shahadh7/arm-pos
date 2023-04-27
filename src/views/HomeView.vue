<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Pending</span>
                        <div class="text-900 font-medium text-xl">5</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">In Process</span>
                        <div class="text-900 font-medium text-xl">2</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Completed</span>
                        <div class="text-900 font-medium text-xl">2</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <!-- <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">newly registered</span> -->
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Cancelled</span>
                        <div class="text-900 font-medium text-xl">3</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        {{ sharkList }}

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { createShark, getAllSharks } from '../modelapi/shark'

interface NewUser {
  name: string | null;
  sharktype: string | null;
  id?: number | null;
  length: number | null;
}

const sharkList  = reactive<NewUser[]>([])


onMounted(async () => {
    
    let createnew = await createShark({name: 'test', sharktype: 'test', length: 1})

    if(createnew) {
        console.log('created')
        let list = await getAllSharks()
        sharkList.push(...list)
    } else {
        console.log('not created')
    }

    
})

</script>

<style scoped>

</style>