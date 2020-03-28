
import router from "./index"
import cookies from "vue-cookies"
router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    console.log(to.path);
    next();
  }else{

    let token = cookies.get('to_ken');
    if (!token) {
      next('/login')
    }else{
      next();
    }
  }
})