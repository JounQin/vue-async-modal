<template lang="pug">
  #app Demo:
    br
    button.btn.btn-default(@click="addModal") Add Modal
    modal#modal
</template>
<script lang="js">
  import Modal from 'Modal'

  export default {
    methods: {
      addModal() {
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
