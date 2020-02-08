<template>
  <modal-item :class="$style.container" header="Basic Modal">
    <div class="text-center" :class="$style.clear">
      <button class="btn btn-primary" @click="$modal.closeAll">
        Clear Modals
      </button>
    </div>
    <div class="row">
      <div class="col-md-4">.col-md-4</div>
      <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
    </div>
    <div class="row">
      <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
      <div class="col-md-2 col-md-offset-4">.col-md-2 .col-md-offset-4</div>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
    </div>
    <div class="row">
      <div class="col-sm-9">
        Level 1: .col-sm-9
        <div class="row">
          <div class="col-xs-8 col-sm-6">Level 2: .col-xs-8 .col-sm-6</div>
          <div class="col-xs-4 col-sm-6">Level 2: .col-xs-4 .col-sm-6</div>
        </div>
      </div>
    </div>
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
<style lang="scss" module>
.container {
  :global([class*='col-']) {
    padding: {
      top: 10px;
      bottom: 10px;
    }

    background: {
      color: #eee;
      color: rgba(86, 61, 124, 0.15);
    }

    border: 1px solid #ddd;
    border: 1px solid rgba(86, 61, 124, 0.2);
  }
}

.clear {
  padding-bottom: 15px;
}
</style>
