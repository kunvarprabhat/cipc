# CIPC Paramedical Council - Design System for Figma

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Specifications](#component-specifications)
5. [Responsive Breakpoints](#responsive-breakpoints)
6. [Design Tokens](#design-tokens)
7. [Icon System](#icon-system)
8. [Shadows & Effects](#shadows--effects)
9. [Animations & Transitions](#animations--transitions)
10. [Layout Grid](#layout-grid)

---

## 🎨 Color Palette

### Primary Colors (Green - Healthcare Theme)
```
Primary Green 50:  #f0fdf4  (Lightest background)
Primary Green 100: #dcfce7  (Light background)
Primary Green 200: #bbf7d0  (Subtle accent)
Primary Green 300: #86efac  (Light accent)
Primary Green 400: #4ade80  (Medium accent)
Primary Green 500: #22c55e  (Base primary)
Primary Green 600: #16a34a  (Main brand color)
Primary Green 700: #15803d  (Hover states)
Primary Green 800: #166534  (Dark text/backgrounds)
Primary Green 900: #14532d  (Darkest)
```

### Secondary Colors

#### Blue (Admin/Professional)
```
Blue 50:  #eff6ff
Blue 100: #dbeafe
Blue 200: #bfdbfe
Blue 300: #93c5fd
Blue 400: #60a5fa
Blue 500: #3b82f6
Blue 600: #2563eb  (Primary blue)
Blue 700: #1d4ed8  (Hover)
Blue 800: #1e40af
Blue 900: #1e3a8a
```

#### Purple (Faculty/Education)
```
Purple 50:  #faf5ff
Purple 100: #f3e8ff
Purple 200: #e9d5ff
Purple 300: #d8b4fe
Purple 400: #c084fc
Purple 500: #a855f7
Purple 600: #9333ea  (Primary purple)
Purple 700: #7e22ce  (Hover)
Purple 800: #6b21a8
Purple 900: #581c87
```

#### Orange (Affiliation/Warning)
```
Orange 50:  #fff7ed
Orange 100: #ffedd5
Orange 200: #fed7aa
Orange 300: #fdba74
Orange 400: #fb923c
Orange 500: #f97316
Orange 600: #ea580c  (Primary orange)
Orange 700: #c2410c  (Hover)
Orange 800: #9a3412
Orange 900: #7c2d12
```

### Neutral Colors
```
White:        #ffffff
Gray 50:      #f9fafb  (Lightest)
Gray 100:     #f3f4f6
Gray 200:     #e5e7eb
Gray 300:     #d1d5db
Gray 400:     #9ca3af
Gray 500:     #6b7280  (Base gray)
Gray 600:     #4b5563
Gray 700:     #374151
Gray 800:     #1f2937
Gray 900:     #111827  (Darkest)
Gray 950:     #030712  (Footer background)
```

### Semantic Colors
```
Success:  #16a34a  (Green 600)
Error:    #dc2626  (Red 600)
Warning:  #ea580c  (Orange 600)
Info:     #2563eb  (Blue 600)
```

### Gradient Combinations
```
Primary Gradient:    from-green-600 via-green-700 to-teal-600
Header Gradient:     from-green-900 via-green-800 to-green-900
Footer Gradient:     from-gray-900 to-gray-950
Hero Overlay:        from-black/70 via-black/50 to-black/30
Button Gradient:     from-green-600 to-green-700
Hover Gradient:      from-green-700 to-green-800
```

---

## 📝 Typography

### Font Family
- **Primary**: System fonts (Inter, Roboto, sans-serif)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Font Sizes (Responsive Scale)

#### Mobile (Base)
```
text-[8px]:   8px   (0.5rem)   - Tiny labels
text-[9px]:   9px   (0.5625rem) - Small labels
text-[10px]:  10px  (0.625rem)  - Footer text
text-xs:      12px  (0.75rem)   - Small text
text-sm:      14px  (0.875rem)  - Body text
text-base:    16px  (1rem)      - Default
text-lg:      18px  (1.125rem)  - Large text
text-xl:      20px  (1.25rem)   - Heading 4
text-2xl:     24px  (1.5rem)    - Heading 3
text-3xl:     30px  (1.875rem)  - Heading 2
text-4xl:     36px  (2.25rem)   - Heading 1
```

#### Tablet (sm:)
```
sm:text-xs:    12px
sm:text-sm:    14px
sm:text-base:  16px
sm:text-lg:    18px
sm:text-xl:    20px
sm:text-2xl:   24px
sm:text-3xl:   30px
sm:text-4xl:   36px
```

#### Desktop (md: lg:)
```
md:text-lg:    18px
md:text-xl:    20px
md:text-2xl:   24px
md:text-3xl:   30px
md:text-4xl:   36px
md:text-5xl:   48px
md:text-6xl:   60px
lg:text-7xl:   72px
```

### Font Weights
```
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800
```

### Line Heights
```
leading-tight:    1.25
leading-snug:     1.375
leading-normal:   1.5
leading-relaxed:  1.625
leading-loose:    2
```

### Letter Spacing
```
tracking-tighter: -0.05em
tracking-tight:    -0.025em
tracking-normal:   0
tracking-wide:     0.025em
tracking-wider:    0.05em
tracking-widest:   0.1em
```

---

## 📏 Spacing System

### Base Spacing Scale (4px increments)
```
0:    0px
0.5:  2px
1:    4px
1.5:  6px
2:    8px
2.5:  10px
3:    12px
3.5:  14px
4:    16px
5:    20px
6:    24px
7:    28px
8:    32px
9:    36px
10:   40px
12:   48px
14:   56px
16:   64px
20:   80px
24:   96px
28:   112px
32:   128px
```

### Component Spacing
```
Padding Small:    8px (p-2)
Padding Medium:   16px (p-4)
Padding Large:    24px (p-6)
Padding XL:       32px (p-8)

Gap Small:        8px (gap-2)
Gap Medium:      16px (gap-4)
Gap Large:       24px (gap-6)
```

---

## 🧩 Component Specifications

### Buttons

#### Primary Button
```
Background:    Gradient (green-600 to green-700)
Hover:         Gradient (green-700 to green-800)
Text Color:    White (#ffffff)
Padding:       12px 24px (px-6 py-3)
Border Radius: 8px (rounded-lg)
Font Weight:   Bold (700)
Font Size:     16px (text-base)
Shadow:        shadow-lg
Hover Effect:  scale-105, shadow-xl
```

#### Secondary Button
```
Background:    Transparent
Border:        2px solid white/90
Text Color:    White
Hover:         bg-white/10
Padding:       12px 24px
Border Radius: 8px
```

#### Icon Button (Circular)
```
Size:          56px (w-14 h-14)
Border Radius: 50% (rounded-full)
Background:    Gradient (green-600 to green-700)
Shadow:        shadow-2xl
Hover:         scale-110, shadow-3xl
```

### Cards

#### Standard Card
```
Background:    White (#ffffff)
Border Radius: 12px (rounded-xl)
Padding:       24px (p-6)
Shadow:        shadow-md
Hover:         shadow-lg, scale-105
Border:        1px solid gray-200
```

#### Feature Card
```
Background:    White with gradient overlay
Border Radius: 16px (rounded-2xl)
Padding:       32px (p-8)
Shadow:        shadow-xl
Icon Size:     64px (w-16 h-16)
```

### Input Fields

#### Text Input
```
Height:        40px (h-10)
Padding:       12px 16px (px-4 py-3)
Border:        2px solid gray-200
Border Radius: 8px (rounded-lg)
Focus Border:  green-500
Font Size:     16px (text-base)
Background:    White
```

#### Textarea
```
Min Height:    100px
Padding:       12px 16px
Border:        2px solid gray-200
Border Radius: 8px
Font Size:     16px
```

### Navigation

#### Header Height
```
Mobile:    60px
Tablet:    70px
Desktop:   80px
```

#### Top Utility Bar
```
Height:    32px (mobile), 40px (desktop)
Background: Gradient (green-900 to green-800)
Text Size:  10px (mobile), 12px (desktop)
```

### Hero Section

#### Hero Height
```
Mobile:    450px
Tablet:    550px
Desktop:   650px
Large:     700px
```

#### Hero Title
```
Mobile:    36px (text-4xl)
Tablet:    48px (text-5xl)
Desktop:   60px (text-6xl)
Large:     72px (text-7xl)
Font Weight: 800 (extrabold)
```

### Footer

#### Footer Background
```
Gradient:  from-gray-900 to-gray-950
Height:    Auto (min 400px)
Padding:   80px vertical (py-20)
```

---

## 📱 Responsive Breakpoints

```
Extra Small (xs):  475px
Small (sm):        640px
Medium (md):       768px
Large (lg):        1024px
Extra Large (xl):  1280px
2XL (2xl):         1536px
```

### Breakpoint Usage
- **Mobile First**: Base styles for mobile, then add breakpoints
- **xs**: 475px+ (Small phones landscape)
- **sm**: 640px+ (Tablets portrait)
- **md**: 768px+ (Tablets landscape)
- **lg**: 1024px+ (Desktop)
- **xl**: 1280px+ (Large desktop)

---

## 🎯 Design Tokens

### Border Radius
```
rounded-sm:    2px
rounded:       4px
rounded-md:    6px
rounded-lg:    8px
rounded-xl:    12px
rounded-2xl:   16px
rounded-full:  9999px (50%)
```

### Shadows
```
shadow-sm:     0 1px 2px rgba(0,0,0,0.05)
shadow:        0 1px 3px rgba(0,0,0,0.1)
shadow-md:     0 4px 6px rgba(0,0,0,0.1)
shadow-lg:     0 10px 15px rgba(0,0,0,0.1)
shadow-xl:     0 20px 25px rgba(0,0,0,0.1)
shadow-2xl:    0 25px 50px rgba(0,0,0,0.25)
shadow-3xl:    0 35px 60px rgba(0,0,0,0.3)
```

### Opacity
```
opacity-0:     0
opacity-5:     0.05
opacity-10:    0.1
opacity-20:    0.2
opacity-30:    0.3
opacity-40:    0.4
opacity-50:    0.5
opacity-60:    0.6
opacity-70:    0.7
opacity-80:    0.8
opacity-90:    0.9
opacity-100:   1
```

### Z-Index Scale
```
z-0:     0
z-10:    10
z-20:    20
z-30:    30
z-40:    40
z-50:    50
```

---

## 🎨 Icon System

### Icon Library
**Remix Icon** (ri-*)

### Icon Sizes
```
text-xs:    12px
text-sm:    14px
text-base:  16px
text-lg:    18px
text-xl:    20px
text-2xl:   24px
text-3xl:   30px
text-4xl:   36px
```

### Common Icons
```
Navigation:    ri-menu-line, ri-close-line
Social:        ri-facebook-fill, ri-twitter-x-fill, ri-instagram-fill, ri-youtube-fill
Contact:       ri-phone-fill, ri-mail-fill, ri-map-pin-fill
Education:     ri-graduation-cap-line, ri-book-open-line
Healthcare:    ri-hospital-line, ri-stethoscope-line
Actions:       ri-arrow-right-line, ri-search-line, ri-user-line
```

---

## ✨ Shadows & Effects

### Backdrop Blur
```
backdrop-blur-sm:  4px
backdrop-blur:     8px
backdrop-blur-md:  12px
backdrop-blur-lg:  16px
backdrop-blur-xl:  24px
```

### Gradient Overlays
```
Light Overlay:     bg-white/10
Medium Overlay:    bg-white/20
Dark Overlay:      bg-black/50
Hero Overlay:      bg-black/70
```

### Glass Morphism
```
Background:    bg-white/20
Backdrop:      backdrop-blur-md
Border:        border-white/30
```

---

## 🎬 Animations & Transitions

### Transition Durations
```
duration-75:    75ms
duration-100:   100ms
duration-150:   150ms
duration-200:   200ms
duration-300:   300ms (standard)
duration-500:   500ms
duration-700:   700ms
duration-1000:  1000ms
```

### Transition Easing
```
ease-linear:    linear
ease-in:        cubic-bezier(0.4, 0, 1, 1)
ease-out:       cubic-bezier(0, 0, 0.2, 1)
ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1)
```

### Keyframe Animations
```
slideIn:        Slide from left with fade
fadeIn:         Fade in with slight upward movement
slide-up:       Slide up with scale
shimmer:        Shimmer effect for buttons
pulse:          Pulse animation
bounce:         Bounce animation
```

### Hover Effects
```
Scale:          hover:scale-105 (5% increase)
Shadow:         hover:shadow-lg
Color:          hover:bg-green-700
Transform:      hover:translate-x-1
```

---

## 📐 Layout Grid

### Container Widths
```
Mobile:     100% (with padding)
Tablet:     100% (with padding)
Desktop:    1280px (max-w-7xl)
Large:      1536px (max-w-7xl)
```

### Grid System
```
1 Column:   Mobile
2 Columns:  Tablet (sm:grid-cols-2)
3 Columns:  Desktop (md:grid-cols-3)
4 Columns:  Large (lg:grid-cols-4)
12 Columns: Footer layout (lg:grid-cols-12)
```

### Gaps
```
gap-2:      8px
gap-4:      16px
gap-6:      24px
gap-8:      32px
```

---

## 🎨 Component Color Mapping

### Role-Based Colors
```
Student:      Green (green-600)
Admin:        Blue (blue-600)
Teacher:      Purple (purple-600)
Affiliation:  Orange (orange-600)
```

### Status Colors
```
Active:       Green-500
Pending:      Yellow-500
Inactive:     Gray-400
Error:        Red-500
```

---

## 📋 Figma Implementation Guide

### 1. Create Color Styles
- Add all colors from the palette as Figma Color Styles
- Name them: `Primary/Green-600`, `Secondary/Blue-600`, etc.

### 2. Create Text Styles
- Create text styles for each heading level (H1-H6)
- Include responsive variants (Mobile, Tablet, Desktop)

### 3. Create Component Library
- Buttons (Primary, Secondary, Icon)
- Cards (Standard, Feature, Stats)
- Input Fields (Text, Textarea, Select)
- Navigation (Header, Footer, Sidebar)
- Forms (Multi-step, Single page)

### 4. Set Up Auto Layout
- Use Auto Layout for all components
- Set padding and gaps according to spacing system

### 5. Create Variants
- Button variants (Primary, Secondary, Disabled, Hover)
- Card variants (Default, Hover, Selected)
- Input variants (Default, Focus, Error, Disabled)

### 6. Responsive Frames
- Create frames for each breakpoint
- Use constraints for responsive behavior

### 7. Component States
- Default
- Hover
- Active
- Focus
- Disabled
- Loading

---

## 🚀 Quick Reference

### Most Used Colors
```
Primary:     #16a34a (Green 600)
Secondary:   #2563eb (Blue 600)
Accent:      #9333ea (Purple 600)
Success:     #16a34a
Error:       #dc2626
Warning:     #ea580c
```

### Most Used Spacing
```
Small:    8px
Medium:   16px
Large:    24px
XL:       32px
```

### Most Used Border Radius
```
Small:    4px (rounded)
Medium:   8px (rounded-lg)
Large:    12px (rounded-xl)
Full:      50% (rounded-full)
```

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**For**: CIPC Paramedical Council Website

