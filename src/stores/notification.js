// @/app/store/notification.js
import { create } from 'zustand'
// import { getNotificationSetupList, getNotificationSetup } from '@/app/api/notification'

export const useNotificationStore = create((set) => ({
  data: null,
  isLoading: false,
  fetchNotifications: async () => {
    try {
      set({ isLoading: true })
      const response = await getNotificationSetupList()
      set({ data: response })
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      set({ isLoading: false })
    }
  },
  updateNotification: async (param) => {
    try {
      set({ isLoading: true })
      await getNotificationSetup(param)
      // 업데이트 후 목록 재조회
      const response = await getNotificationSetupList()
      set({ data: response })
    } catch (error) {
      console.error('Failed to update notification:', error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
