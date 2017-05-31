<template>

  <div id="app">
   <Navbar></Navbar>
    <router-view></router-view>
  </div>

</template>
<script>

import Navbar from '@/components/navbar'
/*eslint-disable */
export default {
  name: 'app',
  components: { Navbar }
}

</script>
