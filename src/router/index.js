import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Device from '@/components/Device'
import Interface from '@/components/Interface'
import Top10rank from '@/components/Top10rank'
import Network from '@/components/Network'
import Test from '@/components/Test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Device',
      name: 'Device',
      component: Device
    },
    {
      path: '/Interface',
      name: 'Interface',
      component: Interface
    },
    {
      path: '/Top10rank',
      name: 'Top10rank',
      component: Top10rank
    },
    {
      path: '/Network',
      name: 'Network',
      component: Network
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }

  ]
})
