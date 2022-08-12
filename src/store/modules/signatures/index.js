import axios from "axios";
import { API_PATH } from "../../../config";
const signatures = {
  state: {
    sign: []
  },
  getters: {
    getAllSignatures: state => {
      return state.sign;
    }
  },
  mutations: {
    setSignature: (state, signature) => {
      state.sign = [];
      state.sign = [signature, state.sign];
    }
  },
  actions: {
    requestSignature: (context, signature) => {
      signature.errors = [];
      const user_id = context.rootState.userAuthentication.user[0].id;
      if (
        signature.first_name &&
        signature.last_name &&
        signature.job_title &&
        signature.company_name &&
        signature.contact_number &&
        signature.address
      ) {
        signature.loading = true;
        const data = {
          signature_managers: {
            first_name: signature.first_name,
            last_name: signature.last_name,
            job_title: signature.job_title,
            company_name: signature.company_name,
            contact_number: signature.contact_number,
            address: signature.address,
            website_link: signature.website_link,
            facebook_link: signature.facebook_link,
            linkedin_link: signature.linkedin_link,
            twitter_link: signature.twitter_link,
            color: signature.color,
            template: signature.template,
            user_id: user_id
          }
        };
        axios.post(API_PATH.requestSignature, data).then(
          response => {
            signature.loading = false;
            context.commit("setSignature", response.data);
          },
          error => {
            signature.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              signature.errors.push(error.response.data.messages);
            }
            else {
              signature.errors.push(error.message)
            }
          }
        );
      } else {
        if (!signature.first_name) {
          signature.errors.push("First Name is Required");
        }
        if (!signature.last_name) {
          signature.errors.push("Last Name is Required");
        }
        if (!signature.job_title) {
          signature.errors.push("Job Title is Required");
        }
        if (!signature.company_name) {
          signature.errors.push("Company is Required");
        }
        if (!signature.contact_number) {
          signature.errors.push("Contact Number is Required");
        }
        if (!signature.address) {
          signature.errors.push("Address is Required");
        }
      }
    },
    getDetail: (context, data) => {
      const user_id = context.rootState.userAuthentication.user[0].id;
      const API = `${API_PATH.getUserDetail}${user_id}`;
      axios.get(API).then(
        response => {
          context.commit("setSignature", response.data);
          if (response.data) {
            data.formData.first_name = response.data.first_name;
            data.formData.last_name = response.data.last_name;
            data.formData.job_title = response.data.job_title;
            data.formData.company_name = response.data.company_name;
            data.formData.contact_number = response.data.contact_number;
            data.formData.address = response.data.address;
            data.formData.website_link = response.data.website_link;
            data.formData.facebook_link = response.data.facebook_link;
            data.formData.linkedin_link = response.data.linkedin_link;
            data.formData.twitter_link = response.data.twitter_link;
            data.formData.color = response.data.color;
            data.formData.template = response.data.template;
            data.is_approved = response.data.is_approved;
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    updateSignature: (context, signature) => {
      signature.errors = [];
      const user_id = context.rootState.userAuthentication.user[0].id;
      if (
        signature.first_name &&
        signature.last_name &&
        signature.job_title &&
        signature.company_name
      ) {
        signature.loading = true;
        const data = {
          signature_managers: {
            first_name: signature.first_name,
            last_name: signature.last_name,
            job_title: signature.job_title,
            company_name: signature.company_name,
            contact_number: signature.contact_number,
            address: signature.address,
            website_link: signature.website_link,
            facebook_link: signature.facebook_link,
            linkedin_link: signature.linkedin_link,
            twitter_link: signature.twitter_link,
            color: signature.color,
            template: signature.template,
            user_id: user_id
          }
        };
        const API = `${API_PATH.getUserDetail}${user_id}`;
        axios.put(API, data).then(
          response => {
            signature.loading = false;
            context.commit("setSignature", response.data);
          },
          error => {
            signature.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              signature.errors.push(error.response.data.messages);
            }
            else {
              signature.errors.push(error.message)
            }
            
          }
        );
      } else {
        if (!signature.first_name) {
          signature.errors.push("First Name is Required");
        }
        if (!signature.last_name) {
          signature.errors.push("Last Name is Required");
        }
        if (!signature.job_title) {
          signature.errors.push("Job Title is Required");
        }
        if (!signature.company_name) {
          signature.errors.push("Company is Required");
        }
      }
    }
  }
};
export default signatures;
