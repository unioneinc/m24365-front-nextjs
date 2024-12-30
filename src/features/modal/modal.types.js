// src/features/modal/modal.types.js

/*
모달 시스템에서 사용되는 주요 데이터 구조 명세

BaseModalData:
- id: string (선택)
- title: string (선택)
- selectedGroup: any (선택)

ModalData: BaseModalData를 확장하며 추가 동적 속성 허용

ModalProps:
- id: string
- isOpen: boolean
- onClose: function
- onSubmit: function
- data: ModalData

ModalState:
- id: string
- component: React Component
- props: ModalData
- isOpen: boolean
- resolve: function
- reject: function

ModalStore:
- modals: ModalState[]
- activeModalId: string | null
- openModal: function
- closeModal: function
- submitModal: function

ModalContextValue:
- openModal: function
- closeModal: function
- submitModal: function

ModalProviderProps:
- children: React Node
*/

const modalTypes = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  CANCEL: 'CANCEL',
  LOADING: 'LOADING',
  ASSET_SELECT: 'ASSET_SELECT',
  CONTRACT_SELECT: 'CONTRACT_SELECT',
  MEMBER_SELECT: 'MEMBER_SELECT',
  GROUP_SELECT: 'GROUP_SELECT',
  MAIN_GROUP_SELECT: 'MAIN_GROUP_SELECT',
  POSITION_SELECT: 'POSITION_SELECT',
  COVER_SELECT: 'COVER_SELECT',
  TEMPLATE_SELECT: 'TEMPLATE_SELECT',
  EDITOR: 'EDITOR',
  MAINTENANCE_REQUEST: 'MAINTENANCE_REQUEST',
  MAINTENANCE_FINISH: 'MAINTENANCE_FINISH',
  MAINTENANCE_CREATE: 'MAINTENANCE_CREATE',
  BATCH_UPLOAD: 'BATCH_UPLOAD',
  BATCH_UPLOAD_RESULT: 'BATCH_UPLOAD_RESULT',
  MEMBER_DETAIL: 'MEMBER_DETAIL',
  MATCHING_REQUEST_LIST: 'MATCHING_REQUEST_LIST',
  MATCHING_REQUEST: 'MATCHING_REQUEST',
  MAINTENANCE_EVALUATE: 'MAINTENANCE_EVALUATE',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  COMPANY_MEMBER: 'COMPANY_MEMBER',
  EXCEL_DOWN: 'EXCEL_DOWN',
  TEMPORARY_PASSWORD: 'TEMPORARY_PASSWORD',
  REQUEST: 'REQUEST'
}

export default modalTypes
