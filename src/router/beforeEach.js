
import router from "./index"
import cookies from "vue-cookies"
router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    next();
  }else{
    let token = cookies.get('chomeToken');
    if (!token) {
      next('/login')
    }else{
      next();
    }
  }
})