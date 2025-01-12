import { cn } from '@/lib/utils'
import React from 'react'

function Loader({ className } : { className?: string }) {
  return (
    <div className={cn('border-2 rounded-full', className)}></div>
  )
}

export default Loader;