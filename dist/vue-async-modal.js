/*!
 * vue-async-modal Flexible modal component for Vue with ability of asynchronous lazy loading
 * Version 1.0.0
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-async-modal
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define('vue-async-modal', ['exports', 'vue'], factory) :
  (factory((global.VueAsyncModal = {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var classRegExp = function (className) { return new RegExp(("(^|\\s+)" + (className.toString().trim()) + "(\\s+|$)"), 'g'); };

  var hasClass = function (el, className) { return classRegExp(className).test(el.className); };

  var addClass = function (el, className) {
    var classNames = className.split(' ');
    classNames.length > 1
      ? classNames.forEach(function (className) { return addClass(el, className); })
      : hasClass(el, className) ||
        (el.className = ((el.className) + " " + className).trim());
  };

  var removeClass = function (el, className) {
    el.className = el.className.replace(classRegExp(className), ' ').trim();
  };

  var isPromise = function (promise) { return Object.prototype.toString.call(promise) === '[object Promise]' ||
    promise instanceof Promise; };

  var DEFAULT_OPTIONS = {
    show: true,
    backdrop: true,
    destroy: false,
  };

  var NON_TRANSITION_ERR =
    'this modal item is not a Vue component, you should use `transition` component and emit `after-leave` event';

  var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.modals.length)?_c('div',[(_vm.currModal && _vm.currModal.options.backdrop)?_c('div',{staticClass:"modal-backdrop"}):_vm._e(),_vm._l((_vm.modals),function(ref){
  var id = ref.id;
  var component = ref.component;
  var props = ref.props;
  var options = ref.options;
  return _c(component,_vm._b({directives:[{name:"show",rawName:"v-show",value:(options.show),expression:"options.show"}],key:id,ref:"modal",refInFor:true,tag:"component",nativeOn:{"click":function($event){return (function (e) { return _vm.handleBackdrop(e, id, options.backdrop); })($event)}}},'component',props,false))})],2):_vm._e()},staticRenderFns: [],
    data: function data() {
      return {
        modals: [],
        currModal: null,
      }
    },
    computed: {
      currModalId: function currModalId() {
        return this.currModal && this.currModal.id
      },
    },
    watch: {
      currModal: function (modal) { return (modal ? addClass : removeClass)(document.body, 'modal-open'); },
    },
    beforeCreate: function beforeCreate() {
      Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        writable: "development" === 'development',
      });
    },
    methods: {
      close: function close(modalId, destroy) {
        var this$1 = this;

        modalId = modalId || this.currModalId;

        var modal;

        if (!modalId || !(modal = this.getModal(modalId)))
          { return Promise.resolve() }

        var options = modal.options;

        options.show = false;

        var modalItem = this.getModalItem(modalId);

        if (!modalItem) { return Promise.reject(new TypeError(NON_TRANSITION_ERR)) }

        var callback = function (resolve) {
          options.destroy || destroy
            ? this$1.removeModal(modalId)
            : this$1.resetCurrModal(modalId);
          resolve();
        };

        return new Promise(
          function (resolve) { return getComputedStyle(modalItem.$el).display === 'none'
              ? callback(resolve)
              : modalItem.$once('after-leave', function () { return callback(resolve); }); }
        )
      },
      closeAll: function closeAll(destroy, immediate) {
        var this$1 = this;
        if ( destroy === void 0 ) destroy = true;

        var promise = Promise.resolve();

        destroy && immediate
          ? (this.modals = [])
          : this.modals.forEach(function (modal) {
              promise = promise.then(function () { return this$1.close(modal.id, destroy); });
            });

        return promise
      },
      open: function open(modal) {
        var this$1 = this;

        modal.id = modal.id || Date.now();
        return isPromise(modal.component)
          ? modal.component.then(function (component) { return this$1.resolve(
                Object.assign(modal, {
                  component: component.default || component,
                })
              ); }
            )
          : this.resolve(modal)
      },
      resolve: function resolve(modal) {
        var this$1 = this;

        var id = modal.id;
        var component = modal.component;
        var props = modal.props;
        var options = modal.options;

        var m = this.getModal(id);

        if (m) {
          component && (m.component = component);
          modal = m;
        } else if (!component) {
          return Promise.reject(
            new ReferenceError('no component passed on initialization')
          )
        }

        modal.props = Object.assign({}, props);

        var opts = Object.assign({}, DEFAULT_OPTIONS, options);

        if (!opts.show) {
          modal.options = opts;
          return Promise.resolve()
        }

        var promise = this.currModalId === id ? Promise.resolve() : this.close();

        return promise.then(function () {
          modal.options = opts;
          m || this$1.modals.push(modal);
          this$1.currModal = modal;

          return new Promise(function (resolve, reject) { return this$1.$nextTick(function () {
              var modalItem = this$1.getModalItem(id);
              modalItem
                ? modalItem.$once('after-enter', function () { return resolve(modal); })
                : reject(new TypeError(NON_TRANSITION_ERR));
            }); }
          )
        })
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
      getModalItem: function getModalItem(modalId) {
        var modalRef = this.getModalRef(modalId);
        return modalRef && modalRef.$children[0]
      },
      resetCurrModal: function resetCurrModal(modalId) {
        modalId === this.currModalId && (this.currModal = null);
      },
      removeModal: function removeModal(modalId) {
        var modalIndex = this.getModalIndex(modalId);
        modalIndex + 1 && this.modals.splice(modalIndex, 1);
        this.resetCurrModal(modalId);
      },
      handleBackdrop: function handleBackdrop(e, id, backdrop) {
        if (e.target !== e.currentTarget || backdrop === 'static') { return }
        this.close(id);
      },
    },
  };

  var ModalItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition},on:{"after-enter":function($event){_vm.$emit('after-enter');},"after-leave":function($event){_vm.$emit('after-leave');}}},[_c('div',{staticClass:"modal",attrs:{"id":_vm.id,"tabindex":"-1","role":"dialog"}},[_c('div',{staticClass:"modal-dialog"},[_c('div',{staticClass:"modal-content"},[(_vm.$slots.header)?_c('div',{staticClass:"modal-header"},[_vm._t("header")],2):(_vm.header)?_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button"},on:{"click":_vm.closeModal}},[_vm._v("×")]),(_vm.header)?_c('h4',{staticClass:"modal-title",domProps:{"innerHTML":_vm._s(_vm.header)}}):_vm._e()]):_vm._e(),(_vm.$slots.body)?_vm._t("body"):_c('div',{staticClass:"modal-body"},[_vm._t("default")],2),(_vm.$slots.footer)?_c('div',{staticClass:"modal-footer"},[_vm._t("footer")],2):(_vm.footer)?_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"btn btn-default",on:{"click":_vm.closeModal}},[_vm._v(_vm._s(_vm.cancelText || '取消'))]),_c('div',{staticClass:"btn btn-primary",attrs:{"disabled":_vm.disabled},on:{"click":_vm.confirmModal}},[_vm._v(_vm._s(_vm.confirmText || '确定'))])]):_vm._e()],2)])])])},staticRenderFns: [],
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
      closeModal: function closeModal() {
        this.$modal.close();
      },
      confirmModal: function confirmModal() {
        if (this.disabled) { return }
        this.$emit('confirm');
      },
    },
  };

  exports.Modal = Modal;
  exports.ModalItem = ModalItem;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
