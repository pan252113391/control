<template>
   <div class="login">
      <div class="login_wrap">
         <!-- 登录、注册 -->
         <div class="login_top">
            <span
               :class="{nav_top: navItem.module == item.module}"
               v-for="item in navTab"
               :key="item.id"
               @click="showbg(item)"
            >{{item.name}}</span>
         </div>

         <!-- input列表 -->
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <!-- 邮箱 -->
            <label>邮箱</label>
            <el-form-item prop="email">
               <el-input type="text" :clearable="true" v-model="ruleForm.email" autocomplete="on"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <label>密码</label>
            <el-form-item prop="password">
               <el-input
                  type="password"
                  :clearable="true"
                  v-model="ruleForm.password"
                  autocomplete="off"
               ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <label v-if="navItem.module !== 'login'">确认密码</label>
            <el-form-item prop="checkPass" v-if="navItem.module !== 'login'">
               <el-input
                  type="password"
                  :clearable="true"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
               ></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <label>验证码</label>
            <el-row :gutter="10" class="input_wrapper">
               <el-col :span="14" class="input_left">
                  <el-form-item prop="code">
                     <el-input :clearable="true" type="text" v-model="ruleForm.code"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="10">
                  <!-- 获取验证码按钮 -->
                  <el-button
                     @click="getCodeData"
                     type="success"
                     class="button"
                     :disabled="isDisabled.getCode"
                  >{{codeButton}}</el-button>
               </el-col>
            </el-row>
            <el-form-item>
               <el-button
                  type="primary"
                  :disabled="isDisabled.submit"
                  class="button"
                  @click="submitForm()"
               >{{loginOrRgister}}</el-button>
            </el-form-item>
         </el-form>
      </div>
      <button>{{msg}}</button>
   </div>
</template>
<script>
import cookie from 'vue-cookies';
import { ApiGetSms, ApiRegister } from ".././api/loginApi.js";
import { passWord, email } from "../util/verify.js";
import { getToken } from "../util/cookie";

