# Internationalization (i18n) Strategy

## Overview
The Hrisa Portfolio website will support 5 languages, reflecting your multicultural background and expanding reach to diverse audiences.

## Supported Languages

### 1. **English (EN)** - Default
- Primary language
- Tech/professional content
- International audience

### 2. **German (DE)** - Deutsch
- For German-speaking clients and employers
- Munich/Berlin connections
- DACH region opportunities

### 3. **French (FR)** - Français
- France, Tunisia, Switzerland connections
- Francophone Africa
- Paris, Marseille, Lausanne

### 4. **Spanish (ES)** - Español
- Spain, Latin America
- San Sebastián, Madrid, Barcelona, Sevilla, Gran Canaria
- Large Spanish-speaking developer community

### 5. **Arabic (AR)** - العربية
- Tunisia, Egypt, Middle East
- Sfax, Tunis, Cairo, Alexandria
- Arabic-speaking tech communities
- **RTL (Right-to-Left) support required**

## Implementation Approach

### Recommended: next-intl
```bash
npm install next-intl
```

**Why next-intl:**
- ✅ Built for Next.js App Router
- ✅ Server Components support
- ✅ Type-safe translations
- ✅ Simple API
- ✅ RTL support
- ✅ SEO-friendly

### Project Structure

```
hrisa-portfolio/
├── messages/              # Translation files
│   ├── en.json           # English (default)
│   ├── de.json           # German
│   ├── fr.json           # French
│   ├── es.json           # Spanish
│   └── ar.json           # Arabic
├── app/
│   └── [locale]/         # Language-specific routes
│       ├── layout.tsx    # Locale-aware layout
│       ├── page.tsx      # Homepage
│       ├── professional/
│       ├── projects/
│       └── ...
├── components/
│   └── LanguageSwitcher.tsx  # Language selector
└── i18n.ts               # i18n configuration
```

### Configuration

**i18n.ts:**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'de', 'fr', 'es', 'ar'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

**middleware.ts:**
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // /en/about, /de/about, etc.
});

