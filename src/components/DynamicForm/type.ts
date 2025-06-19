import type { PropType } from 'vue'

export const schemaProps = {
  formConfig: {
    type: Object as PropType<FormConfig>,
    required: true,
    default: () => ({
      id: '',
      title: {
        label: '',
        fontSize: 16,
        color: '',
        align: 'left',
        fontWeight: 'normal',
        subLabel: '',
      },
    }),
  },
  fields: {
    type: Array as PropType<FieldsType[]>,
    default: () => [],
  },
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
  btn?: BtnType
}

export type FieldsType = {
  type: string // 字段类型
  label: string // 字段标签
  defaultValue?: unknown // 字段默认值
  colSpan?: number
  visible?: true | false
  disabled?: boolean
  labelWidth?: number
  required?: boolean
  size?: 'large' | 'default' | 'small'
  rules?: object
  labelPosition?: 'top' | 'left' | 'right'
  component: string
  children?: FieldsType[]
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
