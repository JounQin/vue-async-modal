<template lang="pug">
transition(:name="transition",
           @after-enter="$emit('after-enter')",
           @after-leave="$emit('after-leave')")
  .modal(:id="id", tabindex="-1", role="dialog")
    .modal-dialog
      .modal-content
        // header
        .modal-header(v-if="$slots.header")
          slot(name="header")
        .modal-header(v-else-if="header")
          button.close(type="button", @click="closeModal") ×
          h4.modal-title(v-if="header", v-html="header")
        // body
        slot(v-if="$slots.body", name="body")
        .modal-body(v-else)
          slot
        // footer
        .modal-footer(v-if="$slots.footer")
          slot(name="footer")
        .modal-footer(v-else-if="footer")
          .btn.btn-default(@click="closeModal") {{ cancelText || '取消' }}
          .btn.btn-primary(:disabled="disabled", @click="confirmModal") {{ confirmText || '确定' }}
</template>
<script>
export default {
  props: {
    id: [Number, String],
    header: String,
    footer: Boolean,
    disabled: Boolean,
    confirmText: String,
    cancelText: String,
    transition: {
      type: String,
      default: 'fade',
    },
  },
  methods: {
    closeModal() {
      this.$modal.close()
    },
    confirmModal() {
      if (this.disabled) return
      this.$emit('confirm')
    },
  },
}
</script>
<style src="./modal-item.styl" lang="stylus"></style>
