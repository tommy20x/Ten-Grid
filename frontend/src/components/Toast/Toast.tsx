import React, { useCallback, useEffect, useRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'
import { ToastProps, types } from './types'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const securityMap: { [key: string]: AlertColor } = {
  [types.INFO]: 'info',
  [types.SUCCESS]: 'success',
  [types.DANGER]: 'error',
  [types.WARNING]: 'warning',
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove, style, ttl, ...props }) => {
  const timer = useRef<number>()
  const ref = useRef(null)
  const removeHandler = useRef(onRemove)
  const { id, title, description, type } = toast

  const handleRemove = useCallback(() => removeHandler.current(id), [id, removeHandler])

  const handleMouseEnter = () => {
    clearTimeout(timer.current)
  }

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)
  }

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)

    return () => {
      clearTimeout(timer.current)
    }
  }, [timer, ttl, handleRemove])

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={true}
      autoHideDuration={6000}
      onClose={handleRemove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Alert onClose={handleRemove} title={title} severity={securityMap[type]} sx={{ width: '100%' }}>
        {description}
      </Alert>
    </Snackbar>
  )
}

export default Toast
