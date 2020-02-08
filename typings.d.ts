import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $modal: {
      open(options: {
        id?: string
        component: Promise<{ default: VueConstructor }>
        options?: {
          backdrop?: 'static' | boolean
          destroy?: boolean
        }
        props?: {
          cancelText?: string
          confirmText?: string
        }
      }): Promise<void>
      close(modalId: string, destroy?: boolean): Promise<void>
    }
  }
}
