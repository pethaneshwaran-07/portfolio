'use server';

import { supabase } from '@/lib/supabase';

export async function submitContactMessage(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { name, email, phone, message } = formData;

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields (Name, Email, Message).' };
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          message: message.trim(),
          status: 'unread',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Insertion Error:', error);
      return { success: false, error: error.message || 'Failed to send message.' };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected Server Error:', err);
    return { success: false, error: err?.message || 'An unexpected error occurred.' };
  }
}
