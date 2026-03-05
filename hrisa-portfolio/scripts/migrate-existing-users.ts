#!/usr/bin/env tsx

/**
 * Migration script to grant existing APPROVED users access to all sections
 * Run this once after migrating the database schema
 */

import { db } from '../lib/db/index.js';
import { nanoid } from 'nanoid';

async function migrateExistingUsers() {
  console.log('👥 Migrating existing users to section-based permissions...\n');

  try {
    // Get all APPROVED users
    const usersResult = await db.execute({
      sql: 'SELECT id, email, name FROM users WHERE status = ?',
      args: ['APPROVED']
    });

    const users = usersResult.rows as Array<{ id: string; email: string; name: string | null }>;

    if (users.length === 0) {
      console.log('⏭️  No approved users found to migrate');
      return;
    }

    console.log(`Found ${users.length} approved user(s)\n`);

    // Get all SECTION-type protected resources
    const resourcesResult = await db.execute({
      sql: 'SELECT resource_id FROM protected_resources WHERE resource_type = ?',
      args: ['SECTION']
    });

    const sections = resourcesResult.rows as Array<{ resource_id: string }>;

    if (sections.length === 0) {
      console.log('⏭️  No protected sections found');
      return;
    }

    console.log(`Found ${sections.length} protected section(s)\n`);

    // Get the first ADMIN user to use as granted_by
    const adminResult = await db.execute({
      sql: 'SELECT id FROM users WHERE role = ? LIMIT 1',
      args: ['ADMIN']
    });

    const admin = adminResult.rows[0] as { id: string } | undefined;

    if (!admin) {
      console.error('❌ No ADMIN user found. Please create an admin user first.');
      process.exit(1);
    }

    const now = Math.floor(Date.now() / 1000);
    let totalPermissions = 0;

    // Grant each user access to all sections
    for (const user of users) {
      console.log(`📝 Processing user: ${user.email}`);

      for (const section of sections) {
        // Check if permission already exists
        const existingResult = await db.execute({
          sql: `SELECT id FROM user_resource_permissions
                WHERE user_id = ? AND resource_type = 'SECTION' AND resource_id = ?`,
          args: [user.id, section.resource_id]
        });

        if (existingResult.rows.length === 0) {
          // Create permission
          await db.execute({
            sql: `INSERT INTO user_resource_permissions
                  (id, user_id, resource_type, resource_id, granted_by, granted_at, expires_at, created_at)
                  VALUES (?, ?, 'SECTION', ?, ?, ?, NULL, ?)`,
            args: [nanoid(), user.id, section.resource_id, admin.id, now, now]
          });
          totalPermissions++;
        }
      }

      console.log(`   ✅ Granted access to ${sections.length} section(s)`);
    }

    console.log(`\n✅ Migration completed!`);
    console.log(`   Total users migrated: ${users.length}`);
    console.log(`   Total permissions created: ${totalPermissions}`);
    console.log('\n📝 All existing approved users now have access to all sections');
    console.log('   New users will need explicit section approval from admin\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrateExistingUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
