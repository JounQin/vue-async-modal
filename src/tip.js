import Vue from 'vue'

const vueProp = Vue.prototype

const TIP_ID = '__TIP__'

const tip = {}

const tipText = '系统消息'
;['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  tip[value] = props =>
    vueProp.$modal.open({
      id: TIP_ID,
      component: import('./TipModal'),
      options: {
        backdrop: 'static',
        destroy: true,
      },
      props: {
        cancelText: '取消',
        confirmText: '确定',
        tipText,
        ...(!props || typeof props === 'string'
          ? {
              tipText: props || tipText,
              confirm() {
                this.$modal.close(TIP_ID)
              },
            }
          : props),
        type,
      },
    })
})

export default tip
