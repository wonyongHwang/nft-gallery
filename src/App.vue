<script setup>
import { useStore } from '@/store';
import ALogo from '@/components/ALogo.vue';
import ASearch from '@/components/ASearch.vue';
import AGallery from '@/components/AGallery.vue';
import AFooter from '@/components/AFooter.vue';
import AddModal from '@/components/AddView.vue'

const store = useStore();

//ljw 추가
import { ref } from 'vue';
const chaneStates = ref(false);
const choose = ref(0);

const changeMsg = (value) => {
  choose.value = value;
  chaneStates.value = true;
  console.log('ch:'+choose+" cs="+chaneStates);
}
const closeDialog = () => {
  chaneStates.value = false;
}
</script>

<template>
  <AddModal v-if="chaneStates" @clickstate="closeDialog" :idxNums="choose"/>
  <div class="bg-slate-800 h-full w-full fixed">
    <div class="flex flex-col items-center justify-center h-screen">
      <ALogo />
      <ASearch />
      <AGallery v-if="store.nfts.length >= 1" @chgstate="changeMsg" />
    </div>
    <AFooter />
  </div>
</template>