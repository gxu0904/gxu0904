'use client';

import React, { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { Prompt } from './Prompt';
import { OutputBlock } from './OutputBlock';
import { WindowFrame } from './WindowFrame';
import { parseCommand, autocomplete } from '@/lib/cli/parser';
import { executeCommand, getAvailableCommands, getProjectSlugs } from '@/lib/cli/router';
import { CommandHistory } from '@/lib/cli/history';
import { CommandOutput } from '@/lib/cli/commands';

interface HistoryEntry {
  command: string;
  output: CommandOutput;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandHistory = useRef<CommandHistory>(new CommandHistory());

  // Auto-focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Auto-focus input after each command execution
  useEffect(() => {
    if (!isProcessing) {
      inputRef.current?.focus();
    }
  }, [isProcessing, history]);

  const handleCommand = async (commandText: string) => {
    if (!commandText.trim()) return;

    // Add to command history
    commandHistory.current.add(commandText);

    // Parse and execute command
    const parsed = parseCommand(commandText);
    setIsProcessing(true);

    // Special handling for clear command
    if (parsed.command === 'clear') {
      setHistory([]);
      setInput('');
      setIsProcessing(false);
      setShowWelcome(false);
      // Focus will be triggered by useEffect
      return;
    }

    const output = await executeCommand(parsed);

    // Add to display history
    setHistory(prev => [...prev, { command: commandText, output }]);
    setInput('');
    setIsProcessing(false);
    setShowWelcome(false);
    // Focus will be triggered by useEffect
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(input);
      return;
    }

    // Handle Tab for autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = autocomplete(input, getAvailableCommands(), getProjectSlugs());
      setInput(completed);
      return;
    }

    // Handle Up Arrow - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = commandHistory.current.getPrevious(input);
      if (prev !== null) {
        setInput(prev);
      }
      return;
    }

    // Handle Down Arrow - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = commandHistory.current.getNext();
      if (next !== null) {
        setInput(next);
      }
      return;
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <WindowFrame>
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="font-mono text-sm cursor-text"
      >
        {/* Welcome Message */}
        {showWelcome && (
          <div className="mb-6">
            <div className="text-cyan-400 text-lg font-bold mb-2">
              Welcome to Grace Xu&apos;s Portfolio
            </div>
            <div className="text-gray-400 mb-4">
              Type &quot;help&quot; to see available commands, or try &quot;about&quot; to learn more about me.
            </div>
            <div className="text-gray-500 text-xs">
              💡 Tip: Use ↑/↓ for command history, Tab for autocomplete
            </div>
            <div className="mt-4 border-t border-gray-700 pt-4" />
          </div>
        )}

        {/* Command History */}
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            {/* Command Input Echo */}
            <div className="flex items-center mb-2">
              <Prompt />
              <span className="text-gray-100">{entry.command}</span>
            </div>

            {/* Command Output */}
            <OutputBlock lines={entry.output.lines} />
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 font-mono caret-green-400"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {/* Blinking Cursor */}
          {!isProcessing && (
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
          )}
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="mt-2 text-gray-500 text-xs">
            Processing...
          </div>
        )}
      </div>
    </WindowFrame>
  );
}
