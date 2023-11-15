<template>
  <form @submit="onsubMit" class="w-[500px] h-[500px]">
    <input
      type="text"
      class="w-[100%] h-[50px] border-2 pl-2 rounded-lg"
      placeholder="fistName..."
      v-bind="name"
    />
    <p>{{ errors.name }}</p>
    <br />
    <input
      type="text"
      class="w-[100%] h-[50px] border-2 pl-2 rounded-lg"
      placeholder="lastName..."
      v-bind="city"
    />
    <p>{{ errors.city }}</p>
    <br />
    <input
      type="text"
      class="w-[100%] h-[50px] border-2 pl-2 rounded-lg"
      placeholder="Age..."
      v-bind="age"
    />
    <p>{{ errors.age }}</p>
    <br />
    <button class="w-[100px] h-[50px] bg-slate-500 text-white">Submit</button>
  </form>
</template>

<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { handPostAPI } from "../../api/user";
import { useForm } from "vee-validate";
import * as yup from "yup";
const queryClient = useQueryClient();
const { mutate } = useMutation({
  mutationFn: (data) => handPostAPI(data),
  onSuccess: () => {
    // queryClient.invalidateQueries => Refresh Query when Add data successfully
    queryClient.invalidateQueries("searchData");
  },
});

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    city: yup.string().required(),
    age: yup.number().required(),
  }),
});
const onsubMit = handleSubmit((value, { resetForm }) => {
  mutate(value);
  resetForm();
});
const name = defineInputBinds("name");
const city = defineInputBinds("city");
const age = defineInputBinds("age");
</script>