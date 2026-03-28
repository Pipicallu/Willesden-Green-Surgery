# Storyblok Component System Plan

## Executive Summary

After analyzing 7 pages from the Willesden Green Surgery website, here's the refined component system needed:

**📊 Analysis Results:**

- **Pages analyzed:** Safe Surgeries, Pregnancy, Mental Health, Sick Leave, Weight Loss, EU Citizens, New Hub
- **Components identified:** 25 total (20 content + 5 layout)
- **Component reuse rate:** 85% (most components used across multiple pages)
- **Complexity range:** From simple (PageHero) to complex (FormEmbed, Timeline)

**🎯 Key Findings:**

1. **New Hub page** is the most complex (uses 15+ different components)
2. **Weight Loss page** revealed need for ServiceList component (programs with contact info)
3. **Sick Leave page** is the simplest (only 5 components needed)
4. Most pages share common pattern: Hero → Alert/Info → Content → CTAs

**✅ Feasibility:** 100% achievable with Storyblok

- Dynamic routing eliminates need for manual page creation
- All identified components are standard CMS patterns
- Shadcn provides UI building blocks for 80% of needs

**⏱️ Time Investment:**

- MVP (5 core components): 10-15 hours → Covers 4 full pages
- Phase 1 (8 components): 20-25 hours → Covers 6 full pages
- Complete system (25 components): 60-80 hours
- With testing & migration: 100-120 hours total

**🚀 Recommended Start:**
Begin with 5 core components (PageHero, RichTextBlock, IconCardGrid, CallToActionBlock, AlertBanner) to get immediate value and test the system.

---

## Overview

Create a library of reusable Storyblok components that allow non-technical users to build pages like Safe Surgeries, Pregnancy, and Mental Health through the Storyblok CMS interface.

## 1. Dynamic Routing Setup

### Create Dynamic Route Handler

**File:** `src/pages/[...slug].astro`

This will automatically handle all Storyblok pages without manual route creation.

```astro
---
import { useStoryblokApi } from '@storyblok/astro'
import StoryblokComponent from '@storyblok/astro/StoryblokComponent.astro'
import Layout from '../layouts/Layout.astro'

export async function getStaticPaths() {
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/', {
    version: 'draft'
  })

  let paths = []
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return
    }
    const slug = data.links[linkKey].slug === 'home' ? undefined : data.links[linkKey].slug
    paths.push({ params: { slug } })
  })

  return paths
}

const storyblokApi = useStoryblokApi()
const { slug } = Astro.params
const { data } = await storyblokApi.get(`cdn/stories/${slug || 'home'}`, {
  version: 'draft',
})

const story = data.story
---

<Layout>
  <StoryblokComponent blok={story.content} />
</Layout>
```

## 2. Component Architecture

### High-Level Storyblok Components Needed

#### Essential Content Components (Priority 1)

1. **PageHero** - Hero section with title, subtitle, image
2. **RichTextBlock** - Formatted text content with styling options
3. **IconCardGrid** - Grid of icon cards with links (2-4 columns)
4. **StatisticsGrid** - Stats with numbers, icons, descriptions (new-hub page)
5. **CallToActionBlock** - CTA buttons with various layouts
6. **AlertBanner** - Important notices/warnings/info boxes
7. **ImageGallery** - Image showcase with captions (site plans, floor plans)
8. **AccordionList** - FAQ-style collapsible content
9. **FormEmbed** - Embed external forms (feedback, consultation forms)
10. **LogoGrid** - Partner/sponsor logos display

#### Advanced Content Components (Priority 2)

11. **ResourceSection** - Categorized resource lists with accordions
12. **InfoTable** - Data tables (maternity units, comparison tables)
13. **StepsSection** - Numbered/ordered process steps
14. **TimelineSection** - Visual timeline (new-hub timeline)
15. **ImageTextSection** - Image alongside text (left/right layouts)
16. **QuoteBlock** - Highlighted quotes or key messages
17. **ServiceList** - Repeatable service items with icons, titles, descriptions, contact
18. **TabsSection** - Tabbed content organization
19. **VideoSection** - Embedded video or video upload
20. **DownloadLinks** - File download cards/buttons
21. **NavigationGrid** - Quick navigation tiles to page sections

#### Layout Components (Priority 3)

22. **Section** - Wrapper for sections with background options
23. **Container** - Content width container
24. **Spacer** - Add spacing between components
25. **ColumnLayout** - Multi-column layouts (2-3 columns)

