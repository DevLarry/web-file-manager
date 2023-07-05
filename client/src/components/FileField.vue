<template>
    <div class="flex flex-col">
        <div class="flex items-center cursor-pointer">
            <FolderIcon v-if="isDir" class="w-4 h-4 mr-2" @click="handleExpand" />
            <DocumentIcon v-else class="w-4 h-4 mr-2" />
            <p class="font-semibold" @click="call(path)"> {{ name }} </p>
        </div>
        <div class="ml-3" v-show="show" v-if="expand" v-for="file in other" :key="file.path">
            <FileField :call="call" v-if="file.isDir" :path="file.path" :isDir="file.isDir"/>
        </div>
        
    </div>
</template>
<script setup>
import { FolderIcon, DocumentIcon } from '@heroicons/vue/24/solid'
import { defineProps, ref, computed, reactive, defineEmits } from 'vue'
import FileField from './FileField.vue'
import {serverURL} from '../../config.js'
import axios from 'axios';


const {call, path, isDir} = defineProps(['path', 'isDir', 'call'])
let name = path.split(/[\\\/]/).filter(e=>e?true:false).reduce((e, a)=>a);
name = ref(name)
let expand = ref(false)
let other = reactive([])
let show = ref(false)

const handleExpand = async ()=>{
    if (isDir && other.length == 0) {
        let data = await axios.get(`${serverURL}file/dir?path=${path}`);
        other = data.data
        expand.value = true;
        show.value = true;
        return
    }
    show.value = !show.value
}

</script>