import * as React from 'react'
import { cn } from '../../utils/cn'
import { phoneMask, cpfMask, cepMask } from '../../utils/masks'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  mask?: 'phone' | 'cpf' | 'cep'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  icon?: React.ReactNode // Alias para leftIcon para compatibilidade
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label, 
    error, 
    helperText, 
    mask, 
    leftIcon, 
    rightIcon,
    icon,
    onChange,
    value,
    ...props 
  }, ref) => {
    // Use icon como leftIcon se leftIcon não estiver definido
    const finalLeftIcon = leftIcon || icon
    const [internalValue, setInternalValue] = React.useState(value || '')

    const applyMask = (inputValue: string): string => {
      switch (mask) {
        case 'phone':
          return phoneMask(inputValue)
        case 'cpf':
          return cpfMask(inputValue)
        case 'cep':
          return cepMask(inputValue)
        default:
          return inputValue
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      if (mask) {
        newValue = applyMask(newValue)
      }

      setInternalValue(newValue)
      
      // Criar um novo evento com o valor mascarado
      const maskedEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      }
      
      onChange?.(maskedEvent as React.ChangeEvent<HTMLInputElement>)
    }

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(mask ? applyMask(String(value)) : String(value))
      }
    }, [value, mask, applyMask])

    const inputId = React.useId()
    const errorId = React.useId()
    const helperTextId = React.useId()

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-theme-secondary mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {finalLeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-tertiary">
              {finalLeftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-theme-primary bg-theme-secondary px-3 py-2 text-sm text-theme-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-theme-muted focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50',
              finalLeftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            ref={ref}
            value={internalValue}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperTextId : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-tertiary">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperTextId} className="mt-1 text-sm text-theme-muted">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }