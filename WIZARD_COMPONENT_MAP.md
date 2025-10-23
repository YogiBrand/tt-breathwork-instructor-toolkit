# Brand Wizard - Component Architecture Map

## Component Hierarchy

```
App.jsx
└── BrandWizard.jsx (Main Container)
    ├── Header Section
    │   ├── Title: "Build Your Brand"
    │   └── Subtitle
    │
    ├── Progress Indicator
    │   ├── Step 1 Circle (Visuals)
    │   ├── Step 2 Circle (Details)
    │   ├── Step 3 Circle (Positioning)
    │   ├── Step 4 Circle (Services)
    │   ├── Step 5 Circle (Review)
    │   └── Progress Line (animated)
    │
    ├── Step Content Area (AnimatePresence)
    │   │
    │   ├── Step1Visuals (step === 1)
    │   │   ├── Logo Upload
    │   │   │   ├── Drag & Drop Zone
    │   │   │   ├── File Input (hidden)
    │   │   │   ├── Image Preview
    │   │   │   └── Remove Button
    │   │   │
    │   │   ├── Photo Upload
    │   │   │   ├── Drag & Drop Zone
    │   │   │   ├── File Input (hidden)
    │   │   │   ├── Image Preview
    │   │   │   └── Remove Button
    │   │   │
    │   │   ├── Color Palette Selection
    │   │   │   ├── Tim's Classic (preset)
    │   │   │   ├── Calm Professional (preset)
    │   │   │   ├── Warm Wellness (preset)
    │   │   │   └── Custom Color Picker
    │   │   │       ├── Primary Color Input
    │   │   │       ├── Accent Color Input
    │   │   │       └── Secondary Color Input
    │   │   │
    │   │   └── Navigation
    │   │       └── Continue Button
    │   │
    │   ├── Step2Details (step === 2)
    │   │   ├── Form (React Hook Form)
    │   │   │   ├── Full Name Input *
    │   │   │   ├── Credentials Input
    │   │   │   ├── Business Name Input
    │   │   │   ├── Location Input *
    │   │   │   ├── Phone Input
    │   │   │   ├── Email Input *
    │   │   │   ├── Website Input
    │   │   │   ├── Instagram Input
    │   │   │   └── LinkedIn Input
    │   │   │
    │   │   └── Navigation
    │   │       ├── Back Button
    │   │       └── Continue Button
    │   │
    │   ├── Step3Positioning (step === 3)
    │   │   ├── Target Audience (multi-select)
    │   │   │   ├── Corporate Professionals
    │   │   │   ├── Athletes
    │   │   │   ├── Wellness Seekers
    │   │   │   ├── Trauma Recovery
    │   │   │   ├── Yoga Community
    │   │   │   ├── Medical Patients
    │   │   │   ├── Performers & Artists
    │   │   │   └── General Public
    │   │   │
    │   │   ├── Unique Positioning (single-select)
    │   │   │   ├── Science-Based
    │   │   │   ├── Spiritual & Holistic
    │   │   │   ├── Performance Focused
    │   │   │   ├── Trauma-Informed
    │   │   │   ├── Accessible & Practical
    │   │   │   └── Transformational Journey
    │   │   │
    │   │   ├── Signature Technique Input
    │   │   ├── One-Line Description Textarea *
    │   │   ├── Examples Box
    │   │   │
    │   │   └── Navigation
    │   │       ├── Back Button
    │   │       └── Continue Button
    │   │
    │   ├── Step4Services (step === 4)
    │   │   ├── Location Multiplier Info
    │   │   ├── Service Selection (multi-select with pricing)
    │   │   │   ├── 1:1 Sessions
    │   │   │   │   ├── Selection Checkbox
    │   │   │   │   └── Pricing Input (expandable)
    │   │   │   ├── Group Classes
    │   │   │   │   ├── Selection Checkbox
    │   │   │   │   └── Pricing Input (expandable)
    │   │   │   ├── Corporate Workshops
    │   │   │   │   ├── Selection Checkbox
    │   │   │   │   └── Pricing Input (expandable)
    │   │   │   ├── Retreats
    │   │   │   │   ├── Selection Checkbox
    │   │   │   │   └── Pricing Input (expandable)
    │   │   │   └── Online Sessions
    │   │   │       ├── Selection Checkbox
    │   │   │       └── Pricing Input (expandable)
    │   │   │
    │   │   ├── Pricing Tips Box
    │   │   │
    │   │   └── Navigation
    │   │       ├── Back Button
    │   │       └── Continue Button
    │   │
    │   └── Step5Review (step === 5)
    │       ├── Visual Identity Card
    │       │   ├── Logo Preview
    │       │   ├── Photo Preview
    │       │   ├── Color Palette Display
    │       │   └── Edit Button → setWizardStep(1)
    │       │
    │       ├── Contact Details Card
    │       │   ├── Name, Credentials
    │       │   ├── Location, Email, Phone
    │       │   ├── Website, Social Media
    │       │   └── Edit Button → setWizardStep(2)
    │       │
    │       ├── Positioning Card
    │       │   ├── Target Audience Badges
    │       │   ├── Unique Positioning
    │       │   ├── Signature Technique
    │       │   ├── One-Line Description
    │       │   └── Edit Button → setWizardStep(3)
    │       │
    │       ├── Services Card
    │       │   ├── Service List with Pricing
    │       │   └── Edit Button → setWizardStep(4)
    │       │
    │       ├── Generate Section
    │       │   ├── Sparkles Icon
    │       │   ├── Call to Action
    │       │   └── Generate Button
    │       │
    │       ├── Generation Progress (conditional)
    │       │   ├── Animated Sparkles
    │       │   ├── Progress Bar (0-100%)
    │       │   ├── Progress Percentage
    │       │   └── Status Message
    │       │
    │       └── Navigation
    │           └── Back Button
    │
    ├── Skip Button
    │   └── "Skip for now"
    │
    └── Celebration Modal (conditional)
        ├── Backdrop Overlay
        ├── Modal Content
        │   ├── Party Popper Icon (animated)
        │   ├── "Congratulations!" Title
        │   ├── Success Message
        │   ├── Redirect Message
        │   └── Confetti Particles (30x)
        └── Auto-close Timer
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interaction                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Wizard Step Component                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Hook Form (Steps 2, 3, 4)              │   │
│  │  • Validation                                         │   │
│  │  • Error Handling                                     │   │
│  │  • Submit Handler                                     │   │
│  └────────────┬─────────────────────────────────────────┘   │
└───────────────┼─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Zustand Store                             │
│                   (brandStore.js)                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State:                                               │   │
│  │  • brandData (object)                                 │   │
│  │  • wizardStep (1-5)                                   │   │
│  │  • wizardCompleted (boolean)                          │   │
│  │  • isLoading (boolean)                                │   │
│  │  • isSaved (boolean)                                  │   │
│  │  • error (string|null)                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Actions:                                             │   │
│  │  • setBrandData(data)                                 │   │
│  │  • updateField(field, value)                          │   │
│  │  • updateColorPalette(palette)                        │   │
│  │  • addService(service)                                │   │
│  │  • setWizardStep(step)                                │   │
│  │  • completeWizard()                                   │   │
│  │  • saveBrandData(userId)                              │   │
│  └────────────┬─────────────────────────────────────────┘   │
└───────────────┼─────────────────────────────────────────────┘
                │
                ├─────────────────┬─────────────────┐
                ▼                 ▼                 ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │ localStorage │  │  Backend API │  │  Components  │
        │   Persist    │  │    Save      │  │  Re-render   │
        └──────────────┘  └──────────────┘  └──────────────┘
```

