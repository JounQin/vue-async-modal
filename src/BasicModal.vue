<template lang="pug">
  modal-item(:class="$style.container", header="Basic Modal")
    .row
      .col-md-4 .col-md-4
      .col-md-4.col-md-offset-4 .col-md-4 .col-md-offset-4
    .row
      .col-md-3.col-md-offset-3 .col-md-3 .col-md-offset-3
      .col-md-2.col-md-offset-4 .col-md-2 .col-md-offset-4
    .row
      .col-md-6.col-md-offset-3 .col-md-6 .col-md-offset-3
    .row
      .col-sm-9
        | Level 1: .col-sm-9
        .row
          .col-xs-8.col-sm-6
            | Level 2: .col-xs-8 .col-sm-6
          .col-xs-4.col-sm-6
            | Level 2: .col-xs-4 .col-sm-6
</template>
<script>
  import ModalItem from 'ModalItem'

  export default {
    components: {
      ModalItem
    }
  }
</script>
<style lang="stylus" module>
  .container
    :global([class*=col-])
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #eee;
      background-color: rgba(86,61,124,.15);
      border: 1px solid #ddd;
      border: 1px solid rgba(86,61,124,.2);
</style>
