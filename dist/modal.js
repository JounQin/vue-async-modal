/*!
 * vue-async-modal Flexible modal component for Vue with ability of asynchronous lazy loading
 * Version 0.0.1
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-async-modal
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('vue-async-modal', ['exports'], factory) :
	(factory((global.VueAsyncModal = global.VueAsyncModal || {})));
}(this, (function (exports) { 'use strict';

var Modal = {};

var ModalItem = {};

exports.Modal = Modal;
exports.ModalItem = ModalItem;

Object.defineProperty(exports, '__esModule', { value: true });

})));
