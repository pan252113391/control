<template>
   <div class="content">

         <router-view></router-view>
      
   </div>
</template>

<script>
export default {
   name: "content-component",

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content{
   background-color: #ffffff;
   height: calc(100% - 87px);
   margin: 20px 0 0 20px;
   box-sizing: border-box;
}
</style>
