<template>
  <ul>
    <li class="error" v-for="e in formData.errors" v-bind:key="e.id">
      {{ e }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ErrorList",
  props: ["formData"]
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: 700;
}

ul {
  list-style: none;
}
</style>
