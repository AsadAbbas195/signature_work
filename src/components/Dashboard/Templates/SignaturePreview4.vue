<template>
  <div v-bind:style="{ background: formData.color }" class="template">
    <h1>
      {{ fName + " " + lName }}
    </h1>
    <h3>{{ formData.job_title ? formData.job_title : "Job Title" }}</h3>
    <br />
    <span>
      <FontAwesomeIcon :icon="phoneIcon" />
      <p>
        {{
          formData.contact_number ? formData.contact_number : "Contact Number"
        }}
      </p>
    </span>
    <span>
      <FontAwesomeIcon :icon="locationIcon" />
      <p>{{ formData.address ? formData.address : "Address" }}</p>
    </span>
    <span>
      <a class="website-Link" :href="formData.website_link" target="blank">
        <FontAwesomeIcon :icon="webIcon" />
        <p>{{ formData.website_link ? formData.website_link : "Website" }}</p>
      </a>
    </span>
    <span class="social-icons">
      <div>
        <a class="icons" :href="formData.facebook_link" target="blank">
          <FontAwesomeIcon size="2x" :icon="facebookIcon" />
        </a>
      </div>
      <div>
        <a class="icons" :href="formData.linkedin_link" target="blank">
          <FontAwesomeIcon size="2x" :icon="linkedinIcon" />
        </a>
      </div>
      <div>
        <a class="icons" :href="formData.twitter_link" target="blank">
          <FontAwesomeIcon size="2x" :icon="twitterIcon" />
        </a>
      </div>
    </span>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPhone,
  faGlobe,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default {
  name: "SignaturePreview3",
  props: ["formData"],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      fName: this.formData.first_name ? this.formData.first_name : "First Name",
      lName: this.formData.last_name ? this.formData.last_name : "Last Name",
      phoneIcon: faPhone,
      locationIcon: faLocationArrow,
      webIcon: faGlobe,
      facebookIcon: faFacebook,
      linkedinIcon: faLinkedin,
      twitterIcon: faTwitter,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 900;
}

p {
  font-weight: 500;
  margin: 0 10px;
}

.template {
  text-align: right;
  padding: 15px;
}

.template span {
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  flex-direction: row-reverse;
}

.social-icons div {
  margin: 15px 0;
}
.social-icons .icons {
  margin-right: 10px;
  cursor: pointer;
}
.website-Link {
  color: black;
  display: contents;
  align-items: center;
}
a {
  color: black;
  display: flex;
}
</style>
