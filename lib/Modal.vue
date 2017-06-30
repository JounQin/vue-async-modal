<template lang="pug">
  div(v-if="modals.length")
    .modal-backdrop(v-if="currModal && currModal.options.backdrop")
    component(v-for="{id, component, props, options} of modals",
    :is="component",
    :key="id",
    ref="modal",
    v-bind="props",
    v-show="options.show")
</template>
<script>
  import Vue from 'vue'

  const isPromise = promise => Object.prototype.toString.call(promise) === '[object Promise]' || promise instanceof Promise

  const DEFAULT_OPTIONS = {
    show: true,
    backdrop: true,
    destroy: false
  }

  export default {
    beforeCreate() {
      Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        writable: process.env.NODE_ENV === 'development'
      })
    },
    data() {
      return {
        modals: [],
        currModal: null
      }
    },
    computed: {
      currModalId() {
        return this.currModal && this.currModal.id
      }
    },
    methods: {
      resetCurrModal(modalId) {
        modalId === this.currModalId && (this.currModal = null)
      },
      removeModal(modalId) {
        const modalIndex = this.getModalIndex(modalId)
        modalIndex + 1 && this.modals.splice(modalIndex, 1)
        this.resetCurrModal(modalId)
      },
      close(modalId, destroy) {
        modalId = modalId || this.currModalId
        const promise = Promise.resolve()
        if (!modalId) return promise
        const modal = this.getModal(modalId)
        if (!modal) return promise
        const {options} = modal
        options.show = false
        const modalRef = this.getModalRef(modalId)
        const modalItem = modalRef.$children[0]
        return new Promise(resolve => modalItem.$once('after-leave', () => {
          options.destroy || destroy ? this.removeModal(modalId) : this.resetCurrModal(modalId)
          resolve()
        }))
      },
      open(modal) {
        modal.id = modal.id || Date.now()
        return isPromise(modal.component) ? modal.component.then(component => this.resolve(Object.assign(modal, {component}))) : this.resolve(modal)
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
      resolve(modal) {
        const {id, component, props, options} = modal

        const m = this.getModal(id)

        if (m) {
          Object.assign(m.props, props)
          Object.assign(m.options, DEFAULT_OPTIONS, options)
          component && (m.component = component)
          modal = m
        } else {
          if (!component) return Promise.reject(new ReferenceError('no component passed on initialization'))
          modal.options = {...DEFAULT_OPTIONS, ...options}
          modal.props = {...props}
          this.modals.push(modal)
        }

        const {currModalId} = this

        let promise = Promise.resolve()

        if (!modal.options.show) return promise

        currModalId === id || (promise = promise.then(() => this.close()))

        promise.then(() => {
          this.currModal = modal
        })

        return new Promise(resolve => this.$nextTick(() => {
          const modalRef = this.getModalRef(id)
          const modalItem = modalRef.$children[0]
          modalItem.$once('after-enter', () => resolve(promise.then(() => modal)))
        }))
      }
    }
  }
</script>
<style src="./modal.styl" lang="stylus"></style>
