<template>
  <ContactUs :captcha="captcha" :url="url" />
</template>
<script lang="ts">
import ContactUs from "./components/ContactUs/index.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    ContactUs,
  },
  props: {
    captcha: {
      type: String,
    },
    url: {
      type: String,
    }
  }

})
export default class PaseoContactUs extends Vue {}
</script>
<style lang="scss"></style>
