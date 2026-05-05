# SocialSphere Design System

## Overview
Modern dark-mode social platform with refined minimalism. Clean content-first interface with elevated surfaces for depth and vibrant accents for engagement moments.

## Tone & Differentiation
Refined minimalism inspired by Threads and Bluesky. Focus on content and connection over decoration. Micro-depth through surface layering, smooth interactions, and strategic accent color for engagement (likes, follows, comments).

## Palette (Dark Mode)
| Token | OKLCH Value | Usage |
|-------|-------------|-------|
| background | 0.12 0 0 | Deep charcoal, main content area |
| card | 0.16 0 0 | Elevated surfaces, post cards |
| foreground | 0.96 0 0 | Primary text, high contrast |
| primary | 0.72 0.18 221 | Vibrant cyan, CTAs, primary actions |
| accent | 0.75 0.14 72 | Warm amber, engagement highlights |
| border | 0.26 0 0 | Subtle dividers, card edges |
| destructive | 0.64 0.15 16 | Coral red, delete/warning states |
| muted | 0.26 0 0 | Disabled, secondary interactive |

## Typography
- **Display**: General Sans (geometric, modern, friendly)
- **Body**: Inter (neutral, legible, refined)
- **Mono**: Geist Mono (technical, precise)
- **Scale**: 12px (xs), 14px (sm), 16px (base), 20px (lg), 24px (xl), 32px (2xl)

## Structural Zones
| Zone | Surface | Border | Usage |
|------|---------|--------|-------|
| header | card | border-b | Navigation, branding, fixed top |
| sidebar | card | border-r | Navigation menu, secondary actions |
| main feed | background | none | Primary content area, posts |
| cards | card | border | Post containers, profile cards |
| footer | muted/20 | border-t | Meta info, secondary content |

## Shape Language
- **Default radius**: 8px (focused, geometric)
- **Avatar**: full (circle, no exception)
- **Buttons**: 8px (consistent with overall system)
- **Cards**: 8px subtle borders

## Depth & Shadows
- **shadow-subtle**: 0 1px 3px rgba(0,0,0,0.12) — card hover, soft elevation
- **shadow-elevated**: 0 4px 12px rgba(0,0,0,0.15) — dropdowns, modals
- No glow or neon shadows; depth from layering and borders only

## Motion & Transitions
- **Default**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, intentional
- **Engagement**: like button flash, follow state animation
- **Loading**: subtle pulse on skeleton screens, fade for skeleton removal

## Component Patterns
- **Buttons**: primary (cyan), secondary (muted), accent (amber), destructive (red)
- **Inputs**: border-input background, focus ring-primary
- **Cards**: bg-card, border-border, shadow-subtle hover → shadow-elevated
- **Avatars**: full radius, bordered, aspect-square
- **Timeline**: vertical posts with alternating margins for visual rhythm

## Constraints & Anti-patterns
- No full-page gradients
- No generic blue CTAs
- Accent color used sparingly (engagement only, not every button)
- No overly decorated hero sections
- Mobile-first responsive design
