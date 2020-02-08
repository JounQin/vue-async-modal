<template>
  <div id="app" class="container" :class="$style.container">
    <h4>Demo:</h4>
    <button class="btn btn-primary" @click="basicModal">Basic Modal</button>
    <button class="btn btn-primary" @click="basicModal5">
      Basic Modal 5 times
    </button>
    <button class="btn btn-primary" @click="alert">Alert Modal</button>
    <button class="btn btn-primary" @click="confirm">Confirm Modal</button>
    <button class="btn btn-primary" @click="prompt">Prompt Modal</button>
    <button class="btn btn-primary" @click="toast">Toast Modal</button>
    <modal id="modal"></modal>
  </div>
</template>
<script>
import { Modal } from 'vue-async-modal'

import tip from './tip'

const { alert, confirm, prompt, toast } = tip

export default {
  components: {
    Modal,
  },
  methods: {
    basicModal(options) {
      this.$modal
        .open({
          component: import('./BasicModal.vue'),
          options,
        })
        .then(modal => {
          console.log(modal.id)
        })
    },
    basicModal5() {
      this.basicModal()
      const interval = setInterval(
        () => this.basicModal({ backdrop: 'static' }),
        2 * 1000,
      )
      // eslint-disable-next-line no-magic-numbers
      setTimeout(() => clearInterval(interval), 9 * 1000)
    },
    alert() {
      alert(`I'm Alert`)
    },
    confirm() {
      confirm({
        tipText: `I'm Confirm`,
        confirm() {
          this.$modal.close().then(() => alert('Alert after confirm'))
        },
      })
    },
    prompt() {
      prompt({
        tipText: '还不赶紧写原因？',
        placeholder: '在此填写原因 (50字以内)，或者直接点击"确定"',
        confirm: text => alert(text),
      })
    },
    toast() {
      toast(`I'm Toast`)
    },
  },
}
</script>
<style lang="scss" src="./bootstrap.global.scss"></style>
<style lang="scss" src="./transition.global.scss"></style>
<style lang="scss" module>
.container {
  :global {
    .theme-color {
      color: #b28ef2 !important;
    }

    .btn {
      margin-bottom: 10px;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
