import type { FieldsType, EventsType } from './type'
import { getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

export const useFieldEvents = (field: Ref<FieldsType>) => {
  const instance = getCurrentInstance()

  const capitalizeFirstLetter = (str: string): string => {
    return str.slice(2)
  }

  /**
   * 创建事件处理器
   * @param eventName 事件名称 (如 'change', 'blur')
   * @returns 处理函数
   */
  const createEventHandler = <T extends (...args: any[]) => void>(eventName: string): T => {
    return ((...args: any[]) => {
      // 1. 调用组件自身通过 props 传递的事件处理器 (如果存在)
      const propEventName = `on${capitalizeFirstLetter(eventName)}`
      if (instance?.props[propEventName]) {
        ;(instance.props[propEventName] as Function)(...args)
      }
      // 2. 调用 field.events 中的事件处理器 (如果存在)
      const eventHandler = field.value.events?.[eventName]
      if (eventHandler) {
        eventHandler(...args)
      }
    }) as T
  }

  /**
   * 获取所有事件处理器的对象
   * @returns 包含所有事件处理器的对象
   */
  const getEventHandlers = (): EventsType => {
    const handlers: EventsType = {}
    if (field.value.events) {
      Object.keys(field.value.events).forEach((event) => {
        console.log(capitalizeFirstLetter('onChange'))
        handlers[event] = createEventHandler(event)
      })
    }
    return handlers
  }

  return {
    createEventHandler,
    getEventHandlers,
  }
}
