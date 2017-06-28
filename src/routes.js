import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import echarts from './views/charts/echarts.vue'
import Users from './views/users/users.vue'
import Groups from './views/users/groups.vue'
import Third from './views/users/third.vue'
import Posts from './views/posts/posts.vue'
import Tags from './views/tags/tags.vue'
import Discussions from './views/discussions/discussions.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '仪表盘',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: "el-icon-message",
        children: [
            { path: '/users', component: Users, name: '用户列表' },
            { path: '/groups', component: Groups, name: '用户组' },
            { path: '/third', component: Third, name: '第三方管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/posts', component: Posts, name: '文章列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '标签管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/tags', component: Tags, name: '标签列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '评论管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/discussions', component: Discussions, name: '评论列表' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;