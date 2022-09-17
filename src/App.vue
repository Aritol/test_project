<template>
  <div>
    <drop-down-menu />
    <my-input />
  </div>
</template>

<script>
import DropDownMenu from "@/components/DropDownMenu";
import MyInput from "@/components/MyInput";
export default {
  name: "App",
  components: {
    DropDownMenu,
    MyInput,
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
</style>
