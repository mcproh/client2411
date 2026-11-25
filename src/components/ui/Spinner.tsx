// src/components/ui/Spinner.tsx
// ---------------------------------------------------------
// Переиспользуемый спиннер загрузки. Показывается в HomePage,
// пока fetchFridgeItems/addFridgeItem/deleteFridgeItem ещё
// выполняются (status === 'loading' или mutating === true).
// ---------------------------------------------------------

interface SpinnerProps {
  label?: string
}

export default function Spinner({ label = 'Загрузка...' }: SpinnerProps) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  )
}
