/*!
 * vue-async-modal Flexible modal component for Vue with ability of asynchronous lazy loading
 * Version 0.0.1
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-async-modal
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define('vue-async-modal', ['exports', 'vue'], factory) :
	(factory((global.VueAsyncModal = global.VueAsyncModal || {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

Vue = Vue && 'default' in Vue ? Vue['default'] : Vue;

var isPromise = function (promise) { return Object.prototype.toString.call(promise) === '[object Promise]' || promise instanceof Promise; };

var DEFAULT_OPTIONS = {
  show: true,
  backdrop: true,
  destroy: false
};

var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.modals.length)?_c('div',[(_vm.currModal && _vm.currModal.options.backdrop)?_c('div',{staticClass:"modal-backdrop"}):_vm._e(),_vm._l((_vm.modals),function(ref){
var id = ref.id;
var component = ref.component;
var props = ref.props;
var options = ref.options;
return _c(component,_vm._b({directives:[{name:"show",rawName:"v-show",value:(options.show),expression:"options.show"}],key:id,ref:"modal",refInFor:true,tag:"component"},'component',props))})],2):_vm._e()},staticRenderFns: [],
  beforeCreate: function beforeCreate() {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      writable: "development" === 'development'
    });
  },
  data: function data() {
    return {
      modals: [],
      currModal: null
    }
  },
  computed: {
    currModalId: function currModalId() {
      return this.currModal && this.currModal.id
    }
  },
  methods: {
    resetCurrModal: function resetCurrModal(modalId) {
      modalId === this.currModalId && (this.currModal = null);
    },
    removeModal: function removeModal(modalId) {
      var modalIndex = this.getModalIndex(modalId);
      modalIndex + 1 && this.modals.splice(modalIndex, 1);
      this.resetCurrModal(modalId);
    },
    close: function close(modalId, destroy) {
      var this$1 = this;

      modalId = modalId || this.currModalId;
      var promise = Promise.resolve();
      if (!modalId) { return promise }
      var modal = this.getModal(modalId);
      if (!modal) { return promise }
      var options = modal.options;
      options.show = false;
      var modalRef = this.getModalRef(modalId);
      var modalItem = modalRef.$children[0];
      return new Promise(function (resolve) { return modalItem.$once('after-leave', function () {
        options.destroy || destroy ? this$1.removeModal(modalId) : this$1.resetCurrModal(modalId);
        resolve();
      }); })
    },
    open: function open(modal) {
      var this$1 = this;

      modal.id = modal.id || Date.now();
      return isPromise(modal.component) ? modal.component.then(function (component) { return this$1.resolve(Object.assign(modal, {component: component})); }) : this.resolve(modal)
    },
    getModal: function getModal(modalId) {
      return this.modals.find(function (m) { return m.id === modalId; })
    },
    getModalIndex: function getModalIndex(modalId) {
      return this.modals.findIndex(function (m) { return m.id === modalId; })
    },
    getModalRef: function getModalRef(modalId) {
      return this.$refs.modal[this.getModalIndex(modalId)]
    },
    resolve: function resolve(modal) {
      var this$1 = this;

      var id = modal.id;
      var component = modal.component;
      var props = modal.props;
      var options = modal.options;

      var m = this.getModal(id);

      if (m) {
        Object.assign(m.props, props);
        Object.assign(m.options, DEFAULT_OPTIONS, options);
        component && (m.component = component);
        modal = m;
      } else {
        if (!component) { return Promise.reject(new ReferenceError('no component passed on initialization')) }
        modal.options = Object.assign({}, DEFAULT_OPTIONS, options);
        modal.props = Object.assign({}, props);
        this.modals.push(modal);
      }

      var ref = this;
      var currModalId = ref.currModalId;

      var promise = Promise.resolve();

      if (!modal.options.show) { return promise }

      currModalId === id || (promise = promise.then(function () { return this$1.close(); }));

      promise.then(function () {
        this$1.currModal = modal;
      });

      return new Promise(function (resolve) { return this$1.$nextTick(function () {
        var modalRef = this$1.getModalRef(id);
        var modalItem = modalRef.$children[0];
        modalItem.$once('after-enter', function () { return resolve(promise.then(function () { return modal; })); });
      }); })
    }
  }
};

var ModalItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"},on:{"after-enter":function($event){_vm.$emit('after-enter');},"after-leave":function($event){_vm.$emit('after-leave');}}},[_c('div',{staticClass:"modal"},[_c('div',{staticClass:"modal-dialog"},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button"},on:{"click":_vm.closeModal}},[_c('span',[_vm._v("×")])])]),_c('div',{staticClass:"modal-body"}),_c('div',{staticClass:"modal-footer"})])])])])},staticRenderFns: [],
  methods: {
    closeModal: function closeModal() {
      this.$modal.close();
    }
  }
};

exports.Modal = Modal;
exports.ModalItem = ModalItem;

Object.defineProperty(exports, '__esModule', { value: true });

})));
