<template>
  <div class="parent-div row col-12 col-sm-12 col-md-12 col-lg-12">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 blankdiv"></div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 form-div">
      <img :src="logo" />
      <!-- <h1 id="heading">Signature</h1> -->
      <h3>Welcome Back Please Login</h3>
      <p v-if="formData.errors.length">
        <ErrorList :formData="formData" />
      </p>
      <form @submit="submitData" method="post">
        <h5>Email</h5>
        <input type="email" name="email" v-model="formData.email" />
        <h5>Password</h5>
        <input type="password" name="password" v-model="formData.password" />
        <br />
        <p v-if="formData.loading">
          <PulseLoader color="#f67d15db" />
        </p>
        <button v-if="!formData.loading" class="login-btn" type="submit">
          Login
        </button>
      </form>
      <router-link class="forget-password" :to="forgetPath">
        Forget Password
      </router-link>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { Path } from "../config";
import ErrorList from "@/components/ErrorList";
import { mapActions } from "vuex";
import { IMAGES } from "../assets/images";
export default {
  name: "SignIn",
  components: {
    PulseLoader,
    ErrorList
  },
  data() {
    return {
      forgetPath: Path.forgetPassword,
      logo: IMAGES.ICONLG,
      success: true,
      formData: {
        email: null,
        password: null,
        loading: false,
        errors: []
      }
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    submitData(e) {
      e.preventDefault();
      this.setUser(this.formData);
    }
  }
};
</script>

<style scoped>
h5 {
  margin: 5px 0px;
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

.parent-div {
  min-height: 100vh;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
}

.blankdiv {
  background-color: #f67d15db;
  width: 50%;
}

#heading {
  color: #f67d15db;
  font-size: 20px;
  font-weight: 700;
}

input {
  padding: 0px 5px;
  margin: 4px 0px;
  border-radius: 4px;
  height: 30px;
  width: 200px;
  border: 3px solid darkgray;
}
.forget-password {
  float: right;
  cursor: pointer;
  font-weight: 900;
  text-align: center;
  align-self: center;
  align-items: center;
  align-content: center;
  margin: 0;
  color: #f67d15db;
}
@media (max-width: 767px) {
  .blankdiv {
    display: none;
  }
}
</style>
