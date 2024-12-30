'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const initialState = {
  openNavi: false,
  openService: false,
  openGroup: false,
  openContract: false,
  openChart: false,
  openIssue: false,
  openSetting: false,
  openBoard: false,
  openMatching: false
}

const useNaviStore = create(
  devtools((set) => ({
    ...initialState,

    toggleOpenNavi: () => set((state) => ({ openNavi: !state.openNavi })),

    toggleOpenService: () => set((state) => ({ openService: !state.openService })),

    toggleOpenGroup: () => set((state) => ({ openGroup: !state.openGroup })),

    toggleOpenContract: () => set((state) => ({ openContract: !state.openContract })),

    toggleOpenChart: () => set((state) => ({ openChart: !state.openChart })),

    toggleOpenIssue: () => set((state) => ({ openIssue: !state.openIssue })),

    toggleOpenSetting: () => set((state) => ({ openSetting: !state.openSetting })),

    toggleOpenBoard: () => set((state) => ({ openBoard: !state.openBoard })),

    toggleOpenMatching: () => set((state) => ({ openMatching: !state.openMatching })),

    reset: () => set(initialState)
  }))
)

export { useNaviStore }
