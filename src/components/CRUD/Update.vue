<template>
  <div
    class="w-full h-[100vh] backdrop-blur-sm flex justify-center items-center fixed top-0"
  >
    <form @submit="onsubMit" class="w-[500px] h-[500px] bg-white p-5">
      <div class="w-full h-[100px] flex justify-center items-center">
        <h1 class="text-2xl">Update Data</h1>
      </div>
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
  </div>
</template>

<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { handUpdateAPI } from "../../api/user";

const props = defineProps(["id"]);
const emit = defineEmits();

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (data) => handUpdateAPI(props.id, data),
  onSuccess: (data) => {
    // setQueryData Update Data
    queryClient.setQueryData(["searchData", props.id], data);
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
  emit("value", value);
  resetForm();
});
const name = defineInputBinds("name");
const city = defineInputBinds("city");
const age = defineInputBinds("age");
</script>

<style lang="scss" scoped>
</style>