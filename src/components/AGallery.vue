<script setup>
import { useStore } from '@/store';
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted , computed} from 'vue';



const store = useStore();
const blockExplorer = computed(() => {
  return store.selectedNetwork == 'ethereum'
    ? { name: 'Etherscan', url: 'https://goerli.etherscan.io/address' }
    : { name: 'Polygonscan', url: 'https://polygonscan.com/address' };
});

console.log(store.nfts);

const ensName="vitalik.eth" //ens Name으로 Nfts 데이터 가져오기 (다른 주소 사용)
const param =ref(''); 
const param2 =ref(''); 

const nfts = store.alchemy.nft.getNftsForOwner(ensName);
const nfts2 = store.alchemy.nft.getNftsForContract("0x61fce80d72363b731425c3a2a46a1a5fed9814b2");
// 사진 주소 불러오기
nfts.then((result) => {
  param.value = result.ownedNfts[99].contract.openSea.imageUrl;
  console.log(param);
});
// Nfts 불러오기 및 param2에 저장
nfts2.then((result) => {
  param2.value = result.nfts[0].contract.address;
  console.log(param2);
});
</script>


<style lang="scss" scoped></style>
<template>
  <div class="w-4/5 md:w-3/5 pt-10">
    <p class="text-white text-center pb-4 w-full">
      {{ store.message }}
      <!-- 사진 param 주소로 불러오기 -->
      <img :src=param style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);">
      <!-- Nfts contract 주소로 불러오기 -->
      <p> contract address : {{ param2 }} </p>
    </p>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-1 overflow-y-auto h-64">
      <div v-for="(item, index) in store.gallery2" :key="index" class="w-80 md:w-full flex flex-col bg-slate-600 rounded">
        <img :src="item.image" :alt="item.name" class="w-full h-full max-h-40 object-cover mb-1 rounded-t" />
        <div class="flex flex-col p-2">
          <h1 class="text-white text-sm font-semibold truncate">
            {{ item }}
            {{ store.nfts2 }}
          </h1>
        </div>
      </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-1 overflow-y-auto h-64">
      <div v-for="(item, index) in store.gallery" :key="index" class="w-80 md:w-full flex flex-col bg-slate-600 rounded">
        <img :src="item.image" :alt="item.name" class="w-full h-full max-h-40 object-cover mb-1 rounded-t" />
        <div class="flex flex-col p-2">
          <h1 class="text-white text-sm font-semibold truncate">
            {{ item.name }}
            {{ item }}
          </h1>
          <p class="truncate text-sm text-gray-400 w-1/1">token type: {{ item.metadata.tokenType }}</p>
          <p class="truncate text-sm text-gray-400 w-1/1">token symbol: {{ item.tokenSymbol }}</p>
          <p class="truncate text-sm text-gray-400 w-1/1">token name: {{ item.tokenName }}</p>
          <p class="truncate text-sm text-gray-400 w-1/1">token address:{{ item.address }}</p>
          <p class="truncate text-xs text-gray-300">{{ item.description }}</p>
          <a :href="`${blockExplorer.url}/${item.address}`" target="_blank" class="text-xs text-pink-500 cursor-pointer">
            <component :is="ArrowUpRightIcon" class="h-3 w-3 text-pink-500 inline-flex mr-0.5" />
            {{ blockExplorer.name }}
          </a>
          <a :href="`${item.metaDataUrl.gateway}`" target="_blank" class="text-xs text-pink-500 cursor-pointer">
            <component :is="ArrowUpRightIcon" class="h-3 w-3 text-pink-500 inline-flex mr-0.5" />
            meta data
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

