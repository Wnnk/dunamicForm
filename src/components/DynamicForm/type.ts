import type { PropType } from 'vue'

export const schemaProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
    default: {},
  },
  // formConfig: {
  //   type: Object as PropType<FormConfig>,
  //   required: true,
  //   default: () => ({
  //     id: '',
  //     title: {
  //       label: '',
  //       fontSize: 16,
  //       color: '',
  //       align: 'left',
  //       fontWeight: 'normal',
  //       subLabel: '',
  //     },
  //   }),
  // },
  // fields: {
  //   type: Array as PropType<FieldsType[]>,
  //   default: () => [],
  // },
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
    required: true,
  },
}

export interface Schema {
  formConfig: FormConfig
  fields: FieldsType[] // 表单字段
}

export interface FormConfig {
  id: string // 表单id
  title?: TitleType // 表单标题
  layout?: LayoutType // 表单布局
  submit?: submitType // 表单提交
  btn?: BtnType
}

export interface TitleType {
  label?: string
  fontSize?: string
  color?: string
  align?: 'left' | 'center' | 'right'
  fontWeight?: 'bold' | 'normal'
  subLabel?: string
}

type LayoutType = {
  labelWidth?: number
  labelPosition?: 'top' | 'left' | 'right'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
}

export type FieldsType = {
  id: string // 字段id
  type: ComponentType // 字段类型
  label: string // 字段标签
  prop?: string // el-form-item的prop属性
  props?: PropsType // 组件字段属性
  events?: Partial<EventsType[ComponentTypeKey]> // 组件事件
  colSpan?: number
  visible?: true | false
  disabled?: boolean
  labelWidth?: number
  required?: boolean
  size?: 'large' | 'default' | 'small'
  rules?: object
  labelPosition?: 'top' | 'left' | 'right'
  children?: FieldsType[]
}

export type ComponentType =
  | 'input'
  | 'select'
  | 'row'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'colorPick'
  | 'dateTimePicker'
  | 'datePicker'
  | 'upload'
  | 'divider'
  | 'inputNumber'
  | 'col'
  | ((...args: unknown[]) => unknown)

type ComponentTypeKey =
  | 'input'
  | 'select'
  | 'row'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'colorPick'
  | 'dateTimePicker'
  | 'datePicker'
  | 'upload'
  | 'divider'
  | 'inputNumber'

type PropsType = {
  [key: string]: string | number | boolean | undefined | OptionsType[] | string[]
  options?: OptionsType[]
}

export type EventsType = {
  inputNumber: {
    change?: (currentValue: number | undefined, oldValue: number | undefined) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
  }
  input: {
    change?: (value: string | number) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    input?: (value: string | number) => void
    clear?: () => void
  }
  select: {
    change?: (value: unknown) => void
    visibleChange?: (visible: boolean) => void
    removeTag?: (tagValue: unknown) => void
    clear?: () => void
    bulr?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    popupScroll?: (data: { scrollTop: number; scrollLeft: number }) => void
  }
  radio: {
    change?: (value: string | number | boolean) => void
  }
  checkbox: {
    change?: (value: string | number | boolean) => void
  }
  switch: {
    focus?: () => void
  }
  colorPick: {
    change?: (value: string) => void
  }
  dateTimePicker: {
    change?: (value: string) => void
    blur?: (e: FocusEvent) => void
    focus?: (e: FocusEvent) => void
    clear?: () => void
    calendarChange?: (val: [Date, null | Date]) => void
    visibleChange?: (visibility: boolean) => void
  }
  datePicker: {
    change?: (value: string) => void
    blur?: (e: FocusEvent) => void
    focus?: (e: FocusEvent) => void
    clear?: () => void
    calendarChange?: (val: [Date, null | Date]) => void
    panelChange?: (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void
    visibleChange?: (visibility: boolean) => void
  }
  upload: {
    change?: (value: string | number | boolean | undefined) => void
  }
  divider: {
    click?: (event: MouseEvent) => void
  }
  row: {
    click?: (event: MouseEvent) => void
  }
}

export type ComponentEventsType = keyof EventsType

type OptionsType = {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

type submitType = {
  url: string
  method: string
  data: object
  headers?: Record<string, string>
  successMessage?: string
  errorMessage?: string
}

type BtnType = {
  submitBtnText?: string
  resetBtn?: boolean
  resetBtnText?: string
}
