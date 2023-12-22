<template>
  <div class="w-[800px] flex flex-col items-center">
    <div class="w-[800px] h-[100px]">
      <input
        type="text"
        placeholder="Search..."
        class="w-[300px] h-[50px] border-2 pl-2"
        v-model="search"
      /><button
        class="w-[100px] h-[50px] bg-slate-500 text-white ml-2"
        @click="handSearch"
      >
        Search
      </button>
    </div>
    <table
      class="table-auto border-2 border-[#A9A9A9] w-[800px] text-center scroll-m-52"
    >
      <thead>
        <tr>
          <th>Fist Name</th>
          <th>Age</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataSearch" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.city }}</td>
          <td>
            <button
              class="w-[100px] h-[50px] bg-[#96B6C5] text-white mr-2 rounded-lg"
              @click="handDelete(item.id)"
            >
              Delete
            </button>
            <button
              class="w-[100px] h-[50px] bg-[#96C291] text-white rounded-lg"
              @click="handEdit(item.id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-[800px] h-[50px] flex justify-center items-center">
      <div class="w-[30%] h-[90%] flex">
        <div class="w-[37%] h-full flex justify-center items-center">
          <button
            class="w-full h-full border-2 rounded-l-lg hover:pb-2 transition-all"
            @click="handPrevPage"
          >
            Prev Page
          </button>
        </div>
        <div class="w-[26%] h-full flex justify-center items-center border-y-2">
          <p>{{ page }}</p>
        </div>
        <div class="w-[37%] h-full flex justify-center items-center">
          <button
            class="w-full h-full border-2 rounded-r-lg hover:pb-2 transition-all"
            @click="handNextPage"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { handDeleteAPI, handSearchAPI } from "../../api/user";
import { onMounted, ref } from "vue";
import axios from "axios";
const emit = defineEmits();
const page = ref(1);
const props = defineProps(["state"]);
const search = ref("");
const queryClient = useQueryClient();

const { mutateAsync: mudateDelete } = useMutation({
  mutationFn: (id) => handDeleteAPI(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["searchData"], exact: true });
  },
});
const { data: dataSearch, refetch } = useQuery({
  queryKey: ["searchData", page],
  queryFn: () => handSearchAPI(page.value, search.value),
  //todo StaleTime is in 10000 => 10 seconds within 10 seconds it will be considered new in 10 seconds, is's call API
  staleTime: 10000,
  select: (data) => data.data,
  retry: 5,
  keepPreviousData: true,
});
const handDelete = async (id) => {
  if (confirm("Are you sure you want to delete")) {
    await mudateDelete(id);
    refetch(dataSearch);
  }
};
const handNextPage = () => {
  page.value = page.value + 1;
};
const handPrevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};
const handSearch = async () => {
  refetch();
};
const handEdit = (id) => {
  emit("setState", { state: props.state, id });
};
</script>
