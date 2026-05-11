import type { ContactFormPayload, ApiResponse } from '../types';

export async function submitContactForm(
  _payload: ContactFormPayload,
): Promise<ApiResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Message received! We'll be in touch within 24 hours.",
      });
    }, 1500);
  });
}
