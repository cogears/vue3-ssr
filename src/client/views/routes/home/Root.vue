<script setup lang="ts">
import { getStore } from '@/client/store';
import { onMounted, reactive } from 'vue';

const store = getStore();
const state = reactive<{ list: string[] }>({
    list: store.state.names
});

onMounted(() => {
    console.info('====onMounted')
})

function showTip(text: string) {
    alert(text);
}

</script>
<template>
    <div class="home" v-for="(item, i) in state.list" :key="i" @click="showTip(item)">{{ item }}</div>
    <div>
        <router-link to="/about">go to about</router-link>
    </div>
</template>
<style scoped lang="scss">
.home {
    color: red;
}
</style>