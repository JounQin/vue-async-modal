<template>
  <div v-if="modals.length">
    <div
      v-if="currModal &amp;&amp; currModal.options.backdrop"
      class="modal-backdrop"
    ></div>
    <component
      :is="component"
      v-for="{ id, component, props, options } of modals"
      v-show="options.show"
      :key="id"
      ref="modal"
      v-bind="props"
      @click.native="e =&gt; handleBackdrop(e, id, options.backdrop)"
    ></component>
  </div>
</template>
<script>
import Vue from 'vue'

import { addClass, removeClass } from './utils'

const isPromise = promise =>
  Object.prototype.toString.call(promise) === '[object Promise]' ||
  promise instanceof Promise

const DEFAULT_OPTIONS = {
  show: true,
  backdrop: true,
  destroy: false,
}

const NON_TRANSITION_ERR =
  'this modal item is not a Vue component, you should use `transition` component and emit `after-leave` event'

export default {
  data() {
    return {
      modals: [],
      currModal: null,
    }
  },
  computed: {
    currModalId() {
      return this.currModal && this.currModal.id
    },
  },
  watch: {
    currModal: modal =>
      (modal ? addClass : removeClass)(document.body, 'modal-open'),
  },
  beforeCreate() {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      writable: process.env.NODE_ENV === 'development',
    })
  },
  methods: {
    close(modalId, destroy) {
      modalId = modalId || this.currModalId

      let modal

      if (!modalId || !(modal = this.getModal(modalId)))
        return Promise.resolve()

      const { options } = modal

      options.show = false

      const modalItem = this.getModalItem(modalId)

      if (!modalItem) return Promise.reject(new TypeError(NON_TRANSITION_ERR))

      const callback = resolve => {
        options.destroy || destroy
          ? this.removeModal(modalId)
          : this.resetCurrModal(modalId)
        resolve()
      }

      return new Promise(resolve =>
        getComputedStyle(modalItem.$el).display === 'none'
          ? callback(resolve)
          : modalItem.$once('after-leave', () => callback(resolve)),
      )
    },
    closeAll(destroy = true, immediate = false) {
      let promise = Promise.resolve()

      destroy && immediate
        ? (this.modals = [])
        : this.modals.forEach(modal => {
            promise = promise.then(() => this.close(modal.id, destroy))
          })

      return promise
    },
    open(modal) {
      modal.id = modal.id || Date.now()
      return isPromise(modal.component)
        ? modal.component.then(component =>
            this.resolve(
              Object.assign(modal, {
                component: component.default || component,
              }),
            ),
          )
        : this.resolve(modal)
    },
    resolve(modal) {
      const { id, component, props, options } = modal

      const m = this.getModal(id)

      if (m) {
        component && (m.component = component)
        modal = m
      } else if (!component) {
        return Promise.reject(
          new ReferenceError('no component passed on initialization'),
        )
      }

      modal.props = { ...props }

      const opts = { ...DEFAULT_OPTIONS, ...options }

      if (!opts.show) {
        modal.options = opts
        return Promise.resolve()
      }

      const promise = this.currModalId === id ? Promise.resolve() : this.close()

      return promise.then(() => {
        modal.options = opts
        m || this.modals.push(modal)
        this.currModal = modal

        return new Promise((resolve, reject) =>
          this.$nextTick(() => {
            const modalItem = this.getModalItem(id)
            modalItem
              ? modalItem.$once('after-enter', () => resolve(modal))
              : reject(new TypeError(NON_TRANSITION_ERR))
          }),
        )
      })
    },
    getModal(modalId) {
      return this.modals.find(m => m.id === modalId)
    },
    getModalIndex(modalId) {
      return this.modals.findIndex(m => m.id === modalId)
    },
    getModalRef(modalId) {
      return this.$refs.modal[this.getModalIndex(modalId)]
    },
    getModalItem(modalId) {
      const modalRef = this.getModalRef(modalId)
      return modalRef && modalRef.$children[0]
    },
    resetCurrModal(modalId) {
      if (modalId === this.currModalId) {
        this.currModal = null
      }
    },
    removeModal(modalId) {
      const modalIndex = this.getModalIndex(modalId)
      modalIndex + 1 && this.modals.splice(modalIndex, 1)
      this.resetCurrModal(modalId)
    },
    handleBackdrop(e, id, backdrop) {
      if (e.target !== e.currentTarget || backdrop === 'static') {
        return
      }
      this.close(id)
    },
  },
}
</script>
<style lang="scss" src="./modal.global.scss"></style>
