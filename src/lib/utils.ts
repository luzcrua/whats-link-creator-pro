
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Properly encodes messages for WhatsApp URLs, ensuring emoji compatibility
 * across platforms (mobile and desktop)
 */
export function encodeMessageForWhatsApp(message: string): string {
  // First normalize to NFC form to ensure consistent emoji representation
  const normalizedMessage = message.normalize('NFC');
  
  // For better cross-platform compatibility, especially desktop browsers
  return encodeURIComponent(normalizedMessage);
}
