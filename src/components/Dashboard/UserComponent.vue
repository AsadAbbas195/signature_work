<template>
  <div>
    <div id="google-signin-btn"></div>
    <h1 id="heading">Signature</h1>
    <h5>Please Fill This Form</h5>
    <p v-if="formData.errors.length">
      <ErrorList :formData="formData" />
    </p>
    <b-alert
      v-if="
        this.getAllSignatures &&
        this.getAllSignatures[0] &&
        this.getAllSignatures[0].first_name !== null &&
        this.getAllSignatures[0].is_approved !== true
      "
      show
      class="alert-box"
      variant="danger"
    >
      Your Resquest is Sent For Approval.
    </b-alert>
    <form @submit="submitData" method="post">
      <h4>First Name*</h4>
      <input type="text" name="first_name" v-model="formData.first_name" />
      <h4>Last Name*</h4>
      <input type="text" name="last_name" v-model="formData.last_name" />
      <h4>Job Title*</h4>
      <input type="text" name="job_title" v-model="formData.job_title" />
      <h4>Company*</h4>
      <input type="text" name="company_name" v-model="formData.company_name" />
      <h4>Contact Number*</h4>
      <input
        type="tel"
        name="contact_number"
        v-model="formData.contact_number"
        pattern="\+?\d+"
      />
      <h4>Address*</h4>
      <input type="text" name="address" v-model="formData.address" />
      <h4>Website Link</h4>
      <input type="url" name="website_link" v-model="formData.website_link" />
      <h4>Facebook Link</h4>
      <input type="url" name="facebook_link" v-model="formData.facebook_link" />
      <h4>LinkedIn Link</h4>
      <input type="url" name="linkedin_link" v-model="formData.linkedin_link" />
      <h4>Twitter Link</h4>
      <input type="url" name="twitter_link" v-model="formData.twitter_link" />
      <h4>Color*</h4>
      <input type="color" name="color" v-model="formData.color" />
      <br />
      <br />
      <Templates :formData="formData" />
      <br />
      <p v-if="formData.loading">
        <PulseLoader color="#f67d15db" />
      </p>
      <button v-if="!formData.loading" class="login-btn" type="submit">
        {{
          this.getAllSignatures &&
          this.getAllSignatures[0] &&
          this.getAllSignatures[0].first_name !== null
            ? "Update"
            : "Create"
        }}
      </button>
    </form>
    <div id="btnDiv">
      <div id="sign-in-div" v-if="is_signed_in === false">
        <span id="sign-in" @click="handleAuthClick()"> Connect Google </span>
      </div>
      <div id="sign-out-div" v-if="is_signed_in === true">
        <span id="sign-out" @click="handleAuthClick()"> Sign Out </span>
      </div>
      <div id="error-msg"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Templates from "../Dashboard/Templates/Templates";
import ErrorList from "@/components/ErrorList";
import axios from "axios";
import { API_PATH } from "../../config";

export default {
  name: "UserComponent",
  components: {
    PulseLoader,
    Templates,
    ErrorList,
  },
  computed: mapGetters(["getAllSignatures", "userData", "AuthData"]),
  data() {
    return {
      formData: {
        loading: false,
        errors: [],
        first_name: null,
        last_name: null,
        job_title: null,
        company_name: null,
        contact_number: null,
        address: null,
        website_link: null,
        facebook_link: null,
        linkedin_link: null,
        twitter_link: null,
        color: "#f67d15db",
        template: 1,
      },
      is_approved: null,
      btnName: "Create",
      is_signed_in: false,
    };
  },
  methods: {
    ...mapActions([
      "requestSignature",
      "getDetail",
      "updateSignature",
      "removeUser",
    ]),
    initClient() {
      window.gapi.client
        .init({
          apiKey: this.AuthData[0].google_api_key,
          clientId: this.AuthData[0].google_client_id,
          scope: this.AuthData[0].google_scope,
        })
        .then(this.setSigninStatus);
    },
    handleAuthClick() {
      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      if (GoogleAuth.isSignedIn.get()) {
        GoogleAuth.signOut();
        this.setSigninStatus();
      } else {
        GoogleAuth.currentUser
          .get()
          .grantOfflineAccess()
          .then(this.setAuthAndSignin);
      }
    },
    setAuthAndSignin(resp) {
      var AUTH_CODE = resp.code;
      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      var user = GoogleAuth.currentUser.get();
      var email = user.getBasicProfile().getEmail();
      axios
        .post(API_PATH.updateGoogleAut, { code: AUTH_CODE, email: email })
        .then(
          (response) => {
            if (response.data.is_success) {
              this.setSigninStatus();
            } else {
              this.revokeGoogleAuth();
            }
          },
          (error) => {
            error;
            this.revokeGoogleAuth();
          }
        );
    },
    setSigninStatus() {
      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
      this.updateSigninStatus();
    },
    updateSigninStatus() {
      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      var user = GoogleAuth.currentUser.get();
      var isAuthorized = user.hasGrantedScopes(this.AuthData[0].google_scope);
      if (isAuthorized) {
        this.is_signed_in = true;
      } else {
        this.is_signed_in = false;
      }
    },
    revokeGoogleAuth() {
      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.disconnect();
      GoogleAuth.signOut();
      alert(
        "You are not authorized with this email, please connect right one."
      );
      this.is_signed_in = false;
    },
    submitData(e) {
      e.preventDefault();
      if (this.getAllSignatures && this.getAllSignatures[0]) {
        this.updateSignature(this.formData);
      } else {
        this.requestSignature(this.formData);
      }
    },
  },
  created() {
    let data = {
      formData: this.formData,
      is_approved: this.is_approved,
    };

    window.gapi.load("client:auth2", this.initClient);
    this.getDetail(data);
  },
};
</script>

<style scoped>
h4 {
  color: #f67d15db;
  font-weight: 700;
  margin: 4px 0px;
  text-transform: uppercase;
}

.error {
  color: red;
  font-weight: 700;
}

ul {
  list-style: none;
}

input {
  padding: 0px 5px;
  margin: 4px 0px;
  border-radius: 4px;
  height: 30px;
  width: 200px;
  border: 3px solid darkgray;
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

.alert-box {
  width: 300px;
  margin: 20px auto;
  padding: 25px 0px;
}

#heading {
  color: #f67d15db;
}

.modal-title {
  text-align: center;
}
</style>
