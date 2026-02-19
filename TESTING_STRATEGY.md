# Comprehensive Testing Strategy

## Overview
This document outlines the testing strategy for the Hrisa Portfolio website, covering unit tests, integration tests, regression tests, smoke tests, end-to-end tests, UI tests, and manual testing procedures.

## Testing Philosophy

**Goals:**
- Ensure reliability and correctness
- Catch bugs early in development
- Enable confident refactoring
- Maintain code quality
- Fast feedback loops

**Principles:**
- Test behavior, not implementation
- Write tests that provide value
- Keep tests simple and maintainable
- Automate what can be automated
- Prioritize critical paths

## Testing Pyramid

```
       /\
      /  \     E2E Tests (10%)
     /────\    Fewer, slower, expensive
    /      \
   /────────\  Integration Tests (20%)
  /          \
 /────────────\ Unit Tests (70%)
/              \ Many, fast, cheap
────────────────
```

## 1. Unit Tests

### Scope
Test individual functions, components, and modules in isolation.

### Tools
```json
{
  "framework": "Jest",
  "react-testing": "@testing-library/react",
  "utilities": "@testing-library/jest-dom, @testing-library/user-event"
}
```

### What to Test

**Utility Functions (lib/):**
```typescript
// lib/utils.test.ts
describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });

  it('handles invalid dates', () => {
    expect(formatDate('invalid')).toBe('Invalid date');
  });
});

describe('truncateText', () => {
  it('truncates long text', () => {
    const long = 'This is a very long text...';
    expect(truncateText(long, 10)).toBe('This is a...');
  });

  it('returns short text unchanged', () => {
    const short = 'Short';
    expect(truncateText(short, 10)).toBe('Short');
  });
});
```

**Data Helpers (data/):**
```typescript
// data/professional.test.ts
import { getFeaturedProjects, getProjectById } from './professional';

describe('Project Data Helpers', () => {
  it('returns only featured projects', () => {
    const featured = getFeaturedProjects();
    expect(featured.every(p => p.featured)).toBe(true);
  });

  it('finds project by id', () => {
    const arki = getProjectById('arki');
    expect(arki?.title).toBe('ArKI');
  });

  it('returns undefined for non-existent id', () => {
    expect(getProjectById('fake')).toBeUndefined();
  });
});
```

**React Components:**
```typescript
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```

**Card Components:**
```typescript
// components/cards/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

const mockProject = {
  id: 'test',
  title: 'Test Project',
  description: 'Test description',
  technologies: ['React', 'TypeScript'],
  imageUrl: '/test.jpg',
  status: 'production',
};

describe('ProjectCard', () => {
  it('displays project information', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders technology badges', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('shows production status badge', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/production/i)).toBeInTheDocument();
  });
});
```

### Coverage Goals
- **Target**: 80% code coverage
- **Critical paths**: 100% coverage
- **UI components**: 70% coverage minimum

### Running Unit Tests
```bash
# Run all unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Run specific test file
npm run test ProjectCard.test.tsx
```

---

## 2. Integration Tests

### Scope
Test how multiple units work together (component + data, API routes, page rendering).

### Tools
```json
{
  "framework": "Jest",
  "api-testing": "supertest",
  "database": "@testcontainers/postgresql (for DB tests)"
}
```

### What to Test

**Page Components with Data:**
```typescript
// app/projects/page.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';
import { professionalProjects } from '@/data/professional';

describe('Projects Page', () => {
  it('renders all projects', () => {
    render(<ProjectsPage />);
    professionalProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters projects by technology', async () => {
    render(<ProjectsPage />);
    const filterButton = screen.getByText('Python');
    fireEvent.click(filterButton);
    // Verify only Python projects are shown
  });
});
```

**API Routes (when added):**
```typescript
// app/api/contact/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('Contact API', () => {
  it('validates required fields', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }), // missing name
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('name');
  });

  it('sends email on valid submission', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    // Verify email was sent (mock email service)
  });
});
```

