<template>
  <div class="main_container">
    <form-load />
  </div>
</template>

<script>
import FormLoad from "@/components/FormLoad";

export default {
  name: "App",
  components: {
    FormLoad,
  },
};
</script>

<style>
@import "@/assets/styles/null.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50;
  margin-top: 60px; */
}
.main_container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}
</style>
