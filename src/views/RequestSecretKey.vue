eslint-disable
<template>
  <div class="parent-div row col-12 col-sm-12 col-md-12 col-lg-12">
    <div>
      <img class="img-fluid" :src="logo" />
    </div>
    <h1 id="heading">Request Key</h1>
    <p v-if="formData.errors.length">
      <ErrorList :formData="formData" />
    </p>
    <div v-if="formData.success">
      <b-alert show variant="success">
        <h4 class="alert-heading">Success</h4>
        <p>Secret Key is Send To Your Registered Email.</p>
        <hr />
        <router-link class="alert-btn" :to="forgetPassword">Close</router-link>
      </b-alert>
    </div>
    <form @submit="submitData" method="get">
      <h5>Email*</h5>
      <input type="email" name="email" v-model="formData.email" />
      <br />
      <p v-if="formData.loading">
        <PulseLoader color="#f67d15db" />
      </p>
      <button v-if="!formData.loading && !formData.success" class="login-btn" type="submit">Request Key</button>
    </form>
  </div>
</template>
<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions } from "vuex";
import { Path } from "../config";
import ErrorList from "@/components/ErrorList";
import { IMAGES } from "../assets/images";
export default {
  name: "RequestSecretKey",
  components: {
    PulseLoader,
    ErrorList
  },
  data() {
    return {
      logo: IMAGES.ICONLG,
      forgetPassword: Path.forgetPassword,
      formData: {
        email: null,
        loading: false,
        errors: [],
        success: false
      }
    };
  },
  methods: {
    ...mapActions(["requestKey"]),
    submitData(e) {
      e.preventDefault();
      this.requestKey(this.formData);
    }
  }
};
</script>

<style scoped>
h5 {
  margin: 5px 0px;
}
h3 {
  color: #17f031;
  font-weight: 900;
}
.form-div {
  align-self: center;
  margin: auto;
}

.error {
  color: red;
  font-weight: 700;
}

ul {
  list-style: none;
}
.alert-btn {
  cursor: pointer;
  font-weight: 900;
  text-align: center;
  align-self: center;
  align-items: center;
  align-content: center;
  color: black;
}
.login-btn {
  margin: 25px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #4d4de8;
  background: #4d4de8;
  padding: 5px;
}

#heading {
  color: #f67d15db;
  font-size: 20px;
  font-weight: 700;
}
.parent-div {
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  margin: 10px auto;
}
img {
  margin-bottom: 15px;
}
input {
  padding: 0px 5px;
  margin: 4px 0px;
  border-radius: 4px;
  height: 30px;
  width: 200px;
  border: 3px solid darkgray;
}
</style>
