<script setup>
import { useStore } from '@/store';

const store = useStore();
let props = defineProps({
    idxNums:Number
})
console.log(props.idxNums);
</script>
<template>
    <div class="modal">
        <div class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        TITLE : {{ store.gallery[idxNums].name }}
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        ADDRESS : {{ store.gallery[idxNums].address }}
                        <br>
                        DESCIPTION : {{ store.gallery[idxNums].description }}
                        <br>
                        TOKEN ID : {{ store.gallery[idxNums].id }}
                        <br>
                        CONTRACT NAME : {{ store.gallery[idxNums].contractName }}
                        <br>
                        LAST UPDATE : {{ store.gallery[idxNums].lastupdated }}
                        <br>
                        TOKEN TYPE : {{ store.gallery[idxNums].tokenType }}
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <br>
                        <button class="modal-default-button" @click="$emit('clickstate')">CLOSE</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.modal-mask{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}
.modal-wrapper{
    display: table-cell;
    vertical-align: middle;
}
.modal-container{
    width: 80%;
    margin: 0px auto;
    margin-top: 500px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    justify-content: center;
    align-items: center;
}
.modal-header{
    margin-top: 0;
    color: #42b983;
}
.modal_body{
    margin: 20px 0;
}
.modal-default-button{
    background-color: goldenrod;
    float: right;
}
.modal-enter{
    opacity: 0;
}
.modal-leave-active{
    opacity: 0;
}
.modal_enter .modal-container, .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.modal_body, .modal{
    color: #666;
}
</style>