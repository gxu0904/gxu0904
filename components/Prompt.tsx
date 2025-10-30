'use client';

import React from 'react';
import { person } from '@/data/person';

interface PromptProps {
  directory?: string;
}

export function Prompt({ directory = '~' }: PromptProps) {
  return (
    <span className="text-green-400 font-mono select-none">
      <span className="text-cyan-400">{person.prompt}</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">{directory}</span>
      <span className="text-white">$ </span>
    </span>
  );
}
