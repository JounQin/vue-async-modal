<template>
  <transition
    :name="transition"
    @after-enter="$emit('after-enter')"
    @after-leave="$emit('after-leave')"
  >
    <div :id="id" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- header-->
          <div v-if="$slots.header" class="modal-header">
            <slot name="header"></slot>
          </div>
          <div v-else-if="header" class="modal-header">
            <button class="close" type="button" @click="closeModal">×</button>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h4 v-if="header" class="modal-title" v-html="header"></h4>
          </div>
          <!-- body-->
          <slot v-if="$slots.body" name="body"></slot>
          <div v-else class="modal-body">
            <slot></slot>
          </div>
          <!-- footer-->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
          <div v-else-if="footer" class="modal-footer">
            <div class="btn btn-default" @click="closeModal">
              {{ cancelText || '取消' }}
            </div>
            <div
              class="btn btn-primary"
              :disabled="disabled"
              @click="confirmModal"
            >
              {{ confirmText || '确定' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
      if (this.disabled) {
        return
      }
      this.$emit('confirm')
    },
  },
}
</script>
<style lang="scss" src="./modal-item.global.scss"></style>
