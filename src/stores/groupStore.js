'use client'

import { create } from 'zustand'

export const useGroupStore = create((set) => ({
  // Initial state
  currentGroup: null,
  currentGroupList: null,
  mainGroupId: null,
  selectedGroupIds: [],

  // Actions
  setCurrentGroup: (group) => set({ currentGroup: group }),

  setCurrentGroupList: (group) =>
    set({
      currentGroupList: group,
      currentGroup: group
        ? {
            gpId: group.id,
            gpNm: group.groupName,
            authLevel: group.level
          }
        : null,
      mainGroupId: group?.isMainGroup ? group.id : null,
      selectedGroupIds: group ? [group.id] : []
    }),

  setMainGroupId: (id) => set({ mainGroupId: id }),

  addSelectedGroup: (id) =>
    set((state) => ({
      selectedGroupIds: [...state.selectedGroupIds, id]
    })),

  removeSelectedGroup: (id) =>
    set((state) => ({
      selectedGroupIds: state.selectedGroupIds.filter((groupId) => groupId !== id)
    })),

  clearSelectedGroups: () => set({ selectedGroupIds: [] })
}))
