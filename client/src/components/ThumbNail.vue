<template>
    <div class="flex flex-col items-center justify-around cursor-pointer" @dblclick="isDir && call(path)">
        <div class="icon">
            <FolderIcon v-if="isDir" />
            <DocumentIcon v-else />
        </div>
        <div class="label">{{ name }}</div>
    </div>
</template>
<script setup>
    import { FolderIcon, DocumentIcon } from '@heroicons/vue/24/solid';
    import { defineProps } from 'vue';
    const {call, path, isDir} = defineProps(['isDir', 'path', 'call'])
    let name = path.split(/[\\\/]/).filter(e=>e?true:false).reduce((e, a)=>a);
</script>
<style>
.icon {
    width: 60%;
}
</style>