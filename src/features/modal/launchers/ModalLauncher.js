import { React } from 'react'
import { useModal } from '@/features/modal'
// import GroupSelect from '@/common/dialogs/group-select/GroupSelect';
// import AssetSelectView from '@/common/dialogs/asset-select/AssetSelectView.dialog';

export const useModalLauncher = () => {
  const { _openModal } = useModal()

  // const launchGroupSelect = async () => {
  //   try {
  //     const result = await _openModal(GroupSelect, {
  //       isOpen: true,
  //       data: {
  //         open: true,
  //         data: [],
  //         selectedId: [],
  //       },
  //     });

  //     if (result) {
  //       _logger.info('선택된 그룹:', result);
  //       return result;
  //     }
  //   } catch (error) {
  //     _logger.info('모달이 닫혔습니다:', error);
  //     throw error;
  //   }
  // };

  // const launchAssetSelect = async () => {
  //   try {
  //     const result = await _openModal(AssetSelectView, {
  //       isOpen: true,
  //       data: {
  //         open: true,
  //         data: [],
  //         selectedId: [],
  //       },
  //     });

  //     if (result) {
  //       _logger.info('선택된 그룹:', result);
  //       return result;
  //     }
  //   } catch (error) {
  //     _logger.info('모달이 닫혔습니다:', error);
  //     throw error;
  //   }
  // };

  // 다른 모달 launcher 함수들도 여기에 추가할 수 있습니다
  // const launchSomeOtherModal = async () => { ... }

  // return {

  //   // launchGroupSelect,
  //   // launchAssetSelect,
  //   // launchSomeOtherModal,
  // }
  return null
}
