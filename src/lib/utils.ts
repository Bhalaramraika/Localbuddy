
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Section 1: Core Utility Functions

/**
 * Delays execution for a specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates a random number within a specified range.
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (exclusive).
 * @returns A random number between min and max.
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a specified length and appends a custom suffix.
 * @param str - The string to truncate.
 * @param length - The maximum length of the string.
 * @param suffix - The suffix to append if truncated. Defaults to '...'.
 * @returns The truncated string.
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (typeof str !== 'string' || str.length <= length) {
    return str;
  }
  return str.slice(0, length) + suffix;
}

/**
 * Checks if a value is null, undefined, an empty object, array, or string.
 * @param value - The value to check.
 * @returns True if the value is empty, false otherwise.
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}

/**
 * Formats a number as a currency string.
 * @param amount - The number to format.
 * @param currency - The currency code (e.g., 'INR', 'USD').
 * @param locale - The locale to use for formatting (e.g., 'en-IN', 'en-US').
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, currency: string = 'INR', locale: string = 'en-IN'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting failed:", error);
    return `${currency} ${amount}`;
  }
}

/**
 * Debounces a function, delaying its execution until after a certain time has passed
 * since the last time it was invoked.
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Throttles a function, ensuring it's executed at most once in a specified time period.
 * @param func - The function to throttle.
 * @param limit - The time limit in milliseconds.
 * @returns A throttled version of the function.
 */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: any;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(this, args);
    }
    return lastResult;
  };
}

/**
 * Generates a more robust unique ID string using crypto if available.
 * @param prefix - An optional prefix for the ID.
 * @returns A unique ID string.
 */
export function uniqueId(prefix: string = 'uid_'): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return `${prefix}${window.crypto.randomUUID()}`;
  }
  return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Groups an array of objects by a specified key.
 * @param array - The array to group.
 * @param key - The key to group by (can be a function).
 * @returns An object with keys corresponding to the grouped values.
 */
export function groupBy<T extends Record<string, any>>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
  return array.reduce((result, currentValue) => {
    const groupKey = typeof key === 'function' ? key(currentValue) : currentValue[key];
    (result[groupKey] = result[groupKey] || []).push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}

// Section 2: Advanced and Specific Utility Functions

/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculates the linear interpolation (lerp) between two numbers.
 * @param start The starting value.
 * @param end The ending value.
 * @param amount The interpolation amount (between 0 and 1).
 * @returns The interpolated value.
 */
export function lerp(start: number, end: number, amount: number): number {
  return (1 - amount) * start + amount * end;
}

/**
* Formats a date object into a readable string like "Dec 4, 2023".
* @param date - The Date object or date string.
* @param locale - The locale for formatting.
* @returns Formatted date string.
*/
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Parses a query string into an object.
 * @param queryString - The query string to parse (e.g., "?foo=bar&baz=qux").
 * @returns An object representation of the query string.
 */
export function parseQueryString(queryString: string): Record<string, string> {
  if (queryString.startsWith('?')) {
    queryString = queryString.substring(1);
  }
  return queryString.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return acc;
  }, {} as Record<string, string>);
}

/**
* Creates a query string from an object.
* @param params - The object to convert to a query string.
* @returns A URL-encoded query string.
*/
export function stringifyQueryParams(params: Record<string, any>): string {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

/**
 * A utility to manage localStorage with type safety.
 */
export const localStorageManager = {
  getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = window.localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (e) {
        console.error(`Error parsing localStorage item "${key}":`, e);
        return null;
      }
    }
    return null;
  },
  setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error(`Error setting localStorage item "${key}":`, e);
    }
  },
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  }
};


/**
 * Calculates the estimated reading time for a piece of text.
 * @param text The text to be read.
 * @param wordsPerMinute The average reading speed (words per minute).
 * @returns The estimated reading time in minutes.
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): number {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Escapes HTML characters in a string to prevent XSS.
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
