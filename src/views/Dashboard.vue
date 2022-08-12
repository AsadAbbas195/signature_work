<template>
  <div>
    <Header msg="Signature" />
    <user-component />
  </div>
</template>

<script>
import Header from "../components/Dashboard/Header";
import UserComponent from "../components/Dashboard/UserComponent";
export default {
  name: "Dashboard",
  components: {
    Header,
    UserComponent
  }
};
</script>
