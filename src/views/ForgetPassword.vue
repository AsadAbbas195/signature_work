<template>
  <div class="parent-div row col-12 col-sm-12 col-md-12 col-lg-12">
    <div>
      <img class="img-fluid" :src="logo" />
    </div>
    <h1 id="heading">Forget Password</h1>
    <p v-if="formData.errors.length">
      <ErrorList :formData="formData" />
    </p>
    <h3 v-if="formData.success">Reset Link is send to your Email Id</h3>
    <form @submit="submitData" method="post">
      <h5>Email*</h5>
      <input type="email" name="email" v-model="formData.email" />
      <h5>Secret Key*</h5>
      <input type="password" name="secret_key" v-model="formData.secret_key" />
      <br />
      <p v-if="formData.loading">
        <PulseLoader color="#f67d15db" />
      </p>
      <button v-if="!formData.loading" class="login-btn" type="submit">
        Request
      </button>
    </form>
    <router-link class="request-secret" :to="requestSecret">
      Don't have Secret Key
    </router-link>
  </div>
</template>
<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions } from "vuex";
import ErrorList from "@/components/ErrorList";
import { Path } from "../config";
import { IMAGES } from "../assets/images";
export default {
  name: "ForgetPassword",
  components: {
    PulseLoader,
    ErrorList,
  },
  data() {
    return {
      logo: IMAGES.ICONLG,
      requestSecret: Path.requestSecret,
      formData: {
        email: null,
        secret_key: null,
        loading: false,
        errors: [],
        success: false,
      },
    };
  },
  methods: {
    ...mapActions(["setEmail"]),
    submitData(e) {
      e.preventDefault();
      this.setEmail(this.formData);
    },
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
.request-secret {
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
