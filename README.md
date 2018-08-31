# vue-async-modal

[![Greenkeeper badge](https://badges.greenkeeper.io/JounQin/vue-async-modal.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/JounQin/vue-async-modal.svg)](https://travis-ci.org/JounQin/vue-async-modal)
[![David](https://img.shields.io/david/JounQin/vue-async-modal.svg)](https://david-dm.org/JounQin/vue-async-modal)
[![David](https://img.shields.io/david/dev/JounQin/vue-async-modal.svg)](https://david-dm.org/JounQin/vue-async-modal?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Flexible modal component for Vue with ability of asynchronous lazy loading

# Usage

Firstly, you should add `Modal` component in your template.

```vue
<template>
<div id="app">
  <modal/>
</div>
</template>
<script>
import { Modal } from 'vue-async-modal'

export default {
  components: {
    Modal,
  },
}
</script>
```

Then, you will be able to get the modal instance via `this.$modal` in every Vue component.

We provide a basic modal component `ModalItem`.

If you want to open modal `MyModal` in component `Demo`:

```vue
// Demo.vue
<template>
<button @click="loadMyModal"></button>
</template>
<script>
export default {
  methods: {
    loadMyModal() {
      this.$modal.open({
        id: 'my-modal',
        component: import('./MyModal.vue'),
        options: {
          destroy: true,
        },
        props: {
          whatever,
        },
      })
    },
  },
}
</script>


// MyModal.vue
<template>
<!-- the simplest way to use default header template an override modal-title is use prop header -->
<!-- if you want to use default footer template, just add prop `footer: true` -->
<!-- every ModalItem instance will show/disppear with a fade transition by default -->
<!-- you can define prop transition to use your own transition, or just pass empty string `transition` prop to disable it -->
<modal-item :header="Modal Header" :footer="true">
  <!-- slot header will be content of .modal-header -->
  <template slot="header">
    <button>×</button>
    <h4>
      <div class="modal-title">I'm Modal Title</div>
    </h4>
  </template>

  <!-- default slot will be used as content in .modal-body -->
  I'm content of Modal Body

  <!-- or you can use slot body to rewrite whole .modal-body -->
  <div class="modal-body" slot="body">
    Let's rewrite default .modal-body
  </div>

  <!-- you can overwrite footer content by slot footer -->
  <template slot="footer">
    <!-- cancle/confirm text can be rewrote by prop `cancleText` and `confirmText` -->
    <button class="btn btn-default">取消</button>
    <!-- if you are using `footer: true`, it will trigger `confirm` event on clicking confirm btn-->
    <!-- or you can use prop `disbaled: true` to disbale it -->
    <button class="btn btn-primary">确定</button>
  </template>
</modal-item>
</template>
<script>
import { ModalItem } from 'vue-async-modal'

export default {
  components: {
    ModalItem,
  },
}
</script>
```

## API

There are several useful methods on modal instance:

1. open a modal instance

```js
this.$modal.open({id, component, options, props}): Promise
```

`id` is optional, if no `id` passed in, it will generate a id by timestamp.

`component` could be a normal Vue component or a promise which will resolve a Vue component,
so that we could use code spit and dynamic loading here.

`options: {show, backdrop, destroy}`:

`show` and `backdrop` will true if you don't set it.

If `show` is true, when you open modal, it will show automatically, or it will just add into DOM without displaying.

If `backdrop` is true, modal will open with a transparent black backdrop, unless `backdrop` is `static`,
when user click modal outside, modal will auto trigger `close` event.

If `destroy` is true, the modal instance will destroy automatically on closing.

2. close or destroy a modal instance

```js
this.$modal.close(id, destroy): Promise
```

If `id` is falsy, it will be automatically choose current modal instance id.

if `destroy` is true, the modal instance will be destroyed even if it's `options.destroy` is false.
