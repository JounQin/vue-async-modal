<template lang="pug">
  #app.container
    h4 Demo:
    button.btn.btn-default(@click="basicModal") Basic Modal
    modal#modal
</template>
<script lang="js">
  import Modal from 'Modal'

  export default {
    methods: {
      basicModal() {
        this.$modal.open({
          component: import('BasicModal')
        }).then(modal => {
          console.log(modal.id)
        })
      }
    },
    components: {
      Modal
    }
  }
</script>
<style src="bootstrap" lang="stylus"></style>
<style src="transition" lang="stylus"></style>
