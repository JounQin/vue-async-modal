<template lang="pug">
  modal-item(:class="$style.tip")
    template(v-if="type === 3")
      .modal-title(slot="header") {{ tipText }}
      div(slot="body", :class="$style.promptText")
        textarea(v-model="text", :placeholder="placeholder")
    .modal-body(v-else, slot="body", v-html="tipText")
    template(v-if="type && type !== 4", slot="footer")
      div(v-if="type - 1", :class="$style.btnPrompt", @click="closeModal") {{ cancelText  }}
      .theme-color(:class="$style.btnPrompt", @click="confirmModal") {{ confirmText }}
</template>
<script>
  import Vue from 'vue'

  import ModalItem from 'ModalItem'

  export default {
    name: 'tip-modal',
    props: {
      backdrop: Boolean,
      tipText: String,
      confirm: Function,
      close: Function,
      confirmText: String,
      cancelText: String,
      type: Number,
      timeout: Number,
      promptText: String,
      placeholder: String
    },
    data() {
      return {
        text: this.promptText
      }
    },
    mounted() {
      this.setToast()
    },
    watch: {
      type() {
        this.setToast()
      }
    },
    methods: {
      setToast() {
        this.type || setTimeout(() => {
          this.closeModal()
        }, this.timeout || 2000)
      },
      closeModal() {
        this.close ? this.close(...arguments) : this.$modal.close()
      },
      confirmModal() {
        this.confirm ? this.confirm(...this.type === 3 ? [this.text, ...arguments] : arguments)
          : Vue.util.warn('you should handle the click event on the confirm btn by yourself!')
      }
    },
    components: {
      ModalItem
    }
  }
</script>
<style lang="stylus" module>
  $back-color = #e5e5e5
  $bg-color = #f8f8f8
  $remark-color = #bfbfbf

  .tip
    z-index 1051

    :global
      .modal-content
        position fixed
        left 50%
        top 50%
        transform translate3d(-50%, -50%, 0)
        width 240px

      .modal-body
        padding-top 24px
        padding-bottom 24px
        text-align center

      .modal-footer
        display flex
        padding 0

  .btn-prompt
    flex 1
    padding 15px
    cursor pointer
    text-align center
    overflow ellipsis

    + .btn-prompt
      border-left 1px solid $back-color

  .prompt-text
    padding 15px
    background-color $bg-color

    textarea
      display block
      padding 0
      width 100%
      height 60px
      resize none
      border 0
      outline 0
      color $remark-color
      background-color transparent

      &:focus
        outline-offset 0
</style>
