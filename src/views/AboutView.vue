<template>
  <div class="w-[100vw] h-[100vh] flex justify-around items-center">
    <AddProduct />
    <ListProduct :state="state" @setState="handOpend" />
    <Update v-if="state" :id="idData" @value="handCloseModel" />
  </div>
</template>


<script setup>
import { ref } from "vue";
const state = ref(false);
const idData = ref("");

import ListProduct from "../components/CRUD/ListProduct.vue";
import AddProduct from "../components/CRUD/AddProduct.vue";
import Update from "../components/CRUD/Update.vue";

const handOpend = (value) => {
  idData.value = value.id;
  state.value = !value.state;
};
const handCloseModel = () => {
  state.value = false;
};
</script>