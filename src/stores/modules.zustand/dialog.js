import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// 초기 상태 정의
const initialState = {
  loadingDialog: { open: false },
  alertDialog: { open: false, content: '' },
  confirmDialog: {
    open: false,
    onOk: () => {},
    onClose: () => {},
    title: '',
    content: '',
    flag: '',
    callback: () => {},
    maxWidth: 'xs',
    textAlign: 'center'
  },
  cancelDialog: {
    open: false,
    onOk: () => {},
    onClose: () => {},
    title: '',
    content: '',
    callback: () => {},
    maxWidth: 'xs',
    textAlign: 'center'
  },
  assetSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {}
  },
  contractSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {}
  },
  memberSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {},
    multiSelect: false,
    flag: '',
    callback: () => {},
    conReqCt: ''
  },
  groupSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {},
    multiSelect: false
  },
  mainGroupSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    selected: [],
    onSelect: () => {},
    multiSelect: false
  },
  positionSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {},
    multiSelect: false
  },
  coverSelectDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    callback: () => {},
    coverOptionTy: 'N'
  },
  templateSelectDialog: {
    open: false,
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {}
  },
  editorDialog: {
    open: false,
    onOk: () => {},
    onClose: () => {},
    selected: [],
    setSelected: () => {},
    assetList: [],
    saveContents: () => {},
    callback: () => {},
    openTemplateSelectDialog: () => {},
    calCtChanged: () => {},
    overrideAll: () => {}
  },
  maintenanceRequestDialog: {
    open: false,
    onCancel: () => {},
    onClose: () => {},
    onOk: () => {},
    callback: () => {},
    param: null,
    setParam: () => {}
  },
  maintenanceFinishDialog: {
    open: false,
    onCancel: () => {},
    onClose: () => {},
    onOk: () => {},
    callback: () => {},
    param: null,
    setParam: () => {},
    flag: ''
  },
  maintenanceCreateDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    srvTyCdIdList: [],
    srvIptcTyCdList: [],
    param: null,
    handleChange: () => {},
    validateErrorList: [],
    setValidateErrorList: [],
    files: [],
    setFiles: () => {},
    openAssetSelectDialog: () => {},
    openMemberSelectDialog: () => {},
    flag: ''
  },
  batchUploadDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    param: null,
    setParam: () => {},
    openGroupSelectDialog: () => {},
    files: [],
    setFiles: () => {},
    validateErrorList: [],
    setValidateErrorList: () => {},
    flag: ''
  },
  batchUploadResultDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    flag: '',
    data: []
  },
  memberDetailDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    tyCdList: [],
    memberData: null,
    handleChange: () => {},
    validateErrorList: [],
    setValidateErrorList: () => {},
    callback: () => {},
    flag: ''
  },
  matchingRequestListDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    acceptMatching: () => {},
    fetchContract: () => {}
  },
  matchingRequestDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    param: null,
    setParam: () => {},
    files: [],
    setFiles: () => {},
    validateErrorList: [],
    setValidateErrorList: () => {}
  },
  maintenanceEvaluateDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    tempData: null,
    setTempData: () => {},
    callback: () => {}
  },
  passwordChangeDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    param: null,
    handleChange: () => {},
    validateErrorList: [],
    setValidateErrorList: () => {}
  },
  companyMemberDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    param: null,
    handleChange: () => {},
    validateErrorList: [],
    setValidateErrorList: [],
    checkMbrId: () => {},
    mbrIdChecked: -1,
    setMbrIdChecked: () => {},
    checkCmRegNo: () => {},
    cmRegNoChecked: -1,
    setCmRegNoChecked: () => {},
    openTermsDialog: () => {},
    onMemberDelete: () => {}
  },
  excelDownDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    param: null,
    handleChange: () => {},
    validateErrorList: [],
    setValidateErrorList: () => {}
  },
  temporaryPasswordDialog: {
    open: false,
    onOk: () => {},
    content: '',
    callback: () => {},
    maxWidth: 'xs',
    textAlign: 'center'
  },
  requestDialog: {
    open: false,
    onClose: () => {},
    onOk: () => {},
    data: [],
    keyword: '',
    setKeyword: () => {},
    selected: [],
    onSelect: () => {},
    multiSelect: false,
    flag: '',
    callback: () => {},
    conReqCt: '',
    title: ''
  }
}

