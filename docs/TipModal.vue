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
import { ModalItem } from 'vue-async-modal'

export default {
  name: 'TipModal',
  components: {
    ModalItem,
  },
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
    placeholder: String,
  },
  data() {
    return {
      text: this.promptText,
    }
  },
  watch: {
    type() {
      this.setToast()
    },
  },
  mounted() {
    this.setToast()
  },
  methods: {
    setToast() {
      this.type ||
        setTimeout(() => {
          this.closeModal()
        }, this.timeout || 2 * 1000)
    },
    closeModal(...args) {
      this.close ? this.close(...args) : this.$modal.close()
    },
    confirmModal(...args) {
      this.confirm
        ? // eslint-disable-next-line no-magic-numbers
          this.confirm(...(this.type === 3 ? [this.text, ...args] : args))
        : Vue.util.warn(
            'you should handle the click event on the confirm btn by yourself!',
          )
    },
  },
}
</script>
<style lang="scss" module>
$back-color: #e5e5e5 !default;
$bg-color: #f8f8f8 !default;
$remark-color: #bfbfbf !default;

.tip {
  z-index: 1051;
  :global {
    .modal-content {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 240px;
    }

    .modal-body {
      padding: {
        top: 24px;
        bottom: 24px;
      }

      text-align: center;
    }

    .modal-footer {
      display: flex;
      padding: 0;
    }
  }
}

.btn-prompt {
  flex: 1;
  padding: 15px;
  cursor: pointer;
  text-align: center;
  overflow: ellipsis;

  + .btn-prompt {
    border-left: 1px solid $back-color;
  }
}

.prompt-text {
  padding: 15px;
  background-color: $bg-color;

  textarea {
    display: block;
    padding: 0;
    width: 100%;
    height: 60px;
    resize: none;
    border: 0;
    outline: 0;
    color: $remark-color;
    background-color: transparent;

    &:focus {
      outline-offset: 0;
    }
  }
}
</style>
