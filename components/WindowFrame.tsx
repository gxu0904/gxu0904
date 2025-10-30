'use client';

import React from 'react';

interface WindowFrameProps {
  children: React.ReactNode;
}

export function WindowFrame({ children }: WindowFrameProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Terminal Window */}
      <div className="bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 overflow-hidden">
        {/* Title Bar */}
        <div className="bg-gray-800/90 dark:bg-gray-900/90 px-4 py-3 flex items-center gap-2 border-b border-gray-700/50">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-mono">grace@portfolio ~ terminal</span>
          </div>

          {/* Spacer for centering */}
          <div className="w-[52px]" />
        </div>

        {/* Terminal Content */}
        <div className="p-6 min-h-[600px] max-h-[80vh] overflow-y-auto focus-within:ring-2 focus-within:ring-cyan-500/50 transition-shadow">
          {children}
        </div>
      </div>
    </div>
  );
}
