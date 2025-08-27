import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-3 py-2 pr-10 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg 
            focus:ring-2 focus:ring-yellow-500 focus:border-transparent
            appearance-none cursor-pointer
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-tertiary pointer-events-none" />
      </div>
    )
  }
)

Select.displayName = 'Select'