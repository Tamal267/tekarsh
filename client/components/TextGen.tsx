'use client'

import { TextGenerateEffect } from './ui/text-generate-effect'

export function TextGen({ words }: { words: string }) {
  return (
    <TextGenerateEffect
      duration={0.15}
      filter={false}
      words={words}
      className="text-sm"
    />
  )
}
