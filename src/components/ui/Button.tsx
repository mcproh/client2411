// src/components/ui/Button.tsx
// ---------------------------------------------------------
// Переиспользуемая кнопка. Используется в AddFridgeItemForm,
// LoginPage и RegisterPage — один компонент, три разные формы.
// ---------------------------------------------------------

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')
  return <button className={classes} {...rest} />
}
