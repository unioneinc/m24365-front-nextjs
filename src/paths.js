// src/paths.js

import axios from '@/api/axios'
import { GroupSwitch } from '@/app/group/ui/GroupSwitch'
import { apiService, apiServiceGeneric } from '@/app/lib/apiServiceUtils'
import SkeletonLoading from '@/app/modules/components/skeleton/SkeletonLoading.jsx'
import { Typo14, Typo16 } from '@/app/ui/misc/Typo'
import { AlertDialog } from '@/app/ui/modal/AlertDialog'
import CustomDropdown from '@/components/ui/CustomDropdown'
import { Pagination } from '@/features/pagination/Pagination'
import { useApi } from '@/hooks/useApi'
import { GROUP_TYPE_OPTIONS, STATUS_OPTIONS } from '@/utils/groupUtils'

export {
  AlertDialog,
  apiService,
  apiServiceGeneric,
  axios,
  CustomDropdown,
  GROUP_TYPE_OPTIONS,
  GroupSwitch,
  Pagination,
  SkeletonLoading,
  STATUS_OPTIONS,
  Typo14,
  Typo16,
  useApi
}

export const PATHS = {
  COMPONENTS: '@/components',
  MODULES: '@/modules',
  UI: '@/components/ui',
  LAYOUTS: '@/layouts',
  PAGES: '@/pages',
  UTILS: '@/utils',
  SERVICES: '@/services',
  HOOKS: '@/hooks',
  SKELETON_LOADING: '@/app/modules/components/skeleton/SkeletonLoading.jsx'
}
