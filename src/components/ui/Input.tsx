// src/components/ui/Input.tsx
// ---------------------------------------------------------
// Переиспользуемое поле ввода (с опциональным label сверху).
// Используется в AddFridgeItemForm, LoginPage и RegisterPage.
// ---------------------------------------------------------

import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, id, ...rest }: InputProps) {
  if (!label) {
    return <input id={id} {...rest} />
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input id={id} {...rest} />
    </div>
  )
}
