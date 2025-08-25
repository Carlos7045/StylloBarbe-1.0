'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from './Button'
import { useTheme } from '../providers/ThemeProvider'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './Modal'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[300px]">
        <ModalHeader>
          <ModalTitle>Escolher tema</ModalTitle>
        </ModalHeader>
        <div className="grid gap-2">
          <Button
            variant={theme === 'light' ? 'primary' : 'ghost'}
            className="justify-start"
            onClick={() => setTheme('light')}
          >
            <Sun className="mr-2 h-4 w-4" />
            Claro
          </Button>
          <Button
            variant={theme === 'dark' ? 'primary' : 'ghost'}
            className="justify-start"
            onClick={() => setTheme('dark')}
          >
            <Moon className="mr-2 h-4 w-4" />
            Escuro
          </Button>
          <Button
            variant={theme === 'system' ? 'primary' : 'ghost'}
            className="justify-start"
            onClick={() => setTheme('system')}
          >
            <Monitor className="mr-2 h-4 w-4" />
            Sistema
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

// Versão simples que apenas alterna entre claro e escuro
export function SimpleThemeToggle() {
  const { toggleTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {resolvedTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      </span>
    </Button>
  )
}