<template>
   <div class="aside" :class="{changWidth:!Collapse}">
      
      <el-menu
         default-active="1"
         class="el-menu-vertical-demo"
         background-color="#35495E"
         text-color="#fff"
         active-text-color="#ffd04b"
         :collapse="!Collapse"
         :router="true"
      >
         <template v-for="(items,index) in routes">
            
            <el-submenu :index="index.toString()" :key="items.id" v-if="!items.hidden">
               <template slot="title">
                  <i class="el-icon-s-help"></i>
                  <span>{{items.meta.name}}</span>
               </template>
              
               <el-menu-item
                  v-for="item in items.children"
                  :key="item.id"
                  :index="item.path"
               >{{item.meta.name}}</el-menu-item>
            </el-submenu>
         </template>
      </el-menu>
   </div>
</template>

<script>
export default {
   name: "aside-component",
   data() {
      return {
         
      };
   },
   computed: {
      routes() {
         return this.$router.options.routes;
      },
      Collapse() {
         console.log(this.$store.getters['appOne/getIsCollapse']);
         return this.$store.getters['appOne/getIsCollapse'];
         
      }
   },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aside {
   width: 200px;
   height: 100%;
   transition: all 1s;
   background-color: $bgColor;
}
   .changWidth{
      width:64px;
      
   }
</style>
