import { RouterOptions } from 'vue-router'
import Layout from './components/Layout.vue'
import Dashboard from './views/Dashboard.vue'
import New from './views/New.vue'

export default [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/new',
        name: 'new',
        component: New
      }
    ]
  }
] as RouterOptions['routes']
