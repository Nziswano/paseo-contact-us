<template>
  <div>
    <h1>Hello World!</h1>
    <Register />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Register from "./components/register/Register.vue";

  @Component({
    components: {
      Register,
    }
  })
  export default class App extends Vue {
    public msg: string = "Hello there, Vue works!123";

    constructor() {
      super();
    }
  }
</script>
<style lang="scss">
  h1 {
    font-weight: bold;
  }
</style>
