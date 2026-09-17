const url = 'https://yulexsxsqumfnvuqtzfi.supabase.co/rest/v1/contact_messages';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGV4c3hzcXVtZm52dXF0emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NTkzODksImV4cCI6MjEwNTIzNTM4OX0.ZVw1FA6K7w6S4dvjI5sDAPQQ1tWGDy1JQuPf2Ho1NN0';

async function testHttpInsertion() {
  console.log('Testing REST insertion to Supabase contact_messages table...');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      name: 'Test Recruiter',
      email: 'recruiter@test.com',
      phone: '+91 9876543210',
      message: 'Hello Harish, we reviewed your portfolio and SAP FI project implementation. We would like to invite you for an interview.',
      status: 'unread'
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('REST Insertion Failed:', response.status, text);
  } else {
    const data = await response.json();
    console.log('🎉 SUCCESS! Test message inserted directly into Supabase contact_messages table:');
    console.log(data);
  }
}

testHttpInsertion();