## State Transitions

```
┌──────────────┐
│   Landing    │
└──────┬───────┘
       │ Click "Get Started"
       ▼
┌──────────────┐
│  Code Entry  │
└──────┬───────┘
       │ Valid Code + Email
       ▼
┌──────────────┐
│   Wizard     │◄─────────┐
│   Step 1     │          │
└──────┬───────┘          │
       │ Continue         │
       ▼                  │
┌──────────────┐          │
│   Wizard     │          │ Edit from
│   Step 2     │          │ Review
└──────┬───────┘          │
       │ Continue         │
       ▼                  │
┌──────────────┐          │
│   Wizard     │          │
│   Step 3     │          │
└──────┬───────┘          │
       │ Continue         │
       ▼                  │
┌──────────────┐          │
│   Wizard     │          │
│   Step 4     │          │
└──────┬───────┘          │
       │ Continue         │
       ▼                  │
┌──────────────┐          │
│   Wizard     │──────────┘
│   Step 5     │
│  (Review)    │
└──────┬───────┘
       │ Generate Toolkit
       ▼
┌──────────────┐
│ Celebration  │
│   Modal      │
└──────┬───────┘
       │ 3 seconds
       ▼
┌──────────────┐
│  Dashboard   │
└──────────────┘
```

## Store State Shape

