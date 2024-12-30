import { useDialogStore } from './dialog'

// 팝업창 띄우기 함수들을 Zustand store에서 가져와서 내보내기
export const openLoadingDialog = () => useDialogStore.getState().openLoadingDialog()
export const closeLoadingDialog = () => useDialogStore.getState().closeLoadingDialog()
export const openAlertDialog = (param) => useDialogStore.getState().openAlertDialog(param)
export const openConfirmDialog = (param) => useDialogStore.getState().openConfirmDialog(param)
export const openCancelDialog = (param) => useDialogStore.getState().openCancelDialog(param)
export const openAssetSelectDialog = (param) =>
  useDialogStore.getState().openAssetSelectDialog(param)
export const openContractSelectDialog = (param) =>
  useDialogStore.getState().openContractSelectDialog(param)
export const openMemberSelectDialog = (param) =>
  useDialogStore.getState().openMemberSelectDialog(param)
export const openGroupSelectDialog = (param) =>
  useDialogStore.getState().openGroupSelectDialog(param)
export const openMainGroupSelectDialog = (param) =>
  useDialogStore.getState().openMainGroupSelectDialog(param)
export const openTemplateSelectDialog = (param) =>
  useDialogStore.getState().openTemplateSelectDialog(param)
export const openEditorDialog = (param) => useDialogStore.getState().openEditorDialog(param)
export const openMaintenanceRequestDialog = (param) =>
  useDialogStore.getState().openMaintenanceRequestDialog(param)
export const openMaintenanceFinishDialog = (param) =>
  useDialogStore.getState().openMaintenanceFinishDialog(param)
export const openMaintenanceCreateDialog = (param) =>
  useDialogStore.getState().openMaintenanceCreateDialog(param)
export const openBatchUploadDialog = (param) =>
  useDialogStore.getState().openBatchUploadDialog(param)
export const openBatchUploadResultDialog = (param) =>
  useDialogStore.getState().openBatchUploadResultDialog(param)
export const openMemberDetailDialog = (param) =>
  useDialogStore.getState().openMemberDetailDialog(param)
export const openMatchingRequestListDialog = (param) =>
  useDialogStore.getState().openMatchingRequestListDialog(param)
export const openMatchingRequestDialog = (param) =>
  useDialogStore.getState().openMatchingRequestDialog(param)
export const openMaintenanceEvaluateDialog = (param) =>
  useDialogStore.getState().openMaintenanceEvaluateDialog(param)
export const openPasswordChangeDialog = (param) =>
  useDialogStore.getState().openPasswordChangeDialog(param)
export const openCompanyMemberDialog = (param) =>
  useDialogStore.getState().openCompanyMemberDialog(param)
export const openExcelDownDialog = (param) => useDialogStore.getState().openExcelDownDialog(param)
export const openPositionSelectDialog = (param) =>
  useDialogStore.getState().openPositionSelectDialog(param)
export const openCoverSelectDialog = (param) =>
  useDialogStore.getState().openCoverSelectDialog(param)
export const openTemporaryPasswordDialog = (param) =>
  useDialogStore.getState().openTemporaryPasswordDialog(param)