export const config = {
  // Match all pathnames except API routes and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**app/[locale]/layout.tsx:**
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Translation File Structure

### messages/en.json (Example)
```json
{
  "Common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "learnMore": "Learn more",
    "viewProject": "View Project",
    "contactMe": "Contact Me"
  },
  "Navigation": {
    "home": "Home",
    "professional": "Professional",
    "projects": "Projects",
    "services": "Services",
    "ventures": "Ventures",
    "about": "About"
  },
  "Hero": {
    "availableForProjects": "Available for Projects",
    "name": "Mahdi Sellami",
    "title": "ML Engineer • Full-Stack Developer • Entrepreneur",
    "description": "Building production AI systems and exploring innovative solutions. Specializing in agentic systems, RAG, MLOps, and full-stack development.",
    "ctaViewWork": "View My Work",
    "ctaLetsTalk": "Let's Talk"
  },
  "FeaturedWork": {
    "heading": "Featured Work",
    "subheading": "Production AI systems and applications",
    "status": {
      "production": "In Production",
      "beta": "Beta",
      "development": "In Development"
    }
  },
  "Services": {
    "heading": "What I Do",
    "subheading": "Expertise Areas",
    "softwareArchitecture": {
      "title": "Software Architecture",
      "description": "Designing scalable, maintainable systems with modern architectural patterns."
    },
    "mlAiEngineering": {
      "title": "ML/AI Engineering",
      "description": "Building production-ready machine learning systems from training to deployment."
    }
    // ... more services
  },
  "Ventures": {
    "heading": "Innovation Lab",
    "subheading": "Ideas I'm Exploring",
    "lookingFor": "Looking for",
    "status": {
      "concept": "Concept",
      "prototyping": "Prototyping",
      "mvp": "MVP",
      "launched": "Launched"
    }
  },
  "Contact": {
    "heading": "Let's Connect",
    "subheading": "Open to freelance projects, collaborations, and new opportunities",
    "form": {
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "submit": "Send Message",
      "success": "Message sent successfully!",
      "error": "Failed to send message. Please try again."
    }
  },
  "About": {
    "heading": "About Me",
    "shortBio": "ML/AI Engineer and Full-Stack Developer specializing in agentic systems, RAG, and MLOps.",
    "availability": {
      "freelance": "Available for freelance",
      "consulting": "Open to consulting",
      "fullTime": "Considering full-time opportunities"
    },
    "citiesLived": "Cities I've Lived In",
    "languages": "Languages",
    "skills": "Skills"
  },
  "Footer": {
    "tagline": "Building the future with AI",
    "copyright": "© {year} Mahdi Sellami. All rights reserved.",
    "madeWith": "Made with",
    "and": "and"
  }
}
```

### messages/de.json (German)
```json
{
  "Common": {
    "loading": "Lädt...",
    "error": "Ein Fehler ist aufgetreten",
    "learnMore": "Mehr erfahren",
    "viewProject": "Projekt ansehen",
    "contactMe": "Kontakt"
  },
  "Navigation": {
    "home": "Startseite",
    "professional": "Beruflich",
    "projects": "Projekte",
    "services": "Leistungen",
    "ventures": "Innovationen",
    "about": "Über mich"
  },
  "Hero": {
    "availableForProjects": "Verfügbar für Projekte",
    "name": "Mahdi Sellami",
    "title": "ML-Ingenieur • Full-Stack-Entwickler • Unternehmer",
    "description": "Entwicklung produktionsreifer KI-Systeme und Erforschung innovativer Lösungen. Spezialisiert auf agentenbasierte Systeme, RAG, MLOps und Full-Stack-Entwicklung.",
    "ctaViewWork": "Meine Arbeit ansehen",
    "ctaLetsTalk": "Lass uns reden"
  }
  // ... rest of translations
}
```

### messages/fr.json (French)
```json
{
  "Common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite",
    "learnMore": "En savoir plus",
    "viewProject": "Voir le projet",
    "contactMe": "Me contacter"
  },
  "Navigation": {
    "home": "Accueil",
    "professional": "Professionnel",
    "projects": "Projets",
    "services": "Services",
    "ventures": "Innovations",
    "about": "À propos"
  },
  "Hero": {
    "availableForProjects": "Disponible pour des projets",
    "name": "Mahdi Sellami",
    "title": "Ingénieur ML • Développeur Full-Stack • Entrepreneur",
    "description": "Développement de systèmes IA en production et exploration de solutions innovantes. Spécialisé en systèmes agentiques, RAG, MLOps et développement full-stack.",
    "ctaViewWork": "Voir mon travail",
    "ctaLetsTalk": "Discutons"
  }
  // ... rest of translations
}
```

### messages/es.json (Spanish)
```json
{
  "Common": {
    "loading": "Cargando...",
    "error": "Ha ocurrido un error",
    "learnMore": "Saber más",
    "viewProject": "Ver proyecto",
    "contactMe": "Contáctame"
  },
  "Navigation": {
    "home": "Inicio",
    "professional": "Profesional",
    "projects": "Proyectos",
    "services": "Servicios",
    "ventures": "Innovaciones",
    "about": "Sobre mí"
  },
  "Hero": {
    "availableForProjects": "Disponible para proyectos",
    "name": "Mahdi Sellami",
    "title": "Ingeniero ML • Desarrollador Full-Stack • Emprendedor",
    "description": "Construyendo sistemas de IA en producción y explorando soluciones innovadoras. Especializado en sistemas agénticos, RAG, MLOps y desarrollo full-stack.",
    "ctaViewWork": "Ver mi trabajo",
    "ctaLetsTalk": "Hablemos"
  }
  // ... rest of translations
}
```

### messages/ar.json (Arabic - RTL)
```json
{
  "Common": {
    "loading": "جاري التحميل...",
    "error": "حدث خطأ",
    "learnMore": "معرفة المزيد",
    "viewProject": "عرض المشروع",
    "contactMe": "اتصل بي"
  },
  "Navigation": {
    "home": "الرئيسية",
    "professional": "المهني",
    "projects": "المشاريع",
    "services": "الخدمات",
    "ventures": "الابتكارات",
    "about": "عني"
  },
  "Hero": {
    "availableForProjects": "متاح للمشاريع",
    "name": "مهدي السلامي",
    "title": "مهندس تعلم آلي • مطور Full-Stack • رائد أعمال",
    "description": "بناء أنظمة ذكاء اصطناعي جاهزة للإنتاج واستكشاف حلول مبتكرة. متخصص في الأنظمة الوكيلة، RAG، MLOps، وتطوير Full-Stack.",
    "ctaViewWork": "عرض أعمالي",
    "ctaLetsTalk": "لنتحدث"
  }
  // ... rest of translations
}
```

## Using Translations in Components

### Server Components
```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');

  return (
    <section>
      <h1>{t('name')}</h1>
      <p>{t('title')}</p>
      <p>{t('description')}</p>
      <button>{t('ctaViewWork')}</button>
    </section>
  );
}
```

### Client Components
```typescript
'use client';

import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('Contact.form');

  return (
    <form>
      <input placeholder={t('name')} />
      <input placeholder={t('email')} />
      <textarea placeholder={t('message')} />
      <button>{t('submit')}</button>
    </form>
  );
}
```

### With Parameters
```typescript
const t = useTranslations('Footer');

<p>{t('copyright', { year: new Date().getFullYear() })}</p>
// Output: © 2024 Mahdi Sellami. All rights reserved.
```

## Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/i18n';

const languageNames: Record<Locale, { native: string; emoji: string }> = {
  en: { native: 'English', emoji: '🇬🇧' },
  de: { native: 'Deutsch', emoji: '🇩🇪' },
  fr: { native: 'Français', emoji: '🇫🇷' },
  es: { native: 'Español', emoji: '🇪🇸' },
  ar: { native: 'العربية', emoji: '🇹🇳' }, // Using Tunisia flag
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: Locale) => {
    // Replace locale in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative group">
      {/* Current Language */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sand-100 hover:bg-sand-200">
        <span>{languageNames[locale as Locale].emoji}</span>
        <span>{languageNames[locale as Locale].native}</span>
        <svg className="w-4 h-4" /* dropdown icon */ />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLanguage(loc)}
            className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-sand-50 first:rounded-t-lg last:rounded-b-lg ${
              loc === locale ? 'bg-sand-100 font-semibold' : ''
            }`}
          >
            <span className="text-xl">{languageNames[loc].emoji}</span>
            <span>{languageNames[loc].native}</span>
            {loc === locale && <span className="ml-auto text-brand-500">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## RTL (Right-to-Left) Support for Arabic

### CSS Adjustments
```css
/* globals.css */
[dir='rtl'] {
  direction: rtl;
}

/* Flip margins and paddings */
[dir='rtl'] .ml-4 { margin-right: 1rem; margin-left: 0; }
[dir='rtl'] .mr-4 { margin-left: 1rem; margin-right: 0; }
[dir='rtl'] .pl-4 { padding-right: 1rem; padding-left: 0; }
[dir='rtl'] .pr-4 { padding-left: 1rem; padding-right: 0; }

/* Flip flexbox */
[dir='rtl'] .flex { flex-direction: row-reverse; }

/* Text alignment */
[dir='rtl'] .text-left { text-align: right; }
[dir='rtl'] .text-right { text-align: left; }

/* Or use Tailwind's RTL plugin */
```

### Tailwind RTL Plugin
```bash
npm install tailwindcss-rtl
```

```typescript
// tailwind.config.ts
import rtl from 'tailwindcss-rtl';

export default {
  plugins: [rtl],
};
```

Then use RTL-aware classes:
```tsx
<div className="ms-4"> {/* margin-start (left in LTR, right in RTL) */}
<div className="me-4"> {/* margin-end (right in LTR, left in RTL) */}
<div className="ps-4"> {/* padding-start */}
<div className="pe-4"> {/* padding-end */}
```

## SEO for Multilingual Sites

### Metadata per Language
```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({ params: { locale } }: Props) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    title: messages.Meta.title,
    description: messages.Meta.description,
    alternates: {
      canonical: `https://hrisa.com/${locale}`,
      languages: {
        'en': 'https://hrisa.com/en',
        'de': 'https://hrisa.com/de',
        'fr': 'https://hrisa.com/fr',
        'es': 'https://hrisa.com/es',
        'ar': 'https://hrisa.com/ar',
      },
    },
    openGraph: {
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
  };
}
```

### Hreflang Tags (Automatic with next-intl)
```html
<link rel="alternate" hreflang="en" href="https://hrisa.com/en" />
<link rel="alternate" hreflang="de" href="https://hrisa.com/de" />
<link rel="alternate" hreflang="fr" href="https://hrisa.com/fr" />
<link rel="alternate" hreflang="es" href="https://hrisa.com/es" />
<link rel="alternate" hreflang="ar" href="https://hrisa.com/ar" />
<link rel="alternate" hreflang="x-default" href="https://hrisa.com/en" />
```

## Content Translation Strategy

### Static Content
- UI text: Translate all in JSON files
- Navigation, buttons, labels: Full translation

### Dynamic Content (Projects, Services, etc.)
**Option 1: Translate All (Recommended)**
```typescript
// data/professional.ts
export const professionalProjects = {
  en: [{ id: 'arki', title: 'ArKI', description: '...' }],
  de: [{ id: 'arki', title: 'ArKI', description: '...' }],
  fr: [{ id: 'arki', title: 'ArKI', description: '...' }],
  es: [{ id: 'arki', title: 'ArKI', description: '...' }],
  ar: [{ id: 'arki', title: 'آركي', description: '...' }],
};
```

**Option 2: English Only with Note**
- Keep project descriptions in English
- Add note: "Technical content available in English"
- Translate UI around it

**Hybrid Approach (Best):**
- Translate titles, taglines, highlights
- Keep detailed technical descriptions in English
- Add "Read more in English" for non-EN locales

### Translation Workflow
1. **Manual translation** (you or professional translator)
2. **AI-assisted** (DeepL API, GPT-4 for initial draft, then review)
3. **Community contributions** (GitHub PRs for translations)

## URL Structure

### With Locale Prefix
```
https://hrisa.com/en/professional
https://hrisa.com/de/professional
https://hrisa.com/fr/professional
https://hrisa.com/es/professional
https://hrisa.com/ar/professional
```

### Root Redirect
- Detect browser language
- Redirect to appropriate locale
- Cookie remembers choice

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path - redirect based on Accept-Language
  if (pathname === '/') {
    const locale = request.headers
      .get('accept-language')
      ?.split(',')[0]
      ?.split('-')[0];

    const supportedLocale = locales.includes(locale as Locale)
      ? locale
      : defaultLocale;

    return NextResponse.redirect(
      new URL(`/${supportedLocale}`, request.url)
    );
  }
}
```

## Testing Multilingual Features

### Unit Tests
```typescript
// components/Hero.test.tsx
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import deMessages from '@/messages/de.json';

describe('Hero Component', () => {
  it('renders in English', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Hero />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Mahdi Sellami')).toBeInTheDocument();
  });

  it('renders in German', () => {
    render(
      <NextIntlClientProvider locale="de" messages={deMessages}>
        <Hero />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Meine Arbeit ansehen')).toBeInTheDocument();
  });
});
```

### E2E Tests
```typescript
// e2e/i18n.spec.ts
test('can switch languages', async ({ page }) => {
  await page.goto('/en');
  expect(await page.textContent('h1')).toBe('Mahdi Sellami');

  // Switch to German
  await page.click('[data-testid="language-switcher"]');
  await page.click('text=Deutsch');

  await expect(page).toHaveURL('/de');
  expect(await page.textContent('h1')).toBe('Mahdi Sellami');
});

test('Arabic renders RTL', async ({ page }) => {
  await page.goto('/ar');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('dir', 'rtl');
});
```

## Performance Considerations

### Bundle Size
- Only load current locale's messages
- Don't bundle all locales at once
- Use dynamic imports

### Caching
- Cache translation files
- Use ISR for translated pages
- CDN for static translated content

## Implementation Phases

### Phase 1: Setup (1-2 days)
- [ ] Install next-intl
- [ ] Configure middleware
- [ ] Set up [locale] routing
- [ ] Create base translation files
- [ ] Build Language Switcher

### Phase 2: Translate UI (2-3 days)
- [ ] Translate all static UI text (en.json as base)
- [ ] Translate to German
- [ ] Translate to French
- [ ] Translate to Spanish
- [ ] Translate to Arabic
- [ ] Test all locales

### Phase 3: Content Translation (3-4 days)
- [ ] Translate project titles and taglines
- [ ] Translate service descriptions
- [ ] Translate venture descriptions
- [ ] Translate about/bio section
- [ ] Review and refine translations

### Phase 4: RTL & Polish (1-2 days)
- [ ] Implement RTL support for Arabic
- [ ] Test Arabic layout
- [ ] Fix RTL-specific issues
- [ ] Add language-specific fonts if needed

### Phase 5: SEO & Testing (1 day)
- [ ] Add hreflang tags
- [ ] Test SEO for all locales
- [ ] E2E tests for language switching
- [ ] Performance testing

## Translation Help Resources

### Professional Services
- **DeepL Pro**: Best machine translation
- **Unbabel**: Professional human translation
- **Lokalise**: Translation management platform

### Community
- GitHub issues for translation fixes
- Contributors can submit PRs for translations

### You
- You speak EN, DE, FR, ES, AR natively/fluently
- You can review and refine machine translations
- Authentic voice in all languages

## Maintenance

### Adding New Content
1. Add to en.json first
2. Translate to other languages
3. Mark untranslated with flag: `"_needsTranslation": true`
4. Fallback to English if translation missing

### Keeping Translations in Sync
```typescript
// scripts/check-translations.ts
// Script to find missing translation keys
const enKeys = Object.keys(enMessages);
const deKeys = Object.keys(deMessages);
const missing = enKeys.filter(k => !deKeys.includes(k));
console.log('Missing in German:', missing);
```

## Next Steps

1. **Decision**: Implement now or later?
   - Now: More work upfront, better user experience
   - Later: Ship MVP faster, add i18n in v2

2. **Translation Strategy**:
   - You translate personally (authentic, time-consuming)
   - Use AI + review (faster, needs checking)
   - Mix: You do key content, AI for UI text

3. **Content Scope**:
   - Full translation: Everything
   - Hybrid: UI fully translated, technical content in English
   - English-first: Just English, add languages later

**Recommendation**:
- Start with English MVP
- Add German next (Munich/Berlin focus)
- Add other languages iteratively
- This allows faster launch while keeping multilingual vision

What do you think?