export default {
   data() {
      //   邮箱
      var validateEmail = (rule, value, callback) => {
         if (value === "") {
            callback(new Error("请输入邮箱"));
         } else if (!email(value)) {
            callback(new Error("邮箱格式错误"));
         } else {
            callback();
         }
      };
      //   密码
      var validatepassWord = (rule, value, callback) => {
         if (value === "") {
            callback(new Error("请输入密码"));
         } else if (!passWord(value)) {
            callback(new Error("密码格式错误"));
         } else {
            callback();
         }
      };
      //   确认密码
      var checkPassWord = (rule, value, callback) => {
         if (value === "") {
            callback(new Error("请再次输入密码"));
         } else if (value !== this.ruleForm.password) {
            callback(new Error("两次输入密码不一致!"));
         } else {
            callback();
         }
      };
      //   验证码
      var checkCode = (rule, value, callback) => {
         if (value === "") {
            callback(new Error("请输入验证码"));
         } else {
            callback();
         }
      };

      return {
         ruleForm: {
            email: "252113391@qq.com",
            password: "",
            checkPass: "",
            code: ""
         },
         rules: {
            email: [{ validator: validateEmail, trigger: "blur" }],
            passWord: [{ validator: validatepassWord, trigger: "blur" }],
            code: [{ validator: checkCode, trigger: "blur" }],
            checkPass: [{ validator: checkPassWord, trigger: "blur" }]
         },
         navTab: [
            { name: "登录", type: false, module: "login" },
            { name: "注册", type: true, module: "register" }
         ],
         navItem: { name: "登录", type: false, module: "login" }, //给个默认值
         isDisabled: {
            submit: true,
            getCode: false
         },
         time: 10,
         codeButton: "获取验证码",
         timer: null
      };
   },
   computed: {
      loginOrRgister() {
         if (this.navItem.module !== "login") {
            return "注册";
         } else {
            return "登录";
         }
      },
       msg(){
          return getToken();  
      },
   },
   methods: {

      //点击登录、注册
      showbg(item) {
         // 改变点击时登录注册的背景颜色
         this.navItem = item;
         //登录注册切换时，清空input数据
         this.$refs.ruleForm.resetFields();
         //或者
         //  this.$refs['ruleForm'].resetFields();

         // 清除定时器
         clearInterval(this.timer);
         console.log(this.time);
         this.time = 10;
         this.codeButton = "获取验证码";
         this.isDisabled = false;
      },
      //获取数据和错误弹窗
      getCodeData() {
         if (!this.ruleForm.email) {
            this.$message({
               showClose: true,
               message: "邮箱不能为空",
               type: "error"
            });
            return;
         }
         if (!email(this.ruleForm.email)) {
            this.$message({
               showClose: true,
               message: "邮箱格式错误",
               type: "error"
            });
            return;
         }
         // 改变禁用状态
         this.isDisabled = {
            submit: false,
            getCode: true
         };

         //请求参数
         if (this.navItem.module !== "login") {
            console.log("注册验证码");
            this.requstRegisterCode();
         } else {
            console.log("登录验证码");
            this.requstLoginCode();
         }
      },
      // 登录验证码封装
      requstLoginCode() {
         this.codeButton = "发送中...";
         let loginData = {
            username: this.ruleForm.email,
            module: "login"
         };
         //传参并获取数据
         ApiGetSms(loginData)
            .then(res => {
               console.log(res);
               // 邮箱发送成功后弹窗
               this.popup(res.data, "success");
               // 请求成功后开始倒计时
               this.timeDown();
            })
            .catch(err => {
               // 邮箱发送失败后弹窗
               this.popup(err, "error");
               this.codeButton = "重新获取";
               this.isDisabled.getCode = false;
            });
      },
      // 注册验证码封装
      requstRegisterCode() {
         this.codeButton = "发送中...";
         let registerData = {
            username: this.ruleForm.email,
            module: "register"
         };
         ApiGetSms(registerData)
            .then(res => {
               console.log(res);
               // 邮箱发送成功后弹窗
               this.popup(res.data, "success");
               // 请求成功后开始倒计时
               this.timeDown();
            })
            .catch(err => {
               console.log(err);
               // 邮箱发送失败后弹窗
               this.popup(err, "error");
               this.codeButton = "重新获取";
               this.isDisabled.getCode = false;
            });
      },
      // 登录或注册按钮
      submitForm() {
         this.$refs["ruleForm"].validate(valid => {
            if (valid) {
               if (this.navItem.module !== "login") {
                  //   注册接口
                  this.register();
               } else {
                  // 登录接口
                  let userdata = {
                     username: this.ruleForm.email,
                     password: this.ruleForm.password,
                     code: this.ruleForm.code
                  };
                  this.$store
                     .dispatch("storeOne/login", userdata)
                     .then(res => {
                        console.log("这里是login");
                        this.$router.push('/control')
                        console.log(res);
                     });
               }
            } else {
               return false;
            }
         });
      },
      // 注册按钮
      register() {
         let userdata = {
            username: this.ruleForm.email,
            password: this.ruleForm.password,
            code: this.ruleForm.code
         };
         console.log(userdata);
         ApiRegister(userdata)
            .then(res => {
               // 转换至登录窗口
               this.navItem = { name: "登录", type: false, module: "login" };
               // 清空input数据 elementui自带方法
               this.$refs.ruleForm.resetFields();
               console.log(res);
            })
            .catch(err => {});
      },
      //点击后60秒倒计时封装
      timeDown() {
         this.timer = setInterval(() => {
            this.time--;
            this.codeButton = `倒计时${this.time}秒`;
            if (!this.time) {
               this.codeButton = "重新获取";
               clearInterval(this.timer);
               this.time = 10;
               // 改变按钮禁用状态
               this.isDisabled.getCode = false;
            }
         }, 1000);
      },
      //延迟3秒弹窗函数封装
      popup(resErr, type) {
         let setTime = setTimeout(() => {
            this.$message({
               showClose: true,
               message: resErr.message,
               type: type
            });
            clearTimeout(setTime);
         }, 5000);
      }
   }
};
</script>
<style lang="scss" scoped>
.login {
   background-color: $bgColor;
   height: 100vh;
}
.login_wrap {
   width: 300px;
   position: fixed;
   left: 50%;
   top: 10rem;
   transform: translate(-50%);
   label {
      display: block;
      color: #fff;
      padding: 10px 0;
   }
   .login_top {
      text-align: center;
      margin-bottom: 2rem;
      span {
         display: inline-block;
         height: 3rem;
         width: 10rem;
         color: #fff;
         border-radius: 10px;
         line-height: 3rem;
      }
      .nav_top {
         background-color: rgba(0, 0, 0, 0.5);
      }
   }
   .input_wrapper {
      display: flex;
      align-items: flex-start;
      .el-input {
         height: 40px;
      }
      .el-button {
         padding: 0;
      }
   }

   .button {
      width: 100%;
      height: 40px;
      text-align: center;
   }
}
</style>