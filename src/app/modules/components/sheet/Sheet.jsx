'use client'

import * as React from 'react'
import { Drawer } from '@mui/material'
import { createContext, useContext } from 'react'

const SheetContext = createContext({
  open: false,
  onOpenChange: (open) => {},
  modal: true
})

const Sheet = React.forwardRef(
  ({ children, _open = false, onOpenChange, modal = true, ..._props }, _ref) => {
    return (
      <SheetContext.Provider value={{ open: _open, onOpenChange, modal }}>
        {children}
      </SheetContext.Provider>
    )
  }
)

Sheet.displayName = 'Sheet'

const SheetTrigger = React.forwardRef(({ children, asChild = false, ..._props }, _ref) => {
  const { onOpenChange } = useContext(SheetContext)

  const child = asChild ? (
    React.Children.only(children)
  ) : (
    <button ref={_ref} {..._props}>
      {children}
    </button>
  )

  return React.cloneElement(child, {
    onClick: () => onOpenChange(true)
  })
})

SheetTrigger.displayName = 'SheetTrigger'

const SheetContent = React.forwardRef(({ children, side = 'right', style, ..._props }, _ref) => {
  const { open, onOpenChange, _modal } = useContext(SheetContext)

  return (
    <Drawer
      ref={_ref}
      anchor={side}
      open={open}
      onClose={() => onOpenChange(false)}
      ModalProps={{
        keepMounted: true
      }}
      PaperProps={{
        style: {
          ...style
        }
      }}
      {..._props}
    >
      {children}
    </Drawer>
  )
})

SheetContent.displayName = 'SheetContent'

export { Sheet, SheetContent, SheetTrigger }