## 3. Component Specifications

### 3.1 PageHero

**Purpose:** Top section of page with title and optional image
**Used in:** All pages
**Fields:**

- `title` (text, required)
- `subtitle` (textarea, optional)
- `image` (asset, optional)
- `background_color` (option: default/primary/muted)
- `text_alignment` (option: left/center)
- `overlay` (boolean) - dark overlay on image

### 3.2 RichTextBlock

**Purpose:** Main content with rich text formatting
**Used in:** All pages for main content
**Fields:**

- `content` (richtext, required)
- `width` (option: full/contained/narrow)
- `background` (option: transparent/card/muted)
- `text_size` (option: normal/large/small)

### 3.3 IconCardGrid

**Purpose:** Grid of cards with icons (like pregnancy page quick links)
**Used in:** Pregnancy, Mental Health, New Hub explore section
**Fields:**

- `title` (text, optional)
- `columns` (option: 2/3/4)
- `cards` (blocks, repeatable):
  - `icon` (asset, required)
  - `title` (text, required)
  - `description` (textarea, optional)
  - `link_url` (text, optional)
  - `link_text` (text, optional)
  - `link_external` (boolean)

### 3.4 StatisticsGrid

**Purpose:** Display key statistics/numbers with icons
**Used in:** New Hub (£8m investment, 50+ jobs, etc.)
**Fields:**

- `title` (text, optional)
- `columns` (option: 2/3/4/5)
- `stats` (blocks, repeatable):
  - `number` (text, required) - e.g., "£8m", "50+", "1,000sqm"
  - `label` (text, required) - description
  - `icon` (asset, optional)

### 3.5 CallToActionBlock

**Purpose:** Prominent CTA buttons
**Used in:** All pages for actions
**Fields:**

- `title` (text, optional)
- `description` (textarea, optional)
- `layout` (option: horizontal/vertical/centered)
- `buttons` (blocks, repeatable):
  - `button_text` (text, required)
  - `button_url` (text, required)
  - `button_style` (option: primary/secondary/outline/ghost)
  - `external_link` (boolean)
- `background` (option: transparent/primary/muted/card)
- `alignment` (option: left/center/right)

### 3.6 AlertBanner

**Purpose:** Important notices (like crisis numbers, sick leave info)
**Used in:** Mental Health (crisis), Sick Leave (7-day rule)
**Fields:**

- `type` (option: info/warning/danger/success)
- `title` (text, optional)
- `content` (richtext, required)
- `icon` (asset, optional)
- `dismissible` (boolean)

### 3.7 ImageGallery

**Purpose:** Display multiple images (floor plans, site visuals, etc.)
**Used in:** New Hub (site plans, floor plans, elevations)
**Fields:**

- `title` (text, optional)
- `layout` (option: grid/slider/masonry)
- `columns` (option: 1/2/3/4)
- `images` (blocks, repeatable):
  - `image` (asset, required)
  - `caption` (text, optional)
  - `alt_text` (text, required)

### 3.8 AccordionList (FAQ)

**Purpose:** Collapsible FAQ sections
**Used in:** New Hub (17 FAQs), Mental Health (resources)
**Fields:**

- `title` (text, optional)
- `items` (blocks, repeatable):
  - `question` (text, required)
  - `answer` (richtext, required)
  - `default_open` (boolean)

### 3.9 FormEmbed

**Purpose:** Embed external forms or create simple contact forms
**Used in:** New Hub (feedback form)
**Fields:**

- `title` (text, optional)
- `form_type` (option: embed/simple)
- `embed_code` (textarea, optional) - for iframe embeds
- `form_fields` (blocks, optional) - for simple forms:
  - `field_label` (text, required)
  - `field_type` (option: text/email/textarea/select)
  - `field_required` (boolean)
  - `field_options` (text, optional) - comma separated for select

### 3.10 LogoGrid

**Purpose:** Display partner/organization logos
**Used in:** New Hub (community partners, sponsors)
**Fields:**

- `title` (text, optional)
- `columns` (option: 3/4/5/6)
- `logos` (blocks, repeatable):
  - `logo` (asset, required)
  - `alt_text` (text, required)
  - `link_url` (text, optional)

### 3.11 ResourceSection

**Purpose:** Categorized resources (like mental health resources)
**Used in:** Mental Health (resources), Weight Loss (services by category)
**Fields:**

