<template>
   <div class="about">
      <div class="left">
         <Aside></Aside>
      </div>
      <div class="right">
         <Nav></Nav>
         <Content></Content>
      </div>
   </div>
</template>
<script>
import Aside from "../components/aside";
import Nav from "../components/nav";
import Content from "../components/content";
export default {
   data() {
      return {};
   },
   components: {
      Aside,
      Nav,
      Content
   }
};
</script>

<style lang="scss" scoped>
.about {
   height: 100%;
   display: flex;
   .right {
      flex: 1;;
   }
}
</style>
