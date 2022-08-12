<template>
  <div class="row header">
    <div class="row col-12 col-sm-6 col-md-6 col-lg-6 div-width">
      <img :src="logo" />
      <!-- <h1>{{ msg }}</h1> -->
    </div>
    <div class="col-12 col-sm-6 col-md-6 col-lg-6 div-width">
      <b-dropdown id="dropdown-offset" offset="-110" variant="outline" menu-class="menu-ite" class="dropdown-div">
        <b-dropdown-item>Settings</b-dropdown-item>
        <p v-on:click="logout" class="logout">Logout</p>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { IMAGES } from "../../assets/images";
export default {
  name: "Header",
  props: {
    msg: String
  },
  data() {
    return {
      success: true,
      logo: IMAGES.LOGO
    };
  },
  methods: {
    ...mapActions(["removeUser"]),
    logout() {
      this.removeUser();
    }
  }
};
</script>

<style scoped>
.header {
  background: #cdd2cea1;
  margin: 2px 50px;
  padding: 2px 30px;
  min-height: 80px;
  display: flex;
}

.div-width {
  align-self: center;
}

.div-width .logout {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
.div-width .logout:active {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}
.div-width .dropdown-div {
  float: right;
}

h1 {
  text-align: left;
  color: #f67d15db;
}
@media (max-width: 767px) {
  .header {
    margin: 2px 0px;
  }
}
</style>