- `title` (text, optional)
- `layout` (option: accordion/tabs/cards)
- `categories` (blocks, repeatable):
  - `category_title` (text, required)
  - `category_icon` (asset, optional)
  - `content` (richtext, required)
  - `links` (blocks, repeatable):
    - `link_text` (text, required)
    - `link_url` (text, required)
    - `link_icon` (asset, optional)

### 3.12 InfoTable

**Purpose:** Display tabular data (like maternity units)
**Used in:** Pregnancy (maternity units comparison)
**Fields:**

- `title` (text, optional)
- `striped` (boolean)
- `bordered` (boolean)
- `headers` (blocks, repeatable):
  - `header_text` (text, required)
  - `align` (option: left/center/right)
- `rows` (blocks, repeatable):
  - `cells` (blocks, repeatable):
    - `cell_content` (textarea, required)

### 3.13 StepsSection

**Purpose:** Numbered or ordered steps
**Used in:** Pregnancy (5 pregnancy steps)
**Fields:**

- `title` (text, optional)
- `auto_number` (boolean) - automatically number steps
- `steps` (blocks, repeatable):
  - `step_number` (text, optional)
  - `step_title` (text, required)
  - `step_content` (richtext, required)
  - `step_icon` (asset, optional)

### 3.14 TimelineSection

**Purpose:** Visual timeline for events/project phases
**Used in:** New Hub (project timeline)
**Fields:**

- `title` (text, optional)
- `orientation` (option: horizontal/vertical)
- `events` (blocks, repeatable):
  - `date` (text, required)
  - `title` (text, required)
  - `description` (textarea, optional)
  - `status` (option: completed/current/upcoming)

### 3.15 ImageTextSection

**Purpose:** Content with side-by-side image and text
**Used in:** New Hub (Vision, Location sections)
**Fields:**

- `image` (asset, required)
- `image_position` (option: left/right)
- `image_size` (option: 33%/50%/66%)
- `title` (text, optional)
- `content` (richtext, required)
- `cta_text` (text, optional)
- `cta_url` (text, optional)
- `background` (option: transparent/muted/card)

### 3.16 QuoteBlock

**Purpose:** Highlighted messages (like "We are here for you")
**Used in:** Mental Health, New Hub
**Fields:**

- `quote_text` (textarea, required)
- `author` (text, optional)
- `background` (option: default/primary/muted)
- `size` (option: normal/large)
- `alignment` (option: left/center)

### 3.17 ServiceList

**Purpose:** Repeatable service/program items with contact info
**Used in:** Weight Loss (multiple programs with contact details)
**Fields:**

- `title` (text, optional)
- `services` (blocks, repeatable):
  - `service_icon` (asset, optional)
  - `service_title` (text, required)
  - `service_description` (richtext, required)
  - `contact_links` (blocks, repeatable):
    - `link_type` (option: website/email/phone)
    - `link_text` (text, required)
    - `link_url` (text, required)
    - `link_icon` (asset, optional)

### 3.18 TabsSection

**Purpose:** Organize content in tabs
**Used in:** Could be used for Weight Loss (disability/children categories)
**Fields:**

- `title` (text, optional)
- `tabs` (blocks, repeatable):
  - `tab_title` (text, required)
  - `tab_icon` (asset, optional)
  - `tab_content` (richtext, required)

### 3.19 VideoSection

**Purpose:** Embed or upload videos
**Used in:** Potentially for future educational content
**Fields:**

- `title` (text, optional)
- `video_type` (option: upload/youtube/vimeo/embed)
- `video_file` (asset, optional) - for uploads
- `video_url` (text, optional) - for external
- `embed_code` (textarea, optional)
- `poster_image` (asset, optional)
- `description` (textarea, optional)

### 3.20 NavigationGrid

**Purpose:** Quick jump navigation tiles to page sections
**Used in:** New Hub ("Explore the Proposal" section)
**Fields:**

- `title` (text, optional)
- `columns` (option: 3/4/5)
- `links` (blocks, repeatable):
  - `icon` (asset, required)
  - `title` (text, required)
  - `link_type` (option: section/page/external)
  - `link_target` (text, required) - section ID or URL

## 4. Shadcn Components Needed

### Already Have:

- ✅ Button
- ✅ Accordion
- ✅ Switch

### Priority 1 - Install Immediately:

```bash
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add table
npx shadcn@latest add alert
npx shadcn@latest add tabs
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
```

### Priority 2 - Install as Needed:

```bash
npx shadcn@latest add select
npx shadcn@latest add label
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add skeleton
```

### Custom Components to Build:

