import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("data", () => {
  const listData = ref([]);

  const handDeleteData = (id) => {
    console.log(id);
    listData.value = listData.value.filter((item) => item.id != id);
    console.log(listData.value);
  };

  return { fuctionGetData, listData, handDeleteData };
});