**Form Submissions:**
```typescript
// components/forms/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm Integration', () => {
  it('submits form and shows success message', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });
});
```

### Running Integration Tests
```bash
# Run integration tests
npm run test:integration

# Run with database containers
npm run test:integration:db
```

---

## 3. End-to-End (E2E) Tests

### Scope
Test complete user workflows from browser perspective.

### Tools
```json
{
  "framework": "Playwright",
  "alternatives": "Cypress"
}
```

### Setup
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Chrome', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'Safari', use: { browserName: 'webkit' } },
  ],
});
```

### What to Test

**User Journeys:**
```typescript
// e2e/visitor-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visitor Journey', () => {
  test('can navigate from landing to project detail', async ({ page }) => {
    // Go to homepage
    await page.goto('/');

    // Verify hero section
    await expect(page.getByText('Mahdi Sellami')).toBeVisible();
    await expect(page.getByText(/Available for Projects/i)).toBeVisible();

    // Click "View My Work"
    await page.getByRole('link', { name: /view my work/i }).click();

    // Verify projects section
    await expect(page).toHaveURL(/#featured-work/);

    // Click on a project
    await page.getByText('ArKI').click();

    // Verify project detail page
    await expect(page).toHaveURL(/\/professional\/arki/);
    await expect(page.getByRole('heading', { name: 'ArKI' })).toBeVisible();
  });

  test('can submit contact form', async ({ page }) => {
    await page.goto('/');

    // Click "Let's Talk"
    await page.getByRole('link', { name: /let's talk/i }).click();

    // Fill form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="message"]', 'I would like to collaborate');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.getByText(/message sent/i)).toBeVisible();
  });
});
```

**Admin Workflows:**
```typescript
// e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    await page.fill('[name="email"]', 'admin@hrisa.com');
    await page.fill('[name="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('can view and respond to inquiries', async ({ page }) => {
    await page.goto('/admin/inquiries');

    // Click on first inquiry
    await page.click('[data-testid="inquiry-row"]:first-child');

    // Verify inquiry details
    await expect(page.getByText(/Inquiry Details/i)).toBeVisible();

    // Mark as read
    await page.click('button:has-text("Mark as Read")');
    await expect(page.getByText(/Marked as read/i)).toBeVisible();
  });

  test('can edit project content', async ({ page }) => {
    await page.goto('/admin/content/projects');

    // Click edit on ArKI project
    await page.click('[data-project-id="arki"] button:has-text("Edit")');

    // Modify description
    await page.fill('[name="description"]', 'Updated description');

    // Save
    await page.click('button:has-text("Save")');
    await expect(page.getByText(/Changes saved/i)).toBeVisible();
  });
});
```

### Running E2E Tests
```bash
# Run all E2E tests
npx playwright test

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test e2e/visitor-journey.spec.ts

# Debug mode
npx playwright test --debug
```

---

## 4. Smoke Tests

### Scope
Quick tests to verify critical functionality after deployment.

### What to Test
```typescript
// e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Mahdi Sellami')).toBeVisible();
  });

  test('all navigation links work', async ({ page }) => {
    await page.goto('/');

    const links = [
      { href: '/professional', text: 'Professional' },
      { href: '/projects', text: 'Projects' },
      { href: '/services', text: 'Services' },
      { href: '/ventures', text: 'Ventures' },
      { href: '/about', text: 'About' },
    ];

    for (const link of links) {
      await page.goto('/');
      await page.click(`a[href="${link.href}"]`);
      await expect(page).toHaveURL(new RegExp(link.href));
    }
  });

  test('contact form renders', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Let\'s Talk")');
    await expect(page.getByRole('form')).toBeVisible();
  });

  test('images load', async ({ page }) => {
    await page.goto('/professional');
    const images = page.locator('img[alt*="project"]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    // Verify first image loaded
    const firstImg = images.first();
    await expect(firstImg).toBeVisible();
  });
});
```

### Running Smoke Tests
```bash
# Run smoke tests only
npx playwright test e2e/smoke.spec.ts

