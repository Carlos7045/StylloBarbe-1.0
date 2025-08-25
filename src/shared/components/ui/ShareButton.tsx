'use client'

import * as React from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { Button } from './Button'
import { usePWA } from '../../hooks/usePWA'
import { useToast } from '../../hooks/useToast'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  variant?: 'default' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ShareButton({
  title = 'StylloBarber',
  text = 'Confira este sistema incrível para barbearias!',
  url,
  variant = 'default',
  size = 'md',
  className,
}: ShareButtonProps) {
  const { shareContent, canShare } = usePWA()
  const { toast } = useToast()
  const [copied, setCopied] = React.useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: shareUrl,
    }

    const success = await shareContent(shareData)
    
    if (success) {
      if (canShare) {
        toast({
          title: 'Compartilhado!',
          description: 'Conteúdo compartilhado com sucesso',
          variant: 'success',
        })
      } else {
        // Fallback: copiou para clipboard
        setCopied(true)
        toast({
          title: 'Link copiado!',
          description: 'Link copiado para a área de transferência',
          variant: 'success',
        })
        
        setTimeout(() => setCopied(false), 2000)
      }
    } else {
      toast({
        title: 'Erro ao compartilhar',
        description: 'Não foi possível compartilhar o conteúdo',
        variant: 'destructive',
      })
    }
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className={className}
        title={canShare ? 'Compartilhar' : 'Copiar link'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : canShare ? (
          <Share2 className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleShare}
      className={className}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2 text-green-600" />
          Copiado!
        </>
      ) : canShare ? (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          Copiar Link
        </>
      )}
    </Button>
  )
}