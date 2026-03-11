# Content Addition Checklist

## 📸 Images Needed

### Priority 1: Essential (Do First)

#### Professional Photo
- [ ] **Your headshot/professional photo**
  - Location: `janette-portfolio/public/images/mahdi-profile.jpg`
  - Recommended size: 800x800px or larger (square)
  - Format: JPG or PNG
  - Purpose: About page, possibly header

#### Project Screenshots (4 projects)
- [ ] **ArKI Screenshot**
  - Location: `janette-portfolio/public/images/projects/arki.jpg`
  - Recommended size: 1200x800px (landscape)
  - Shows: Dashboard, ML pipeline, or key interface

- [ ] **KI-BAS Screenshot**
  - Location: `janette-portfolio/public/images/projects/ki-bas.jpg`
  - Recommended size: 1200x800px
  - Shows: Chat interface, document upload, or RAG in action

- [ ] **FinComp Screenshot**
  - Location: `janette-portfolio/public/images/projects/fincomp.jpg`
  - Recommended size: 1200x800px
  - Shows: Knowledge graph, SPARQL interface, or ontology visualization

- [ ] **agent-chat-ui Screenshot**
  - Location: `janette-portfolio/public/images/projects/agent-chat-ui.jpg`
  - Recommended size: 1200x800px
  - Shows: Chat interface, LangGraph integration

### Priority 2: Important

#### CV/Resume
- [ ] **Your CV as PDF**
  - Location: `janette-portfolio/public/docs/Mahdi_Sellami_CV.pdf`
  - Format: PDF
  - Should be up-to-date with recent projects

#### Favicon
- [ ] **Site favicon (optional but nice)**
  - Location: `janette-portfolio/public/favicon.ico`
  - Size: 32x32px or 64x64px
  - Can use "H" or "MS" logo with Harissa colors

### Priority 3: Hobbies (For Hobby Pages)

#### Photography
- [ ] **10-20 of your best photos**
  - Location: `janette-portfolio/public/images/photography/`
  - Names: `photo-01.jpg`, `photo-02.jpg`, etc.
  - Variety: portraits, landscapes, events, etc.

#### Music
- [ ] **Photos of you performing/with instruments**
  - Location: `janette-portfolio/public/images/music/`
  - Could include: performance shots, instrument close-ups

#### Theatre
- [ ] **Performance photos**
  - Location: `janette-portfolio/public/images/theatre/`
  - Could include: stage photos, backstage, posters

#### Art (Drawing/Painting)
- [ ] **Photos of your artwork**
  - Location: `janette-portfolio/public/images/art/`
  - High-quality photos of drawings/paintings

#### Sports/Dance
- [ ] **Action shots or team photos**
  - Location: `janette-portfolio/public/images/sports/`

---

## 📁 Folder Structure

```
janette-portfolio/public/
├── images/
│   ├── mahdi-profile.jpg          ← Your photo
│   ├── projects/
│   │   ├── arki.jpg               ← Project screenshots
│   │   ├── ki-bas.jpg
│   │   ├── fincomp.jpg
│   │   └── agent-chat-ui.jpg
│   ├── photography/               ← Your photos
│   │   ├── photo-01.jpg
│   │   ├── photo-02.jpg
│   │   └── ...
│   ├── music/
│   │   └── ...
│   ├── theatre/
│   │   └── ...
│   ├── art/
│   │   └── ...
│   └── sports/
│       └── ...
├── docs/
│   └── Mahdi_Sellami_CV.pdf       ← Your CV
└── favicon.ico                     ← Site icon
```

---

## 🔧 How to Add Images

### Step 1: Get Your Images Ready
1. Collect all photos from your devices
2. Resize/optimize them (use tools like:
   - **Mac**: Preview (Export → reduce quality to 80%)
   - **Online**: TinyPNG, Squoosh.app
   - **CLI**: ImageMagick, Sharp)
3. Rename them clearly (no spaces, lowercase)

### Step 2: Add to Project
```bash
# Navigate to your project
cd /Users/peng/Documents/mse/private/Hrisa-MyWebsite/janette-portfolio/public/images

# Copy your images
# Example:
cp ~/Downloads/my-photo.jpg mahdi-profile.jpg
cp ~/Downloads/arki-screenshot.png projects/arki.jpg
```

### Step 3: Update References in Code
I'll update the code to use these images once you add them!

---

## ✅ Quick Start Guide

### Option 1: I Have Images Ready
1. Copy all images to the folders above
2. Let me know when done
3. I'll update the code to use them
4. We'll commit and deploy

### Option 2: I'll Add Images Gradually
1. Start with just your profile photo
2. Add project screenshots one by one
3. We'll update and deploy incrementally
4. Add hobby images later

### Option 3: Use Placeholder Images for Now
1. I'll set up the image structure
2. You can add real images later
3. Site will work with placeholders
4. Easy to swap in real images anytime

---

## 📊 Image Optimization Tips

### For Project Screenshots
- Take screenshots at 1920x1080 or higher
- Crop to show the most important parts
- Convert to JPG at 80% quality
- Target: 100-300KB per image

### For Photos (Hobbies)
- Use JPG format
- Resize to max 1600px wide
- Quality: 80-85%
- Target: 50-200KB per image

### For Profile Photo
- Square crop (1:1 aspect ratio)
- At least 800x800px
- Can be higher resolution (will be optimized)
- Target: 50-150KB

### Tools
- **Mac**: Preview, Photos app
- **Online**:
  - TinyPNG.com (compression)
  - Squoosh.app (resize + compress)
  - Canva (cropping/editing)
- **CLI**:
  ```bash
  # Install ImageMagick
  brew install imagemagick

  # Resize and compress
  convert input.jpg -resize 1200x800 -quality 80 output.jpg
  ```

---

## 🎯 What I'll Do Once You Add Images

1. Update `ProjectCard` component to use real images
2. Update `About` page to use your profile photo
3. Test images load correctly
4. Optimize Next.js Image component for performance
5. Add alt text for accessibility
6. Commit and deploy to Vercel

---

## 📝 Publications (If Applicable)

If you have research publications:

### PDF Files
- Location: `janette-portfolio/public/docs/publications/`
- Names: `paper-title-2024.pdf`

### Publication Data
- Add to: `janette-portfolio/data/publications.ts` (I'll create this)
- Include: Title, authors, venue, year, abstract, PDF link

---

## ❓ Questions to Answer

1. **Do you have images ready to upload now?**
   - Yes → Let's add them!
   - No → I'll set up placeholders and you can add later

2. **Which images do you want to add first?**
   - Profile photo only (quickest)
   - Profile + project screenshots (recommended)
   - Everything (comprehensive)

3. **Do you have a CV/resume PDF ready?**
   - Yes → We'll add the download functionality
   - No → We'll hide the button for now

4. **Do you want hobby pages now or later?**
   - Now → We'll build them with your photos
   - Later → We'll add placeholders and build later

---

## 🚀 Next Steps

**Choose your path:**

**Path A: I Have Images Ready**
→ Tell me which images you have, I'll guide you through adding them

**Path B: Add Images Gradually**
→ Start with profile photo, I'll update the code, deploy, then add more

**Path C: Set Up Structure, Add Images Later**
→ I'll create proper image handling, you add images when ready

**Which path works for you?** Let's get your real content live! 📸
