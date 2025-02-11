import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://cciikicxagltholyagoj.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaWlraWN4YWdsdGhvbHlhZ29qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODk5NjY1MywiZXhwIjoyMDU0NTcyNjUzfQ.zVUnnDUDBYk9rym67o7-LiACFGGjh5XYn2pRSkZNIGQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20250210_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log('Menjalankan migrasi...');

    // Execute each statement
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', {
        query: statement + ';'
      });

      if (error) {
        console.error('Error executing statement:', error);
        console.error('Statement:', statement);
        continue;
      }
    }

    console.log('Migrasi berhasil dijalankan!');
  } catch (error) {
    console.error('Error running migration:', error);
  }
}

runMigration();
