/**
 * 모달 시스템의 public API
 */

// import * as ModalSystem from './modal-system';
// // import ModalLauncher from './launchers/ModalLauncher';
// // import ModalHeader from './components/modal-header/ModalHeader';
// // import ModalContainer from './components/modal-container/ModalContainer';
// // import BaseModal from './components/Modal';

// // 각각의 컴포넌트와 훅을 명확하게 export
// export const useModal = ModalSystem.useModal;
// export const useModalStore = ModalSystem.useModalStore;
// export const ModalProvider = ModalSystem.ModalProvider;
// export const ModalContext = ModalSystem.ModalContext;
// export const Modal = BaseModal;

// // 나머지 컴포넌트들 export
// export { ModalLauncher, ModalHeader, ModalContainer };

import { useModalStore, useModal } from './modal-system'
import ModalProvider from './modal-system'

export { useModalStore, useModal }
export const _ModalProvider = ModalProvider