// Zustand store 생성
const useDialogStore = create(
  devtools((_set, _get, _api) => ({
    ...initialState,

    // 로딩 다이얼로그
    openLoadingDialog: () => _set({ loadingDialog: { open: true } }),
    closeLoadingDialog: () => _set({ loadingDialog: { open: false } }),

    // 알림 다이얼로그
    openAlertDialog: (payload) => _set((state) => ({ alertDialog: { open: true, ...payload } })),
    closeAlertDialog: () => _set({ alertDialog: { open: false } }),

    // 확인 다이얼로그
    openConfirmDialog: (payload) =>
      _set((state) => ({ confirmDialog: { ...state.confirmDialog, open: true, ...payload } })),
    closeConfirmDialog: () =>
      _set((state) => ({ confirmDialog: { ...state.confirmDialog, open: false } })),

    // 취소 다이얼로그
    openCancelDialog: (payload) =>
      _set((state) => ({ cancelDialog: { ...state.cancelDialog, open: true, ...payload } })),
    closeCancelDialog: () =>
      _set((state) => ({ cancelDialog: { ...state.cancelDialog, open: false } })),

    // 자산선택 다이얼로그
    openAssetSelectDialog: (payload) =>
      _set((state) => ({
        assetSelectDialog: { ...state.assetSelectDialog, open: true, ...payload }
      })),
    closeAssetSelectDialog: () =>
      _set((state) => ({ assetSelectDialog: { ...state.assetSelectDialog, open: false } })),

    // 계약선택 다이얼로그
    openContractSelectDialog: (payload) =>
      _set((state) => ({
        contractSelectDialog: { ...state.contractSelectDialog, open: true, ...payload }
      })),
    closeContractSelectDialog: () =>
      _set((state) => ({ contractSelectDialog: { ...state.contractSelectDialog, open: false } })),

    // 멤버선택 다이얼로그
    openMemberSelectDialog: (payload) =>
      _set((state) => ({
        memberSelectDialog: { ...state.memberSelectDialog, open: true, ...payload }
      })),
    closeMemberSelectDialog: () =>
      _set((state) => ({ memberSelectDialog: { ...state.memberSelectDialog, open: false } })),

    // 그룹선택 다이얼로그
    openGroupSelectDialog: (payload) =>
      _set((state) => ({
        groupSelectDialog: { ...state.groupSelectDialog, open: true, ...payload }
      })),
    closeGroupSelectDialog: () =>
      _set((state) => ({ groupSelectDialog: { ...state.groupSelectDialog, open: false } })),

    // 메인그룹선택 다이얼로그
    openMainGroupSelectDialog: (payload) =>
      _set((state) => ({
        mainGroupSelectDialog: { ...state.mainGroupSelectDialog, open: true, ...payload }
      })),
    closeMainGroupSelectDialog: () =>
      _set((state) => ({ mainGroupSelectDialog: { ...state.mainGroupSelectDialog, open: false } })),

    // 직책선택 다이얼로그
    openPositionSelectDialog: (payload) =>
      _set((state) => ({
        positionSelectDialog: { ...state.positionSelectDialog, open: true, ...payload }
      })),
    closePositionSelectDialog: () =>
      _set((state) => ({ positionSelectDialog: { ...state.positionSelectDialog, open: false } })),

    // 표지선택 다이얼로그
    openCoverSelectDialog: (payload) =>
      _set((state) => ({
        coverSelectDialog: { ...state.coverSelectDialog, open: true, ...payload }
      })),
    closeCoverSelectDialog: () =>
      _set((state) => ({ coverSelectDialog: { ...state.coverSelectDialog, open: false } })),

    // 템플릿선택 다이얼로그
    openTemplateSelectDialog: (payload) =>
      _set((state) => ({
        templateSelectDialog: { ...state.templateSelectDialog, open: true, ...payload }
      })),
    closeTemplateSelectDialog: () =>
      _set((state) => ({ templateSelectDialog: { ...state.templateSelectDialog, open: false } })),

    // 에디터 다이얼로그
    openEditorDialog: (payload) =>
      _set((state) => ({ editorDialog: { ...state.editorDialog, open: true, ...payload } })),
    closeEditorDialog: () =>
      _set((state) => ({ editorDialog: { ...state.editorDialog, open: false } })),

    // 점검계획보고 다이얼로그
    openMaintenanceRequestDialog: (payload) =>
      _set((state) => ({
        maintenanceRequestDialog: { ...state.maintenanceRequestDialog, open: true, ...payload }
      })),
    closeMaintenanceRequestDialog: () =>
      _set((state) => ({
        maintenanceRequestDialog: { ...state.maintenanceRequestDialog, open: false }
      })),

    // 점검완료보고 다이얼로그
    openMaintenanceFinishDialog: (payload) =>
      _set((state) => ({
        maintenanceFinishDialog: { ...state.maintenanceFinishDialog, open: true, ...payload }
      })),
    closeMaintenanceFinishDialog: () =>
      _set((state) => ({
        maintenanceFinishDialog: { ...state.maintenanceFinishDialog, open: false }
      })),

    // 서비스등록 다이얼로그
    openMaintenanceCreateDialog: (payload) =>
      _set((state) => ({
        maintenanceCreateDialog: { ...state.maintenanceCreateDialog, open: true, ...payload }
      })),
    closeMaintenanceCreateDialog: () =>
      _set((state) => ({
        maintenanceCreateDialog: { ...state.maintenanceCreateDialog, open: false }
      })),

    // 일괄등록 다이얼로그
    openBatchUploadDialog: (payload) =>
      _set((state) => ({
        batchUploadDialog: { ...state.batchUploadDialog, open: true, ...payload }
      })),
    closeBatchUploadDialog: () =>
      _set((state) => ({ batchUploadDialog: { ...state.batchUploadDialog, open: false } })),

    // 일괄등록결과 다이얼로그
    openBatchUploadResultDialog: (payload) =>
      _set((state) => ({
        batchUploadResultDialog: { ...state.batchUploadResultDialog, open: true, ...payload }
      })),
    closeBatchUploadResultDialog: () =>
      _set((state) => ({
        batchUploadResultDialog: { ...state.batchUploadResultDialog, open: false }
      })),

    // 멤버상세정보 다이얼로그
    openMemberDetailDialog: (payload) =>
      _set((state) => ({
        memberDetailDialog: { ...state.memberDetailDialog, open: true, ...payload }
      })),
    closeMemberDetailDialog: () =>
      _set((state) => ({ memberDetailDialog: { ...state.memberDetailDialog, open: false } })),

    // 중계신청회사목록 다이얼로그
    openMatchingRequestListDialog: (payload) =>
      _set((state) => ({
        matchingRequestListDialog: { ...state.matchingRequestListDialog, open: true, ...payload }
      })),
    closeMatchingRequestListDialog: () =>
      _set((state) => ({
        matchingRequestListDialog: { ...state.matchingRequestListDialog, open: false }
      })),

    // 중계신청 다이얼로그
    openMatchingRequestDialog: (payload) =>
      _set((state) => ({
        matchingRequestDialog: { ...state.matchingRequestDialog, open: true, ...payload }
      })),
    closeMatchingRequestDialog: () =>
      _set((state) => ({ matchingRequestDialog: { ...state.matchingRequestDialog, open: false } })),

    // 엔지니어평가 다이얼로그
    openMaintenanceEvaluateDialog: (payload) =>
      _set((state) => ({
        maintenanceEvaluateDialog: { ...state.maintenanceEvaluateDialog, open: true, ...payload }
      })),
    closeMaintenanceEvaluateDialog: () =>
      _set((state) => ({
        maintenanceEvaluateDialog: { ...state.maintenanceEvaluateDialog, open: false }
      })),

    // 비밀번호변경 다이얼로그
    openPasswordChangeDialog: (payload) =>
      _set((state) => ({
        passwordChangeDialog: { ...state.passwordChangeDialog, open: true, ...payload }
      })),
    closePasswordChangeDialog: () =>
      _set((state) => ({ passwordChangeDialog: { ...state.passwordChangeDialog, open: false } })),

    // 회원상세정보 다이얼로그
    openCompanyMemberDialog: (payload) =>
      _set((state) => ({
        companyMemberDialog: { ...state.companyMemberDialog, open: true, ...payload }
      })),
    closeCompanyMemberDialog: () =>
      _set((state) => ({ companyMemberDialog: { ...state.companyMemberDialog, open: false } })),

    // 엑셀다운로드 다이얼로그
    openExcelDownDialog: (payload) =>
      _set((state) => ({ excelDownDialog: { ...state.excelDownDialog, open: true, ...payload } })),
    closeExcelDownDialog: () =>
      _set((state) => ({ excelDownDialog: { ...state.excelDownDialog, open: false } })),

    // 임시비밀번호 다이얼로그
    openTemporaryPasswordDialog: (payload) =>
      _set((state) => ({
        temporaryPasswordDialog: { ...state.temporaryPasswordDialog, open: true, ...payload }
      })),
    closeTemporaryPasswordDialog: () =>
      _set((state) => ({
        temporaryPasswordDialog: { ...state.temporaryPasswordDialog, open: false }
      })),

    // 요청 다이얼로그
    openRequestDialog: (payload) =>
      _set((state) => ({ requestDialog: { ...state.requestDialog, open: true, ...payload } })),
    closeRequestDialog: () =>
      _set((state) => ({ requestDialog: { ...state.requestDialog, open: false } })),

    // 전체 초기화
    reset: () => _set(initialState)
  }))
)

export { useDialogStore }
