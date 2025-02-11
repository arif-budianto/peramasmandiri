const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cciikicxagltholyagoj.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaWlraWN4YWdsdGhvbHlhZ29qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODk5NjY1MywiZXhwIjoyMDU0NTcyNjUzfQ.zVUnnDUDBYk9rym67o7-LiACFGGjh5XYn2pRSkZNIGQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@peramasmandiri.com',
      password: 'PeramasMandiri2025!',
      email_confirm: true,
    });

    if (error) throw error;
    console.log('Admin user created successfully:', data);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
}

createAdmin();
