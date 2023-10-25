import { defineStore } from 'pinia';

//스토어 정의하기
//pinia는 state, getters, action으로 구성됨.
export const useStore = defineStore('nftGallery', {
  state: () => {
    return {
      wallet: null,
      collection: null,
      nfts: [],
      selectedNetwork: 'ethereum',
      networkOptions: [{ name: 'ethereum' }, { name: 'polygon' }],
      loading: false,
      message: '',
      //ljw 추가 -> 다이아로그창 띄우기 위해서
      showDialog:false,
    };
  },
  getters: {
    gallery() {
      //@ts-ignore
      return this.nfts.map(
        (nft: {
          media: { gateway: string }[];
          title: string;
          id: { tokenId: string };
          contract: { address: string };
          description: string;
          //ljw api data 를 위해서 추가
          contractName : { name : string};
          lastupdated: string;
          tokenType : {tokenType : string};
        }) => {
          return {
            image: nft.media[0].gateway,
            name: nft.title,
            id: nft.id.tokenId,
            address: nft.contract.address,
            description: nft.description,
            //
            contractName:nft.contractMetadata.name,
            lastupdated:nft.timeLastUpdated,
            tokenType:nft.contractMetadata.tokenType,
          };
        },
      );
    },
    network() {
      if (this.selectedNetwork === 'ethereum') {
        return {
          url: import.meta.env.VITE_ETHEREUM_API_URL,
          apiKey: import.meta.env.VITE_ETHEREUM_API_KEY,
        };
      } else {
        return {
          url: import.meta.env.VITE_POLYGON_API_URL,
          apiKey: import.meta.env.VITE_POLYGON_API_KEY,
        };
      }
    },
  },
  actions: {
    //함수들을 정의한것.
    setItem(item: string, value: string): void {
      this[item] = value;
    },
    async fetchNFTs(): Promise<void> {
      this.message = '';
      this.loading = true;
      const baseUrl = `${this.network.url}/${this.network.apiKey}/getNFTs`;
      const fetchUrl = `${baseUrl}/?owner=${this.wallet}`;
      //console.log('url:'+fetchUrl);
      
      let nfts = await fetch(fetchUrl, { method: 'GET' });
      nfts = await nfts.json()
      
      //@ts-ignore
      this.nfts = nfts?.ownedNfts;
      console.log(nfts);
      this.nfts.length === 0
        ? (this.message = `No NFTs found in this wallet on ${this.selectedNetwork}`)
        : (this.message = `Found ${this.nfts.length} NFTs in this wallet...`);
      this.loading = false;
    },
    async fetchNFTsCollection(): Promise<void> {
      this.message = '';
      this.loading = true;
      const baseUrl = `${this.network.url}/${this.network.apiKey}/getNFTsForCollection`;
      const fetchUrl = `${baseUrl}/?contractAddress=${
        this.collection
      }&withMetadata=${'true'}`;

      let nfts = await fetch(fetchUrl, { method: 'GET' });
      nfts = await nfts.json();
      //console.log('nftcol');
      //@ts-ignore
      this.nfts = nfts?.nfts;
      this.nfts.length === 0
        ? (this.message = `No NFTs found in this wallet on ${this.selectedNetwork}`)
        : (this.message = `Found ${this.nfts.length} NFTs in this collection...`);
      this.loading = false;
    },
  },
});
