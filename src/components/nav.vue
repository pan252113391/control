<template>
  <div class="nav">
    <i class="el-icon-s-fold" aria-hidden="true" @click="collapse"></i>
    <div class="right">
      <img
        class="img"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584899163231&di=d9aa848f06c623a6f29fdd912db0ebf9&imgtype=0&src=http%3A%2F%2F00imgmini.eastday.com%2Fmobile%2F20200126%2F20200126160003_834bc424914f3de7af7af2e5d0aec732_2.jpeg"
        alt="头像"
      />
      <span class="username">{{username}}</span>
    </div>
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
  computed: {
    username() {
      // return this.$cookies.get('username')  //第一种方法直接反cookie
      return this.$store.getters["storeOne/username"];
    }
  },
  methods: {
    collapse() {
      this.$store.commit("storeOne/MuIsCollapse");
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
  justify-content: space-between;
  padding: 0 20px;
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    .img {
      border-radius: 50%;
      height: 40px;
    }
  }

  .el-icon-s-fold {
    font-size: 30px;
  }
}
</style>
