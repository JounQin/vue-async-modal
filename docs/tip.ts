import Vue from 'vue'

const vueProp: Vue = Vue.prototype

const TIP_ID = '__TIP__'

const tip: Record<string, (props?: {}) => {}> = {}

const tipText = '系统消息'
;['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  tip[value] = props =>
    vueProp.$modal.open({
      id: TIP_ID,
      component: import('./TipModal.vue'),
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
              confirm(this: Vue) {
                return this.$modal.close(TIP_ID)
              },
            }
          : props),
        // @ts-ignore
        type,
      },
    })
})

export default tip
