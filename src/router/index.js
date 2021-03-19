import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Report from '../views/Report'
import Login from '../views/Login'

import Patient from '../views/Patient'
import Drug from '../views/Drug'
import Office from '../views/Office'
import AboutLayout from '../layout/AboutLayout'
import OfficeManage from '../views/OfficeManage'
import Register from '../views/Register'
import Bill from '../views/Planner'
import DrugBill from '../views/DrugBill'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'Login',
    component: Login,
    meta: {
      hide: true,
    }
  },
  {
    path:'/register',
    name: 'Register',
    component: Register,
    meta:{
      hide: true,}
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: 'mdi-home',
      i18n: 'menu.home'
    }
  },
  {
    path:'/Report',
    name: 'ReportByZone',
    component: Report,
    meta: {
      icon: 'mdi-upload',
      i18n: 'Report',
    }
  },
  {
    path:'/patient',
    name: 'PatientTable',
    component: Patient,
    meta: {
      icon: 'mdi-cube',
      i18n: 'Patients',
    }
  },
  {
    path: '/drug',
    name: 'DrugTable',
    component: Drug,
    meta:{
        icon: 'mdi-security',
        i18n: 'DrugManage',
    }
  },
  {
    path: '/drugbill',
    name: 'DrugBill',
    component: DrugBill,
    meta:{
      icon: 'mdi-card-bulleted',
      i18n: '药物流水',
    }
  },
  {
    path: '/bill',
    name: "bill",
    component: Bill,
    meta:{
      icon:'mdi-receipt',
      i18n:'账单',
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutLayout,
    meta: {
      icon: 'mdi-link-variant',
      i18n: 'About',
      active: true
    },
    children: [
      {
        path: '/office',
        name: 'office',
        component: Office,
        props: true,
        meta: {
          icon: 'mdi-account-group',
          i18n: 'menu.about.links'
        },
      },
      {
        path: '/officeManage',
        name: 'officeManage',
        component: OfficeManage,
        meta:{
          hide:true,
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() { // params: (to, from, savedPosition)
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('access-user'));
  let token = '';
  if (user) {
    token = user.token;
  }
  if (to.path === '/login' || to.path === '/register') {
    if (token === null || token === '') {
      next();
    }
    else{
      next('/');
    }
    
  } else {
    //其他页面
    
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});




export default router
