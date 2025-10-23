# Brand Wizard - Quick Start Guide

## What Was Built

A complete 5-step Brand Wizard that collects:
1. **Visual Identity**: Logo, photo, color palette
2. **Contact Details**: Name, credentials, location, social media
3. **Positioning**: Target audience, unique approach, one-liner
4. **Services**: Service types and pricing
5. **Review**: Preview and generate toolkit

## File Structure

```
frontend/src/
├── pages/
│   └── BrandWizard.jsx              # Main wizard container
├── components/
│   └── wizard/
│       ├── Step1Visuals.jsx         # Logo, photo, colors
│       ├── Step2Details.jsx         # Contact information
│       ├── Step3Positioning.jsx     # Audience & positioning
│       ├── Step4Services.jsx        # Services & pricing
│       └── Step5Review.jsx          # Review & generate
└── store/
    └── brandStore.js                # Already exists
```

## How to Test

### 1. Start the Development Server
```bash
cd /home/yogi/tim-van-der-vliet/frontend
npm run dev
```

### 2. Navigate to the Wizard
1. Go to `http://localhost:5173`
2. Click "Enter Code" in header
3. Enter a valid code (format: `TT-2025-XXXXXX`)
4. Create account with email
5. You'll be redirected to `/wizard`

### 3. Complete Each Step

**Step 1: Visuals**
- Drag & drop a logo image (optional)
- Drag & drop a professional photo (optional)
- Select a color palette (Tim's Classic is default)
- Or customize colors with the color picker
- Click "Continue"

**Step 2: Details**
- Enter full name (required)
- Add credentials like "Certified Breathwork Instructor" (optional)
- Add business name if different (optional)
- Enter location like "San Francisco, CA" (required)
- Add phone number (optional)
- Enter email address (required)
- Add website URL (optional)
- Add Instagram username without @ (optional)
- Add LinkedIn username (optional)
- Click "Continue"

**Step 3: Positioning**
- Select at least one target audience
- Choose your unique positioning approach
- Add signature technique name (optional)
- Write a compelling one-line description (required)
- Click "Continue"

**Step 4: Services**
- Select service types you offer
- For each selected service, optionally add pricing
- Location-based pricing suggestions are shown
- Click "Continue"

**Step 5: Review**
- Review all your brand information
- Click "Edit" on any section to go back
- Click "Generate My Toolkit" when ready
- Watch the progress animation
- Celebrate! 🎉

### 4. After Completion
- Celebration modal appears with confetti
- Automatic redirect to Dashboard
- All your data is saved in Zustand store
- Brand data persists in localStorage

## Key Features

### Progressive Disclosure
- Only one step visible at a time
- Clear progress indicator
- Can go back to edit previous steps
- Can skip the wizard for testing

### Validation
- Real-time form validation
- Required field indicators
- Error messages below fields
- Can't proceed without required data

### Visual Feedback
- Hover effects on all buttons
- Selected state for options
- Loading spinners during async operations
- Toast notifications for success/error

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Works on all screen sizes

### Animations
- Smooth step transitions
- Button hover animations
- Progress bar animation
- Confetti on success
- Loading spinners

## State Management

### Data Flow
```
User Input → React Hook Form → Zustand Store → LocalStorage
                                      ↓
                                  Backend API
                                      ↓
                                  Dashboard
```

### Store Actions
```javascript
import { useBrandStore } from './store/brandStore';

// In your component
const {
  brandData,          // Current brand data
  wizardStep,         // Current step (1-5)
  wizardCompleted,    // Boolean: is wizard done?
  updateField,        // Update single field
  setBrandData,       // Update multiple fields
  setWizardStep,      // Jump to specific step
  completeWizard,     // Mark as complete
  saveBrandData,      // Save to backend
} = useBrandStore();
```

## Common Tasks

### Jump to a Specific Step
```javascript
const { setWizardStep } = useBrandStore();
setWizardStep(3); // Jump to step 3
```

### Get Current Brand Data
```javascript
const { brandData } = useBrandStore();
console.log(brandData.fullName);
console.log(brandData.colorPalette);
console.log(brandData.services);
```

### Reset the Wizard
```javascript
const { resetBrandData } = useBrandStore();
resetBrandData(); // Clears all data and resets to step 1
```

### Check Completion Status
```javascript
const { wizardCompleted } = useBrandStore();
if (wizardCompleted) {
  // Show dashboard
} else {
  // Redirect to wizard
}
```

## Customization

### Change Color Palettes
Edit `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step1Visuals.jsx`:
```javascript
const COLOR_PALETTES = [
  {
    name: "Your Custom Palette",
    description: "Your description",
    primary: '#XXXXXX',
    accent: '#XXXXXX',
    secondary: '#XXXXXX',
  },
  // Add more palettes...
];
```

### Add Target Audience Options
Edit `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step3Positioning.jsx`:
```javascript
const TARGET_AUDIENCES = [
  {
    id: 'new-audience',
    label: 'New Audience Type',
    description: 'Description of this audience'
  },
  // Add more audiences...
];
```

### Modify Service Types
Edit `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step4Services.jsx`:
```javascript
const SERVICE_TYPES = [
  {
    id: 'new-service',
    label: 'New Service',
    icon: YourIcon,
    description: 'Service description',
    suggestedRate: { min: 100, max: 200 },
  },
  // Add more services...
];
```

## Troubleshooting

### Wizard Not Loading
- Check browser console for errors
- Verify authentication state
- Check if route is protected
- Ensure Zustand store is initialized

### Data Not Saving
- Check network tab for API calls
- Verify backend is running
- Check authentication token
- Look for error toasts

### Images Not Uploading
- Check file size (< 5MB recommended)
- Verify file type is image/*
- Check browser console for errors
- Test drag & drop vs file picker

### Navigation Issues
- Clear localStorage and test fresh
- Check wizardStep state in devtools
- Verify navigation logic in BrandWizard.jsx
- Test browser back button behavior

## Development Tips

### Use React DevTools
- Install React DevTools extension
- Inspect component state
- Track prop changes
- Monitor re-renders

### Use Zustand DevTools
- Install Redux DevTools extension
- Monitor store state changes
- Time-travel debugging
- Inspect actions

### Enable Source Maps
Already configured in Vite for development.

### Hot Module Replacement
Vite automatically reloads on file changes.

## Production Checklist

Before deploying:
- [ ] Test all wizard steps
- [ ] Verify form validation
- [ ] Test image upload with large files
- [ ] Check mobile responsiveness
- [ ] Test with slow network (throttle)
- [ ] Verify data persistence
- [ ] Test browser back button
- [ ] Check accessibility
- [ ] Verify all required fields
- [ ] Test completion flow
- [ ] Check dashboard redirect
- [ ] Verify API integration
- [ ] Test error handling
- [ ] Check console for warnings
- [ ] Verify analytics events (if added)

## Next Steps

After the wizard is working:
1. Build the asset generation backend
2. Create template editor
3. Add download functionality
4. Build 90-day launch plan
5. Add analytics tracking
6. Implement A/B testing
7. Add more templates
8. Create admin dashboard
9. Add user management
10. Implement payment system (if needed)

## Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **React Hook Form**: https://react-hook-form.com/
- **Zustand Docs**: https://zustand-demo.pmnd.rs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/

## Support

If you encounter issues:
1. Check the console for errors
2. Review the BRAND_WIZARD_README.md
3. Test in incognito mode
4. Clear localStorage and try again
5. Check network requests in DevTools

## Credits

Built for TT Breathwork Instructor Toolkit by the Frontend React Agent.
