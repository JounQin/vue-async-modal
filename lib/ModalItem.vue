<template lang="pug">
  transition(name="fade",
  @after-enter="$emit('after-enter')",
  @after-leave="$emit('after-leave')")
    .modal
      .modal-dialog
        .modal-content
          .modal-header
            button.close(type="button", @click="closeModal")
              span() ×
          .modal-body
          .modal-footer
</template>
<script>
  export default {
    methods: {
      closeModal() {
        this.$modal.close()
      }
    }
  }
</script>
<style src="./modal-item" lang="stylus"></style>
