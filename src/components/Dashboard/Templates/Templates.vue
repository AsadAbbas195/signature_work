<template>
  <div>
    <h1 id="heading">Signature Templates</h1>
    <div class="template-parent">
      <div class="template">
        <div>
          <!-- <input type="radio" id="one" value="1" v-model="formData.template" /> -->
          <figure>
            <label>
              <img :src="templateImage" alt="" class="img-responsive" />
            </label>
            <figcaption>
              <span @click="previewTemplate()">Preview</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
    <!-- <div>
 <input type="radio" id="two" value="2" v-model="formData.template" />
          <figure>
            <label>
              <img :src="templateImage" alt="" class="img-responsive" />
            </label>
            <figcaption>
              <span @click="previewTemplate(2)">Preview</span>
            </figcaption>
          </figure>
        </div>
        <div>
       <input type="radio" id="one" value="3" v-model="formData.template" /> 
          <figure>
            <label>
              <img :src="templateImage" alt="" class="img-responsive" />
            </label>
            <figcaption>
              <span @click="previewTemplate(3)">Preview</span>
            </figcaption>
          </figure>
        </div>
        <div>
         <input type="radio" id="two" value="4" v-model="formData.template" /> 
          <figure>
            <label>
              <img :src="templateImage" alt="" class="img-responsive" />
            </label>
            <figcaption>
              <span @click="previewTemplate(4)">Preview</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div> -->
    <b-modal title="Preview" centered id="bv-modal-example" v-model="show">
      <TemplateModal :formData="formData" />
    </b-modal>
  </div>
</template>
<script>
import TemplateModal from "./TemplateModal";
import { IMAGES } from "../../../assets/images";
export default {
  name: "Templates",
  components: {
    TemplateModal
  },
  props: ["formData"],
  data() {
    return {
      show: false,
      templateImage: IMAGES.LOGO
    };
  },
  methods: {
    previewTemplate() {
      this.formData.template = parseInt(this.formData.template);
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
.template-parent {
  display: flex;
}

.template-parent div.template {
  display: flex;
  margin: 0 auto;
}

.template-parent figure {
  margin: 15px;
}

.template-parent figure img {
  cursor: pointer;
}
figcaption {
  margin: 5px 0px;
}
.modal-btn {
  width: 50px;
  margin: 0 auto;
}

.template-parent figure span {
  cursor: pointer;
  background: #f67d15db;
  padding: 7px;
  border: 1px solid #f0750b;
  border-radius: 5px;
  color: #fff;
  font-weight: 800;
}

.template div {
  display: flex;
  margin: auto;
  align-items: center;
}
input[type="radio"] {
  padding: 0px 5px;
  margin: 4px 0px;
  border-radius: 4px;
  height: 30px;
  width: 50px;
  border: 3px solid darkgray;
}
#heading {
  color: #f67d15db;
  font-weight: 700;
  margin: 4px 0px;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .template-parent div.template {
    display: block;
  }
}
</style>