# After deployment
npm run test:smoke:production
```

---

## 5. Regression Tests

### Scope
Ensure existing functionality doesn't break when adding new features.

### Strategy
1. **Test Suite as Regression Suite**
   - All unit, integration, and E2E tests serve as regression tests
   - Run full suite before releases

2. **Visual Regression Testing**
   ```typescript
   // e2e/visual-regression.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('Visual Regression', () => {
     test('homepage matches snapshot', async ({ page }) => {
       await page.goto('/');
       await expect(page).toHaveScreenshot('homepage.png', {
         fullPage: true,
         maxDiffPixels: 100,
       });
     });

     test('project card matches snapshot', async ({ page }) => {
       await page.goto('/professional');
       const card = page.locator('[data-testid="project-card"]').first();
       await expect(card).toHaveScreenshot('project-card.png');
     });
   });
   ```

3. **Critical Path Tests**
   ```typescript
   // Mark critical tests that must always pass
   test('critical: user can submit freelance inquiry', async ({ page }) => {
     // Test implementation
   });
   ```

### Running Regression Tests
```bash
# Full regression suite
npm run test:regression

# Update visual snapshots
npx playwright test --update-snapshots
```

---

## 6. UI/Component Tests

### Scope
Test visual appearance, accessibility, and interactions.

### Tools
```json
{
  "storybook": "@storybook/react",
  "accessibility": "@storybook/addon-a11y",
  "interactions": "@storybook/addon-interactions"
}
```

### Storybook Setup
```typescript
// .storybook/main.ts
export default {
  stories: ['../components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
};
```

### Component Stories
```typescript
// components/cards/ProjectCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: {
      id: 'arki',
      title: 'ArKI',
      description: 'ML pipeline for document classification',
      technologies: ['Python', 'PyTorch', 'FastAPI'],
      imageUrl: '/images/projects/arki.jpg',
      status: 'production',
      featured: true,
    },
  },
};

export const Development: Story = {
  args: {
    project: {
      ...Default.args.project,
      status: 'development',
    },
  },
};

