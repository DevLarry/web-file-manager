<template>
    <div class="container">
        <div class="panel">
            <h3>File Manager</h3>
            <FileField :call="showContent" :re="cast" path="." :isDir="true" />
        </div>
        <div class="view">
            <nav class="flex p-4">
                <span class="font-semibold text-lg">Contents</span>
                <ul class="flex ml-auto gap-2">
                    <li class="item bg-lime-500">
                        <button
                            class="flex items-center px-2"
                            @click="createObject({path: active, isDir: true})"
                        >
                            <FolderPlusIcon class="icon-item" /> Create Folder
                        </button>
                    </li>
                    <li class="item bg-lime-500">
                        <button
                            class="flex items-center px-2"
                            @click="createObject({path: active})"
                        >
                            <DocumentPlusIcon class="icon-item" /> Create File
                        </button>
                    </li>
                    <li class="item bg-yellow-500">
                        <button class="flex items-center px-2">
                            <ArrowDownCircleIcon class="icon-item" /> Download File
                        </button>
                    </li>
                    <li class="item bg-yellow-500">
                        <button class="flex items-center px-2" @click="selected && renameObject()">
                            <PencilSquareIcon class="icon-item" /> Rename
                        </button>
                    </li>
                    <li class="item bg-red-400">
                        <button class="flex items-center px-2" @click="selected && deleteObject(selected.path)">
                            <XMarkIcon class="icon-item" /> Delete
                        </button>
                    </li>
                </ul>
            </nav>
            <div class="grid grid-cols-6 gap-4 bg-slate-300 h-full">
                <ThumbNail 
                    v-for="item in content" 
                    :call="showContent"
                    @click="selected = item"
                    :class="selected.path == item.path?'shadow-md font-bold':''"
                    :key="item.path" 
                    :path="item.path" 
                    :isDir="item.isDir"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
    import FileField from './FileField.vue';
    import ThumbNail from "./ThumbNail.vue";
    import { reactive, onMounted, ref } from 'vue'
    import axios from 'axios'
    import { serverURL } from '../../config';
    import { ArrowDownCircleIcon, FolderPlusIcon, XMarkIcon, DocumentPlusIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'

    let content = ref([]);
    let active = ref('');
    let selected = ref({});
    let cast = ref(0);

    async function showContent(path) {
        let contents = await axios.get(`${serverURL}file/dir?path=${path}`)
        content.value = contents.data
        active.value = path
        cast.value = (cast.value + 1) % 10;
    }
    
    async function createObject({path, isDir=false}){
        let name = prompt(`Enter ${isDir?'Folder':'File'} name!`)
        if (!name)
            return;
        let dataObject = {path, name}
        if (!isDir)
            dataObject.data = prompt("File Data") || '';
        axios.post(`${serverURL}file${isDir?'/dir':''}`, dataObject)
            .then(e=>{
                showContent(path);
            })
            .catch(err=>{
                alert('Cannot create file! Check if path exists!');
            })
    }
        
    async function deleteObject(path) {
        if (!confirm('Are you sure?'))
            return
        axios.delete(`${serverURL}file?path=${path}`)
        .then(res=>{
            showContent(active.value)
        })
        .catch(err=>{
            alert('Cannot delete file! Check if file exists!');
        })
    }

    async function renameObject() {
        let name;
        if (!(name = prompt(`new name for ${selected.value.path}`)))
            return
        name = `${active.value}/${name}`
        axios.patch(`${serverURL}file`, {name, path: selected.value.path})
        .then(res=>{
            showContent(active.value)
        })
        .catch(err=>{
            alert('Cannot rename file! Check if file exists!');
        })
    }

    onMounted(async ()=>{
        showContent('.');
    })
</script>
<style>
* {
    @apply box-border p-0 m-0;
}
.container {
    @apply grid grid-cols-4 h-full;
}
.panel {
    @apply col-span-1 shadow-sm h-full flex flex-col p-2;
}
.panel h3 {
    @apply text-lg font-semibold bg-gray-200;
}
.view {
    @apply col-span-3 h-full;
}
.item {
    @apply h-full flex items-center p-1 rounded-md text-lg;
}
.icon-item {
    @apply w-6 h-6 text-teal-800;
}
</style>