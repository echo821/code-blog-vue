import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/index',
    component: ()=> import('../views/Index.vue')
  },
  {
    path: '/login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/manage',
    name:'manage',
    component: ()=> import('../views/manage/Manage.vue'),
    children:[
      {
        path: '/navi1',
        name:'用户导航',
        component: ()=> import('../views/manage/navi1.vue'),
        children:[
          {
            path: '/userform',
            name:'用户表单',
            component: ()=> import('../views/manage/user-form.vue')
          },
          {
            path: '/usertable',
            name:'用户全表',
            component: ()=> import('../views/manage/user-table.vue')
          }
        ]
      },
      {
        name:'文章导航',
        path:'/navi2',
        component: ()=> import('../views/manage/navi2.vue'),
        // children: [
        //   {
        //     path: '/articleform',
        //     name:'文章表单',
        //     component: ()=> import('../views/manage/article-form.vue')
        //   },
        //   {
        //     path: '/articletable',
        //     name:'文章全表',
        //     component: ()=> import('../views/manage/article-table.vue')
        //   },
        // ]
      }
    ]
  },
  {
    path:'/personal',
    name:'personal',
    component: ()=> import('../views/Personal.vue')
  },
  {
    path:'/article',
    name:'article',
    component: ()=> import('../views/Article.vue')
  },
  {
    path:'/blog',
    name:'/blog',
    component: ()=> import('../views/Blog.vue')
  },
  {
    path:'/editor',
    name:'/ed',
    component: ()=> import('../views/Editor.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: ()=> import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
