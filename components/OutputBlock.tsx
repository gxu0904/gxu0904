'use client';

import React from 'react';
import { OutputLine } from '@/lib/cli/commands';
import ReactMarkdown from 'react-markdown';

interface OutputBlockProps {
  lines: OutputLine[];
}

export function OutputBlock({ lines }: OutputBlockProps) {
  if (lines.length === 0) return null;

  return (
    <div className="mb-4 font-mono text-sm">
      {lines.map((line, index) => (
        <OutputLineComponent key={index} line={line} />
      ))}
    </div>
  );
}

interface OutputLineComponentProps {
  line: OutputLine;
}

function OutputLineComponent({ line }: OutputLineComponentProps) {
  const baseClasses = 'block';

  let typeClasses = '';
  switch (line.type) {
    case 'error':
      typeClasses = 'text-red-400';
      break;
    case 'success':
      typeClasses = 'text-green-400 font-bold';
      break;
    case 'link':
      typeClasses = 'text-blue-400 hover:text-blue-300 hover:underline cursor-pointer';
      break;
    case 'list':
      typeClasses = 'text-gray-300';
      break;
    case 'markdown':
      return (
        <div className="prose prose-invert prose-sm max-w-none my-4">
          <ReactMarkdown>{line.content}</ReactMarkdown>
        </div>
      );
    default:
      typeClasses = 'text-gray-300';
  }

  const classes = `${baseClasses} ${typeClasses} ${line.className || ''}`;

  if (line.type === 'link') {
    const urlMatch = line.content.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      const url = urlMatch[1];
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {line.content}
        </a>
      );
    }
  }

  return <span className={classes}>{line.content}</span>;
}
