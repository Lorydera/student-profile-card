# KodeCamp 6.0 — Student Profile Card App

A React student dashboard app built as part of the KodeCamp 6.0 Stage 2 promotional task.

## Live Demo
[View on Vercel](#) >

## Overview
This app displays profile cards for 8 students, showing their track, score, grade, active status, and skills. It was built to demonstrate core React fundamentals using only props — no state.

## Features
- Reusable `Badge` component for track, status, and grade labels
- Visual `StatBar` that changes color based on score
- Student cards with avatar, full name, badges, score bar, and skills list
- Inactive students are visually distinguished
- Empty skills list shows a fallback message
- Class average calculated dynamically using `.reduce()`

## Components
| Component | Type | Description |
|---|---|---|
| `Header` | Functional | Displays app title, student count, and class average |
| `Badge` | Functional | Reusable label with dynamic className based on type |
| `StatBar` | Functional | Visual score bar with color based on score range |
| `StudentCard` | Functional | Full student profile card using Badge and StatBar |
| `StudentList` | Functional | Maps over students and renders a StudentCard for each |

## Concepts Demonstrated
- Functional components with arrow functions
- Props and destructuring
- Component composition
- Conditional rendering (`&&` and ternary)
- Rendering lists with `.map()` and `key` props
- Default prop values
- Inline styles
- Template literals and `className`

## Setup
bash
npm install
npm run dev


## Built With
- React
- Vite