```javascript
{
  // Brand Data
  brandData: {
    // Visuals
    logo: null | "data:image/png;base64,...",
    photo: null | "data:image/png;base64,...",
    colorPalette: {
      name: "Tim's Classic",
      primary: "#0B2545",
      accent: "#3ABAB4",
      secondary: "#D4AF37"
    },

    // Details
    fullName: "John Smith",
    credentials: "Certified Breathwork Instructor",
    businessName: "Breathe with John",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "john@example.com",
    website: "https://www.example.com",
    instagram: "johnbreathes",
    linkedin: "johnsmith",

    // Positioning
    targetAudience: ["corporate", "wellness"],
    uniquePositioning: "science",
    signatureTechnique: "Conscious Connected Breathing",
    oneLine: "Transform stress into strength...",

    // Services
    services: [
      {
        type: "one-on-one",
        label: "1:1 Sessions",
        price: "150"
      },
      {
        type: "group",
        label: "Group Classes",
        price: "50"
      }
    ]
  },

  // Wizard State
  wizardStep: 1,
  wizardCompleted: false,
  isSaved: false,
  isLoading: false,
  error: null
}
```

## Event Flow

### Step 1: Visuals
```
Upload Logo
  → handleFileUpload()
    → FileReader.readAsDataURL()
      → setLogoPreview()
        → updateField('logo', base64)
          → Store Updated

Select Color Palette
  → handlePaletteSelect()
    → updateColorPalette(palette)
      → Store Updated

Continue
  → handleSubmit()
    → onNext()
      → setCurrentStep(2)
```

### Step 2: Details
```
Fill Form
  → onChange events
    → React Hook Form state

Submit
  → handleSubmit(onSubmit)
    → Validate fields
      → setBrandData(data)
        → Store Updated
          → onNext()
            → setCurrentStep(3)
```

### Step 5: Review & Generate
```
Review Data
  → Edit Section
    → onEdit(stepNumber)
      → setCurrentStep(stepNumber)

Generate Toolkit
  → handleGenerate()
    → setIsGenerating(true)
      → Progress: 20%, 40%, 60%, 80%, 100%
        → onComplete()
          → saveBrandData(userId)
            → API Call
              → completeWizard()
                → setShowCelebration(true)
                  → Wait 3s
                    → navigate('/dashboard')
```

## Component Props

### BrandWizard
```typescript
// No props - uses router and stores
```

### Step Components
```typescript
interface StepProps {
  onNext: () => void;      // Navigate to next step
  onBack: () => void;      // Navigate to previous step (except Step 1)
}

interface Step5Props extends StepProps {
  onEdit: (step: number) => void;  // Jump to specific step
  onComplete: () => void;           // Complete wizard
}
```

## File Locations

All absolute paths for reference:

```
/home/yogi/tim-van-der-vliet/frontend/src/
├── pages/
│   └── BrandWizard.jsx
├── components/
│   └── wizard/
│       ├── Step1Visuals.jsx
│       ├── Step2Details.jsx
│       ├── Step3Positioning.jsx
│       ├── Step4Services.jsx
│       └── Step5Review.jsx
└── store/
    └── brandStore.js
```

## Integration Points

### With Auth System
```javascript
// Protected route in App.jsx
<Route
  path="/wizard"
  element={isAuthenticated ? <BrandWizard /> : <Navigate to="/enter-code" />}
/>
```

### With Dashboard
```javascript
// Redirect after completion
navigate('/dashboard');

// Dashboard checks completion
if (!wizardCompleted) {
  navigate('/wizard');
}
```

### With Toast System
```javascript
import { toast } from '../components/common/Toast';

toast.success('Brand data saved!');
toast.error('Failed to save');
```

## Animation Timing

```
Step Transition:        300ms (slide + fade)
Button Hover:           150ms (scale)
Progress Bar:           500ms (width)
Color Picker:           150ms (expand/collapse)
Celebration Modal:      500ms (scale + fade)
Confetti:              2000ms (fall + fade)
Auto Redirect:         3000ms (after celebration)
```

## Accessibility Tree

```
BrandWizard
├── <main> role="main"
│   ├── <h1> "Build Your Brand"
│   ├── <nav> role="navigation" aria-label="Wizard progress"
│   │   └── 5x <button> aria-label="Step X: Title"
│   ├── <form> (current step)
│   │   ├── <label> for="input-id"
│   │   ├── <input> id="input-id" aria-required
│   │   └── <button> type="submit"
│   └── <button> "Skip for now"
└── <div> role="dialog" aria-modal="true" (celebration)
```

This component map provides a complete visual overview of the Brand Wizard architecture!
