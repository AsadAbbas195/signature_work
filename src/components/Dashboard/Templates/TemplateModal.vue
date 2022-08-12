<template>
  <div>
    <div v-if="formData.template === 1">
      <SignaturePreview1 :formData="formData" />
    </div>
    <div v-if="formData.template === 2">
      <SignaturePreview2 :formData="formData" />
    </div>
    <div v-if="formData.template === 3">
      <SignaturePreview3 :formData="formData" />
    </div>
    <div v-if="formData.template === 4">
      <SignaturePreview4 :formData="formData" />
    </div>
  </div>
</template>

<script>
import SignaturePreview1 from "./SignaturePreview1";
import SignaturePreview2 from "./SignaturePreview2";
import SignaturePreview3 from "./SignaturePreview3";
import SignaturePreview4 from "./SignaturePreview4";
export default {
  name: "TemplateModal",
  props: ["formData"],
  components: {
    SignaturePreview1,
    SignaturePreview2,
    SignaturePreview3,
    SignaturePreview4
  }
};
</script>
