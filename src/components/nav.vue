<template>
   <div class="nav">
      <i class="el-icon-s-fold" aria-hidden="true" @click="collapse"></i>
   </div>
</template>

<script>
export default {
   name: "nav-component",
   data() {
      return {
         isCollapse: false
      };
   },
   methods: {
      collapse() {
        this.$store.commit('appOne/MuIsCollapse', this.isCollapse);
          this.isCollapse = !this.isCollapse;
          console.log(this.isCollapse);
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
   height: 60px;
   background-color: #fff;
   -moz-box-shadow: 5px 5px 5px #333333;
   -webkit-box-shadow: 5px 5px 5px #333333;
   box-shadow: 5px 5px 2px #333333;
   margin: 0 7px 7px 0;
   display: flex;
   align-items: center;

   .el-icon-s-fold {
      font-size: 30px;
      padding-left: 10px;
   }
}
</style>
