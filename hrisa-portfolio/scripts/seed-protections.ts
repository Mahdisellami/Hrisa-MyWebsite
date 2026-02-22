#!/usr/bin/env tsx

import { db } from '../lib/db/index.js';
import { nanoid } from 'nanoid';

console.log('🌱 Seeding protected resources...\n');

const now = Math.floor(Date.now() / 1000);

// Define all resources to protect
const protectedResources = [
  // Hobby pages
  { type: 'PAGE', id: '/hobbies/photography', role: 'EDITOR' },
  { type: 'PAGE', id: '/hobbies/music', role: 'EDITOR' },
  { type: 'PAGE', id: '/hobbies/theatre', role: 'EDITOR' },
  { type: 'PAGE', id: '/hobbies/art', role: 'EDITOR' },
  { type: 'PAGE', id: '/hobbies/sports', role: 'EDITOR' },

  // Photographer sections
  { type: 'SECTION', id: 'mahdi-sellami', role: 'EDITOR' },
  { type: 'SECTION', id: 'sofiane-affes', role: 'EDITOR' },
  { type: 'SECTION', id: 'tino-von-ohrdruf', role: 'EDITOR' },
  { type: 'SECTION', id: 'linsengericht-foto-stuttgart', role: 'EDITOR' },
  { type: 'SECTION', id: 'up-photography', role: 'EDITOR' },
  { type: 'SECTION', id: 'photoshoot-at', role: 'EDITOR' },
  { type: 'SECTION', id: 'fortiss-gmbh', role: 'EDITOR' },

  // Professional projects
  { type: 'PROJECT', id: 'hrisa-code', role: 'EDITOR' },
  { type: 'PROJECT', id: 'gamza-tounsia', role: 'EDITOR' },
];

async function seedProtections() {
  try {
    let inserted = 0;
    let skipped = 0;

    for (const resource of protectedResources) {
      // Check if already exists
      const existingResult = await db.execute({
        sql: `SELECT * FROM protected_resources
              WHERE resource_type = ? AND resource_id = ?`,
        args: [resource.type, resource.id]
      });

      if (existingResult.rows.length > 0) {
        skipped++;
        continue;
      }

      // Insert new protection
      const resourceId = nanoid();
      await db.execute({
        sql: `INSERT INTO protected_resources (id, resource_type, resource_id, min_role, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [resourceId, resource.type, resource.id, resource.role, now, now]
      });

      inserted++;
      console.log(`✅ Protected: ${resource.type} - ${resource.id}`);
    }

    console.log(`\n📊 Summary:`);
    console.log(`  - Inserted: ${inserted}`);
    console.log(`  - Skipped (already protected): ${skipped}`);
    console.log(`  - Total protected resources: ${inserted + skipped}`);

    console.log('\n✅ Protection seeding complete!');

  } catch (error) {
    console.error('❌ Failed to seed protections:', error);
    process.exit(1);
  }
}

seedProtections();
