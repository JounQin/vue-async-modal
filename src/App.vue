<template lang="pug">
  #app.container(:class="$style.container")
    h4 Demo:
    button.btn.btn-default(@click="basicModal") Basic Modal
    button.btn.btn-default(@click="basicModal5") Basic Modal 5 times
    modal#modal
</template>
<script lang="js">
  import Modal from 'Modal'

  export default {
    methods: {
      basicModal(options) {
        this.$modal.open({
          component: import('BasicModal'),
          options
        }).then(modal => {
          console.log(modal.id)
        })
      },
      basicModal5() {
        this.basicModal()
        const interval = setInterval(() => this.basicModal({backdrop: 'static'}), 2e3)
        setTimeout(() => clearInterval(interval), 9e3)
      }
    },
    components: {
      Modal
    }
  }
</script>
<style src="bootstrap" lang="stylus"></style>
<style src="transition" lang="stylus"></style>
<style lang="stylus" module>
  .container
    :global
      .btn + .btn
        margin-left 10px
</style>
