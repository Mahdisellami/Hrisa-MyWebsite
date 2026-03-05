import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { getAllProtectedResources } from '@/lib/auth/permissions';

/**
 * GET /api/admin/resources
 * Get all available protected resources (for admin UI)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get all protected resources
    const resources = await getAllProtectedResources();

    // Format for frontend
    const formattedResources = resources.map((resource) => ({
      id: resource.resource_id,
      type: resource.resource_type,
      displayName: formatResourceName(resource.resource_id, resource.resource_type),
      minRole: resource.min_role,
    }));

    return NextResponse.json({
      resources: formattedResources,
    });

  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Format resource ID into a display name
 */
function formatResourceName(resourceId: string, resourceType: string): string {
  // Convert kebab-case to Title Case
  const formatted = resourceId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Add type suffix for clarity
  switch (resourceType) {
    case 'SECTION':
      return `${formatted} (Photography)`;
    case 'PAGE':
      return `${formatted} (Page)`;
    case 'PROJECT':
      return `${formatted} (Project)`;
    default:
      return formatted;
  }
}