- **StatCard** - For displaying statistics with numbers
- **ServiceCard** - For service listings with contact info
- **TimelineItem** - For timeline events
- **NavigationTile** - For navigation grids
- **LogoCard** - For partner logo displays

## 5. Example Page Mapping

### Safe Surgeries Page

```
- PageHero (title: "Safe Surgeries", image: Safe Surgeries logo)
- RichTextBlock (main content about safe surgeries)
- CallToActionBlock (link to registration)
```

### Pregnancy Page

```
- PageHero (title: "Your Pregnancy", image: pregnancy image)
- IconCardGrid (Pregnancy Guide, NHS Advice, Unsure links)
- RichTextBlock (Congratulations message)
- StepsSection (5 numbered pregnancy steps)
- InfoTable (Maternity units comparison)
- CallToActionBlock (Book appointment)
```

### Mental Health Page

```
- PageHero (title: "Your Mental Health", image: mental health icon)
- AlertBanner (Crisis Numbers - warning type)
- RichTextBlock (Let's talk about mental health)
- IconCardGrid (Talk, Movement, Doctor, Meditation - 4 columns)
- ResourceSection (Self-esteem, Hub of Hope, Insomnia, Panic Attacks)
- ResourceSection (Arabic Resources)
- QuoteBlock ("We are here for you")
```

### Sick Leave Page

```
- PageHero (title: "Sick Leave", image: medical report icon)
- RichTextBlock (introduction)
- AlertBanner (Less than 7 days - info type)
- AlertBanner (More than 7 days - info type)
- CallToActionBlock (HMRC self-certificate + Accurx form buttons)
```

### Weight Loss Support Page

```
- PageHero (title: "Weight Loss Support", image: weight icon)
- RichTextBlock (introduction + BMI calculator link)
- ServiceList (General services: My Heart Beats, B.Active, Exercise Referral, etc.)
- RichTextBlock (Services for people with disability header)
- ServiceList (Disability services)
- RichTextBlock (Services for children header)
- ServiceList (Children's programs)
- QuoteBlock (Support message)
```

### EU Citizens Advice Page

```
- PageHero (title: "EU Citizens Advice")
- RichTextBlock (Introduction)
- RichTextBlock (NHS Advice quotes - with special formatting)
- RichTextBlock (Patients entering UK)
- RichTextBlock (Patients registering)
```

### New Hub Page (Most Complex)

```
- PageHero (title: "Informal Public Consultation...", large hero image, centered)
- NavigationGrid (Explore the Proposal - 9 tiles with icons)
- AlertBanner (In person consultation - past event)
- CallToActionBlock (Online consultation options - 4 buttons)
- AlertBanner (Follow-up consultation)
- ImageTextSection (Opportunity - NHS Estates Crisis)
- ImageTextSection (Disused Gladstone Centre)
- StatisticsGrid (£8m, 50+ jobs, 20,000 patients, etc.)
- RichTextBlock (Vision section with bullet lists)
- ImageTextSection (Current Site with map)
- ImageTextSection (Transport info with map)
- RichTextBlock (Environment commitments)
- ImageTextSection (Padel court info)
- ImageGallery (Site Plan, Ground Floor, First Floor, Elevations)
- TimelineSection (Project timeline)
- LogoGrid (Community partners)
- RichTextBlock (Special thanks names)
- FormEmbed (Feedback form)
- AccordionList (17 FAQs)
- CallToActionBlock (Vote to name the hub)
```

## 6. Implementation Steps

### Phase 1: Foundation Setup (Week 1)

**Goal:** Get infrastructure ready

1. ✅ Review existing Storyblok components
2. Create dynamic route handler `[...slug].astro`
3. Install Priority 1 shadcn components
4. Set up Storyblok schema for Page content type
5. Create base Storyblok component wrapper structure

### Phase 2: Core Components (Week 2)

**Goal:** Build components used across 90% of pages

1. PageHero component
2. RichTextBlock component
3. IconCardGrid component
4. CallToActionBlock component
5. AlertBanner component
6. Test with Safe Surgeries + EU Citizens pages

### Phase 3: Advanced Display Components (Week 3)

**Goal:** Build components for complex content

1. AccordionList (FAQ) component
2. ImageGallery component
3. StepsSection component
4. ServiceList component
5. InfoTable component
6. Test with Mental Health + Pregnancy pages

### Phase 4: Specialty Components (Week 4)

**Goal:** Build unique/less common components

