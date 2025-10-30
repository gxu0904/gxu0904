/**
 * Command History Manager
 *
 * Manages command history with arrow key navigation
 * Persists history to localStorage
 */

export class CommandHistory {
  private history: string[] = [];
  private currentIndex: number = -1;
  private tempInput: string = '';
  private maxSize: number = 100;
  private storageKey: string = 'terminal-history';

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  /**
   * Add a command to history
   */
  add(command: string): void {
    if (!command.trim()) return;

    // Don't add duplicate of last command
    if (this.history.length > 0 && this.history[this.history.length - 1] === command) {
      this.reset();
      return;
    }

    this.history.push(command);

    // Limit history size
    if (this.history.length > this.maxSize) {
      this.history.shift();
    }

    this.reset();
    this.saveToStorage();
  }

  /**
   * Get previous command in history
   */
  getPrevious(currentInput: string): string | null {
    // Save current input when starting to navigate
    if (this.currentIndex === -1) {
      this.tempInput = currentInput;
    }

    if (this.history.length === 0) return null;

    // Move up in history
    if (this.currentIndex === -1) {
      this.currentIndex = this.history.length - 1;
    } else if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    return this.history[this.currentIndex];
  }

  /**
   * Get next command in history
   */
  getNext(): string | null {
    if (this.currentIndex === -1) return null;

    // Move down in history
    this.currentIndex++;

    // If we've reached the end, return temp input
    if (this.currentIndex >= this.history.length) {
      this.reset();
      return this.tempInput;
    }

    return this.history[this.currentIndex];
  }

  /**
   * Reset navigation state
   */
  reset(): void {
    this.currentIndex = -1;
    this.tempInput = '';
  }

  /**
   * Get all history
   */
  getAll(): string[] {
    return [...this.history];
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.history = [];
    this.reset();
    this.saveToStorage();
  }

  /**
   * Load history from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.history = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load command history:', error);
    }
  }

  /**
   * Save history to localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save command history:', error);
    }
  }
}
