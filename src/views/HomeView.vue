<script setup >
import { useQuery } from "@tanstack/vue-query";
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import axios from 'axios'
import {  ref } from "vue";
const page = ref(1)
const fetcher = async (page) => {
const {data} = await axios.get(`https://randomuser.me/api/?page=${page}&results=20&seed=abc`)
return data
}
// if main effect
const { isLoading, isError, isFetching, data, error, isPreviousData, status  } = useQuery({
      // if dependency 2 changes Vue will Query to take new Data
      queryKey: ['posts', page],
      queryFn: ({queryKey}) => {
        console.log(queryKey)
        return fetcher(queryKey[1])
      },
      keepPreviousData: true,
      // This property determines whether data from previous pages should be retained when moving from one page to another.
      // retained => giữ lại
      //  If keepPreviousData is set to true, data from the previous page will be retained while loading new data.
      //   This is useful to avoid the jumping effect between pages when new data has not yet been loaded.
})
console.log(status);
const handNextPage = () => {
  page.value = page.value + 1;
}
console.log(page.value);
const handPrevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}
console.log(isPreviousData);
</script>

<template>
  <main>
    <h1>Post</h1>
    <div>
      <button @click="handPrevPage">Prev Page</button><button @click="handNextPage">Next Page</button>
    </div>
    <h2>Current Page: {{ page }} | Previous data: {{ isPreviousData }}</h2>
    <div v-if="isLoading">Loading.....</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <h1 v-else-if="data" v-for="item in data.results" :key="item.id.value">
     <h1 v-if="isLoading" >Loading</h1>
     <p v-else>{{ item.name.first }} - {{ item.name.last }}</p>
    </h1>
    <VueQueryDevtools />
  </main>
</template>