export const LongDescription: Story = {
  args: {
    project: {
      ...Default.args.project,
      description: 'This is a very long description that should be truncated...',
    },
  },
};
```

### Accessibility Tests
```typescript
// All stories automatically tested for a11y with addon-a11y
// Additional manual checks:
test.describe('Accessibility', () => {
  test('button has accessible name', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: /view my work/i });
    await expect(button).toBeVisible();
  });

  test('form has proper labels', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.getByLabelText(/name/i);
    await expect(nameInput).toBeVisible();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/professional');
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
```

### Running UI Tests
```bash
# Start Storybook
npm run storybook

# Run Storybook tests
npm run test:storybook

# Chromatic visual testing (if using)
npx chromatic --project-token=<token>
```

---

## 7. Manual Testing

### Testing Checklist

#### **Pre-Deployment Checklist**
- [ ] All automated tests pass
- [ ] Visual inspection in Chrome, Firefox, Safari
- [ ] Mobile responsive on multiple devices (iPhone, Android, iPad)
- [ ] Forms work correctly
- [ ] Email notifications arrive
- [ ] Images load properly
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] SEO meta tags present
- [ ] Performance (Lighthouse score > 90)
- [ ] Accessibility (WAVE, axe DevTools)

#### **Feature Testing Template**
```markdown
## Feature: [Name]

**Tested by:** [Name]
**Date:** [Date]
**Browser:** [Chrome/Firefox/Safari]
**Device:** [Desktop/Mobile/Tablet]

### Test Cases

1. **[Test Case Name]**
   - Steps:
     1. [Step 1]
     2. [Step 2]
   - Expected: [What should happen]
   - Actual: [What happened]
   - Status: ✅ Pass / ❌ Fail
   - Notes: [Any observations]

### Bugs Found
- [Bug 1 description]
- [Bug 2 description]

### Screenshots
[Attach screenshots if needed]
```

#### **Browser Compatibility Testing**
Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

#### **Device Testing**
Test on:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Laptop (1440x900)
- ✅ Tablet (iPad, 768x1024)
- ✅ Mobile (iPhone, 375x667)
- ✅ Large Mobile (414x896)

#### **Accessibility Manual Testing**
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader friendly (NVDA, JAWS, VoiceOver)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] ARIA labels where needed
- [ ] No keyboard traps

#### **Performance Testing**
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized
- [ ] No render-blocking resources

---

## Test Automation in CI/CD

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-screenshots
          path: test-results/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/professional
            http://localhost:3000/ventures
          uploadArtifacts: true
```

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:changed",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Test Data Management

### Test Fixtures
```typescript
// test/fixtures/projects.ts
export const mockProjects = {
  arki: {
    id: 'arki',
    title: 'ArKI',
    // ...complete project data
  },
  // more fixtures
};

// test/fixtures/users.ts
export const mockUsers = {
  admin: {
    email: 'admin@test.com',
    password: 'test-password',
    role: 'admin',
  },
};
```

### Factory Functions
```typescript
// test/factories/project.factory.ts
export function createProject(overrides = {}) {
  return {
    id: 'test-project',
    title: 'Test Project',
    description: 'Test description',
    technologies: ['React', 'TypeScript'],
    imageUrl: '/test.jpg',
    status: 'production',
    featured: false,
    ...overrides,
  };
}
```

---

## Monitoring & Observability in Production

### Error Tracking
```typescript
// Sentry setup
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### Real User Monitoring
- Use Vercel Analytics
- Track key metrics (FCP, LCP, CLS, FID)
- Monitor API response times
- Track form submission success rates

### Logs
- Structured logging with Winston/Pino
- Log levels: error, warn, info, debug
- Send to centralized logging (e.g., LogRocket, DataDog)

---

## Testing Schedule

### During Development
- Unit tests: Run on save (watch mode)
- Linting: Pre-commit hook
- Integration tests: Before PR
- E2E tests: Before PR (subset)

### Before Deployment
- Full test suite
- Smoke tests
- Visual regression tests
- Manual testing checklist
- Performance audit

### After Deployment
- Smoke tests on production
- Monitor error rates
- Check analytics

### Regular Schedule
- Weekly: Full regression suite
- Monthly: Comprehensive manual testing
- Quarterly: Accessibility audit
- Annually: Security audit

---

## Testing Metrics & Goals

### Code Coverage
- **Overall**: 80%
- **Critical paths**: 100%
- **Utilities**: 90%
- **Components**: 70%
- **Pages**: 60%

### Test Execution Time
- Unit tests: < 30s
- Integration tests: < 2 min
- E2E tests: < 10 min
- Full suite: < 15 min

### Quality Metrics
- Zero critical bugs in production
- < 1% error rate
- Lighthouse score > 90
- Accessibility score > 95

---

## Getting Started with Testing

### Installation
```bash
# Install testing dependencies
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @playwright/test \
  @storybook/react

# Initialize Playwright
npx playwright install
```

### Configuration Files
1. `jest.config.js` - Jest configuration
2. `playwright.config.ts` - Playwright configuration
3. `.storybook/` - Storybook configuration
4. `setupTests.ts` - Test setup and global mocks

### Running Tests
```json
// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testMatch='**/*.integration.test.{ts,tsx}'",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:smoke": "playwright test e2e/smoke.spec.ts",
    "test:regression": "npm run test && npm run test:e2e",
    "storybook": "storybook dev -p 6006",
    "test:storybook": "test-storybook"
  }
}
```

---

## Conclusion

This comprehensive testing strategy ensures:
- ✅ Reliability through multiple layers of testing
- ✅ Fast feedback during development
- ✅ Confidence in deployments
- ✅ High code quality
- ✅ Great user experience
- ✅ Accessibility compliance
- ✅ Performance standards

Testing is not optional—it's an investment in quality and maintainability. Start with unit tests, add integration tests as you build features, and implement E2E tests for critical workflows. Automate as much as possible, but don't skip manual testing for nuanced issues.
