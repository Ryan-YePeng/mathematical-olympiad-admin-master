import router from './routers'
import store from '../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {isEmpty} from '../utils/common'
import {menu} from './menu'

NProgress.configure({showSpinner: false});

import index from '../views/index'
import home from '../views/home/index'
import person from '../views/person/index'

const layout = {
  path: '/index',
  component: index,
  children: [
    {path: '/home', name: 'home', component: home},
    {path: '/person', name: 'person', component: person}
  ]
};

//动态添加路由
function generateRouter(menu) {
  let list = layout.children;
  menu.forEach(fistItem => {
    //一级菜单
    let firstObj = {};
    firstObj.path = `/${fistItem.path}`;
    firstObj.name = fistItem.path;
    firstObj.component = () => {
      return import(`@/views${firstObj.path}/index`)
    };
    //二级菜单
    if (fistItem.children && fistItem.children.length !== 0) {
      fistItem.children.forEach(secondItem => {
        let secondObj = {};
        secondObj.path = `/${fistItem.path}/${secondItem.path}`;
        secondObj.name = secondItem.path;
        secondObj.component = () => {
          return import(`@/views${secondObj.path}/index`)
        };
        //三级菜单
        if (secondItem.children && secondItem.children.length !== 0) {
          secondItem.children.forEach(thirdItem => {
            let thirdObj = {};
            thirdObj.path = `/${fistItem.path}/${secondItem.path}/${thirdItem.path}`;
            thirdObj.name = thirdItem.path;
            thirdObj.component = () => {
              return import(`@/views${thirdObj.path}/index`)
            };
            //三级菜单
            list.push(thirdObj)
          })
        } else {
          //二级菜单
          list.push(secondObj)
        }
      })
    } else {
      //一级菜单
      list.push(firstObj)
    }
  })
}

export function getRouter() {
  return new Promise(resolve => {
    window.setTimeout(() => {
      store.dispatch('setMenu', menu);
      generateRouter(menu);
      router.addRoutes([layout]);
      router.addRoutes([{
        path: "*",
        redirect: "/404"
      }]);
      router.addRoutes([{
        path: "",
        redirect: "/home"
      }]);
      resolve()
    }, 1000)
  });
}

//添加路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  let isLogin = !isEmpty(store.getters.token);
  if (to.path === "/") {
    isLogin
        ? next('/home')
        : next('login');
    return
  }
  if (to.path === "/login") {
    next()
  } else {
    if (isLogin) {
      if (layout.children.length === 2) {
        getRouter();
        next()
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

export default router
