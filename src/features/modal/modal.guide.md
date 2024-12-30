/\*\*

- Integrated Modal System
-
- ModalContext와 ModalStore를 통합한 시스템입니다.
- Context는 React의 컴포넌트 트리를 통한 모달 상태 전파에 사용되고,
- Store는 전역 상태 관리와 다중 모달 관리에 사용됩니다.
  \*/

import { create } from 'zustand'
import React, { createContext, useContext, useEffect } from 'react'
import { Dialog } from '@/components/ui/dialog'

// === Shared Types ===
export interface ModalComponentProps<TResult = void> {
isOpen: boolean
onClose: () => void
onSubmit: (result: TResult) => void
}

// === Store ===
interface ModalState<TResult = void, TProps = object> {
id: string
component: React.ComponentType<TProps & ModalComponentProps<TResult>>
props: Partial<TProps>
isOpen: boolean
resolve: (value: TResult) => void
reject: (reason?: unknown) => void
}

interface ModalStore {
modals: ModalState[]
activeModalId: string | null
openModal: <TResult, TProps extends object = object>(
component: React.ComponentType<TProps & ModalComponentProps<TResult>>,
props?: Partial<TProps>
) => Promise<TResult>
closeModal: (id: string) => void
submitModal: <TResult>(id: string, result: TResult) => void
}

export const useModalStore = create<ModalStore>((set) => ({
modals: [],
activeModalId: null,

openModal: (component, props = {}) => {
return new Promise((resolve, reject) => {
const id = `modal_${Math.random().toString(36).substr(2, 9)}`

      set(state => ({
        modals: [...state.modals, {
          id,
          component,
          props,
          isOpen: true,
          resolve,
          reject
        }],
        activeModalId: id
      }))
    })

},

closeModal: (id) => {
set(state => {
const modalToClose = state.modals.find(modal => modal.id === id)
if (modalToClose) {
modalToClose.reject(new Error('Modal closed without submission'))
}
return {
modals: state.modals.filter(modal => modal.id !== id),
activeModalId: state.modals.length > 1
? state.modals[state.modals.length - 2]?.id ?? null
: null
}
})
},

submitModal: (id, result) => {
set(state => {
const modalToSubmit = state.modals.find(modal => modal.id === id)
if (modalToSubmit) {
modalToSubmit.resolve(result)
}
return {
modals: state.modals.filter(modal => modal.id !== id),
activeModalId: state.modals.length > 1
? state.modals[state.modals.length - 2]?.id ?? null
: null
}
})
}
}))

// === Context ===
interface ModalContextValue {
openModal: ModalStore['openModal']
closeModal: ModalStore['closeModal']
submitModal: ModalStore['submitModal']
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const store = useModalStore()

return (
<ModalContext.Provider value={{
      openModal: store.openModal,
      closeModal: store.closeModal,
      submitModal: store.submitModal
    }}>
{children}
<ModalContainer />
</ModalContext.Provider>
)
}

export const useModal = () => {
const context = useContext(ModalContext)
if (!context) {
throw new Error('useModal must be used within a ModalProvider')
}
return context
}

// === Modal Container ===
const ModalContainer: React.FC = () => {
const modals = useModalStore(state => state.modals)
const activeModalId = useModalStore(state => state.activeModalId)

// 모달 스택에 ESC 키 이벤트 바인딩
useEffect(() => {
const handleEscape = (event: KeyboardEvent) => {
if (event.key === 'Escape' && activeModalId) {
useModalStore.getState().closeModal(activeModalId)
}
}

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)

}, [activeModalId])

return (
<>
{modals.map(({ id, component: ModalComponent, props, isOpen }) => (

<div
key={id}
className={`fixed inset-0 z-50 flex items-center justify-center ${
            isOpen && id === activeModalId ? 'visible' : 'invisible'
          }`} >
<div className="fixed inset-0 bg-black/50" />
<ModalComponent
{...props}
isOpen={isOpen && id === activeModalId}
onClose={() => useModalStore.getState().closeModal(id)}
onSubmit={(result: unknown) => useModalStore.getState().submitModal(id, result)}
/>
</div>
))}
</>
)
}

// === Example Usage ===

// 1. Confirmation Modal Example
interface ConfirmationModalProps {
title: string
message: string
}

export const ConfirmationModal: React.FC<
ConfirmationModalProps & ModalComponentProps<boolean>

> = ({ title, message, isOpen, onClose, onSubmit }) => {
> return (

    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onSubmit(false)}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={() => onSubmit(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            확인
          </button>
        </div>
      </div>
    </Dialog>

)
}

// 2. Form Modal Example
interface FormData {
title: string
content: string
}

interface FormModalProps {
initialData?: Partial<FormData>
}

export const FormModal: React.FC<
FormModalProps & ModalComponentProps<FormData>

> = ({ initialData, isOpen, onClose, onSubmit }) => {
> const [formData, setFormData] = React.useState<FormData>({

    title: initialData?.title ?? '',
    content: initialData?.content ?? ''

})

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
onSubmit(formData)
}

return (

<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
<form onSubmit={handleSubmit} className="p-6 space-y-4">
<h2 className="text-xl font-semibold">새 글 작성</h2>
<div className="space-y-2">
<input
type="text"
value={formData.title}
onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
placeholder="제목"
className="w-full p-2 border rounded"
/>
<textarea
value={formData.content}
onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
placeholder="내용"
className="w-full p-2 border rounded h-32"
/>
</div>
<div className="flex justify-end space-x-2">
<button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
취소
</button>
<button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
저장
</button>
</div>
</form>
</Dialog>
)
}

// 3. Usage Example
export const ExampleComponent: React.FC = () => {
const { openModal } = useModal()

const handleConfirmation = async () => {
try {
const confirmed = await openModal<boolean, ConfirmationModalProps>(
ConfirmationModal,
{
title: '확인',
message: '정말 삭제하시겠습니까?'
}
)

      if (confirmed) {
        console.log('User confirmed')
      }
    } catch (error) {
      console.log('Modal closed or rejected:', error)
    }

}

const handleOpenForm = async () => {
try {
const formData = await openModal<FormData, FormModalProps>(
FormModal,
{
initialData: {
title: '제목',
content: '내용'
}
}
)

      console.log('Form submitted:', formData)
    } catch (error) {
      console.log('Modal closed or rejected:', error)
    }

}

return (

<div className="space-x-4">
<button
        onClick={handleConfirmation}
        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
      >
삭제 확인
</button>
<button
        onClick={handleOpenForm}
        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
새 글 작성
</button>
</div>
)
}

\*/