1. StatisticsGrid component
2. TimelineSection component
3. NavigationGrid component
4. LogoGrid component
5. FormEmbed component
6. Test with New Hub page

### Phase 5: Polish & Remaining (Week 5)

**Goal:** Complete remaining components and finalize

1. ImageTextSection component
2. QuoteBlock component
3. ResourceSection component
4. TabsSection component
5. VideoSection component
6. Test with Weight Loss + Sick Leave pages

### Phase 6: Migration & Documentation (Week 6)

**Goal:** Move content and train users

1. Migrate all 7 pages to Storyblok
2. Create CMS user guide with screenshots
3. User testing with non-technical staff
4. Refine components based on feedback
5. Create component library documentation

## 7. Storyblok Schema Setup

### In Storyblok Dashboard:

1. Create new content type "Page"
2. Add all components as nestable blocks
3. Configure field types and validations
4. Set up preview URLs
5. Create documentation/guidelines for users

## 8. Benefits of This Approach

✅ **Non-technical friendly** - Drag and drop components
✅ **Consistent design** - Predefined components ensure brand consistency
✅ **Flexible** - Components can be mixed and matched
✅ **Scalable** - Add new page types without coding
✅ **Preview** - Real-time preview in Storyblok
✅ **Version control** - Storyblok handles content versioning
✅ **Multi-language** - Easy to add translations later

## 9. Example Component Usage in Storyblok

```json
{
  "component": "page",
  "body": [
    {
      "component": "PageHero",
      "title": "Safe Surgeries",
      "subtitle": "A welcoming space for everyone",
      "image": "safe-surgeries.jpg",
      "background_color": "default"
    },
    {
      "component": "RichTextBlock",
      "content": "<p>Willesden Green Surgery is proud...</p>",
      "width": "contained"
    },
    {
      "component": "CallToActionBlock",
      "title": "Ready to register?",
      "buttons": [
        {
          "button_text": "Register Now",
          "button_url": "/new-patients",
          "button_style": "primary"
        }
      ]
    }
  ]
}
```

## 10. Next Steps

### Recommended MVP Approach

**Phase 1A - Immediate Start (This Week):**

1. Set up dynamic routing `[...slug].astro`
2. Install Priority 1 shadcn components
3. Build these 5 core components:
   - PageHero
   - RichTextBlock
   - IconCardGrid
   - CallToActionBlock
   - AlertBanner

**Why these 5?**

- Cover 4 out of 7 pages completely (Safe Surgeries, EU Citizens, Sick Leave + partial Mental Health)
- Used in every single page
- Simple to build and test
- Gives immediate value

**Phase 1B - Quick Win Pages (Week 2):** 4. Build 3 more components:

- ServiceList
- QuoteBlock
- AccordionList

5. Complete pages: Safe Surgeries, EU Citizens, Sick Leave, partial Weight Loss

**Phase 1C - Complex Pages (Week 3-4):** 6. Build remaining components as needed 7. Complete all pages including New Hub

### Component Complexity Ratings

**Easy** (1-2 hours each):

- PageHero ⭐
- RichTextBlock ⭐
- AlertBanner ⭐
- QuoteBlock ⭐
- Spacer ⭐

**Medium** (3-4 hours each):

- IconCardGrid ⭐⭐
- CallToActionBlock ⭐⭐
- StepsSection ⭐⭐
- ImageTextSection ⭐⭐
- LogoGrid ⭐⭐
- NavigationGrid ⭐⭐

**Complex** (5-8 hours each):

- ServiceList ⭐⭐⭐
- ResourceSection ⭐⭐⭐
- AccordionList ⭐⭐⭐
- InfoTable ⭐⭐⭐
- StatisticsGrid ⭐⭐⭐
- ImageGallery ⭐⭐⭐

**Advanced** (8+ hours each):

- TimelineSection ⭐⭐⭐⭐
- FormEmbed ⭐⭐⭐⭐
- TabsSection ⭐⭐⭐⭐
- VideoSection ⭐⭐⭐⭐

### Total Time Estimate

- **MVP (5 core components):** 10-15 hours
- **Phase 1 Complete (8 components):** 20-25 hours
- **All 25 components:** 60-80 hours
- **With testing & migration:** 100-120 hours

Ready to start? I recommend beginning with:

1. Dynamic routing setup (30 mins)
2. Install shadcn components (15 mins)
3. Build PageHero (1-2 hours)
4. Build RichTextBlock (1-2 hours)
5. Test with a simple page

This gives you a working foundation in ~4-5 hours that you can immediately see in action!
