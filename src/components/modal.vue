<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> {{showDetail.interface}}</p>
        <button class="delete" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        Status: {{showDetail.status}} <br>
        Inbound: {{showDetail.inbound}} <br>
        Outbound: {{showDetail.outbound}} <br>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showModal', 'closeModal', 'showDetail']

  }
</script>
