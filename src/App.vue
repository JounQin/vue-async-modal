<template lang="pug">
  #app.container(:class="$style.container")
    h4 Demo:
    button.btn.btn-default(@click="basicModal") Basic Modal
    button.btn.btn-default(@click="basicModal5") Basic Modal 5 times
    button.btn.btn-default(@click="alert") Alert Modal
    button.btn.btn-default(@click="confirm") Confirm Modal
    button.btn.btn-default(@click="prompt") Prompt Modal
    button.btn.btn-default(@click="toast") Toast Modal
    modal#modal
</template>
<script lang="js">
  import Modal from 'Modal'

  import tip from 'tip'

  const {alert, confirm, prompt, toast} = tip

  export default {
    methods: {
      basicModal(options) {
        this.$modal.open({
          component: import('BasicModal'),
          options
        }).then(modal => {
          console.log(modal.id)
        })
      },
      basicModal5() {
        this.basicModal()
        const interval = setInterval(() => this.basicModal({backdrop: 'static'}), 2e3)
        setTimeout(() => clearInterval(interval), 9e3)
      },
      alert() {
        alert(`I'm Alert`)
      },
      confirm() {
        confirm({
          tipText: `I'm Confirm`,
          confirm() {
            this.$modal.close().then(() => alert('Alert after confirm'))
          }
        })
      },
      prompt() {
        prompt({
          tipText: '还不赶紧写原因？',
          placeholder: '在此填写原因 (50字以内)，或者直接点击"确定"',
          confirm: text => alert(text)
        })
      },
      toast() {
        toast(`I'm Toast`)
      }
    },
    components: {
      Modal
    }
  }
</script>
<style src="bootstrap" lang="stylus"></style>
<style src="transition" lang="stylus"></style>
<style lang="stylus" module>
  .container
    :global
      .theme-color
        color #b28ef2 !important

      .btn
        margin-bottom 10px

        &:not(:last-child)
          margin-right 10px
</style>
