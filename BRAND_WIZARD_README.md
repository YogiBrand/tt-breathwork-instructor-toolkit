# Brand Wizard - Complete Implementation

## Overview

The Brand Wizard is a 5-step guided onboarding experience for TT Breathwork Instructors to build their complete marketing toolkit. It collects brand information, validates input, and generates personalized marketing assets.

## Files Created

### Main Wizard Page
- **Location**: `/home/yogi/tim-van-der-vliet/frontend/src/pages/BrandWizard.jsx`
- **Purpose**: Main wizard container that orchestrates the 5-step flow
- **Features**:
  - Progress indicator with visual step navigation
  - Step state management with Zustand store
  - Forward/backward navigation
  - Skip option for quick testing
  - Celebration modal on completion
  - Automatic redirect to dashboard
  - Confetti animation on success
  - Integration with brandStore for data persistence

### Step Components

#### 1. Step1Visuals.jsx
**Location**: `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step1Visuals.jsx`

**Features**:
- Logo upload with drag & drop support
- Professional photo upload with drag & drop
- Image preview before upload
- File validation (image types only)
- Remove uploaded images option
- 3 preset color palettes:
  - **Tim's Classic**: Professional navy, teal, gold
  - **Calm Professional**: Serene blues and grays
  - **Warm Wellness**: Earthy comfort tones
- Custom color picker with hex input
- Real-time color preview
- Visual selection feedback
- Responsive grid layout

**Validation**:
- Image file type validation
- Visual feedback on drag state
- Preview before confirmation

#### 2. Step2Details.jsx
**Location**: `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step2Details.jsx`

**Features**:
- Full name input (required)
- Credentials/certifications (optional)
- Business name (optional)
- Location (required)
- Phone number (optional)
- Email address (required)
- Website URL (optional)
- Instagram username (optional)
- LinkedIn profile (optional)
- Real-time form validation with React Hook Form
- Error messages for invalid inputs
- Icon-enhanced inputs

**Validation**:
- Required field validation
- Email format validation
- Phone number format validation
- URL format validation
- Character length limits
- Real-time error feedback

#### 3. Step3Positioning.jsx
**Location**: `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step3Positioning.jsx`

**Features**:
- Multi-select target audience:
  - Corporate Professionals
  - Athletes
  - Wellness Seekers
  - Trauma Recovery
  - Yoga Community
  - Medical Patients
  - Performers & Artists
  - General Public
- Unique positioning selector:
  - Science-Based Approach
  - Spiritual & Holistic
  - Performance Focused
  - Trauma-Informed
  - Accessible & Practical
  - Transformational Journey
- Signature technique name input
- One-line description builder
- Example descriptions for inspiration
- Visual selection feedback
- Multi-select checkboxes

**Validation**:
- At least one target audience required
- Unique positioning required
- One-line description required (max 150 chars)
- Signature technique optional (max 50 chars)

#### 4. Step4Services.jsx
**Location**: `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step4Services.jsx`

**Features**:
- Service type selection:
  - 1:1 Sessions
  - Group Classes
  - Corporate Workshops
  - Retreats
  - Online Sessions
- Pricing input for each service
- Location-based pricing suggestions:
  - High: Major Metro (1.3x multiplier)
  - Medium: Mid-size City (1.0x multiplier)
  - Low: Small Town/Rural (0.7x multiplier)
- Suggested rate ranges per service type
- Optional pricing (can leave blank)
- Auto-detect location from Step 2
- Pricing tips and guidance
- Expandable pricing inputs
- Icon-enhanced service cards

**Validation**:
- At least one service type required
- Numeric pricing validation
- Optional pricing fields

#### 5. Step5Review.jsx
**Location**: `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step5Review.jsx`

**Features**:
- Complete brand data preview
- Edit buttons for each section
- Jump back to any step
- Visual identity preview:
  - Logo display
  - Photo display
  - Color palette preview
- Contact details summary
- Positioning summary with badges
- Services list with pricing
- "Generate My Toolkit" button
- Progress animation during generation:
  - 20%: Analyzing brand data
  - 40%: Generating color scheme
  - 60%: Creating templates
  - 80%: Personalizing content
  - 100%: Finalizing toolkit
- Animated progress bar
- Success celebration

## State Management

### Zustand Store Integration
The wizard uses `useBrandStore` from `/home/yogi/tim-van-der-vliet/frontend/src/store/brandStore.js`

**Key State Variables**:
- `brandData`: Object containing all brand information
- `wizardStep`: Current step number (1-5)
- `wizardCompleted`: Boolean flag for completion status
- `isSaved`: Boolean flag for save status
- `isLoading`: Loading state for async operations
- `error`: Error message if any

**Key Actions**:
- `setBrandData(data)`: Update brand data
- `updateField(field, value)`: Update single field
- `updateColorPalette(palette)`: Update colors
- `addService(service)`: Add service
- `removeService(index)`: Remove service
- `setWizardStep(step)`: Set current step
- `nextWizardStep()`: Go to next step
- `prevWizardStep()`: Go to previous step
- `completeWizard()`: Mark as completed
- `saveBrandData(userId)`: Save to backend
- `resetBrandData()`: Reset all data

## User Flow

1. **Code Entry** → User enters access code
2. **Account Creation** → User creates account with email
3. **Wizard Start** → Redirected to `/wizard`
4. **Step 1: Visuals** → Upload logo, photo, choose colors
5. **Step 2: Details** → Enter contact information
6. **Step 3: Positioning** → Define target audience & uniqueness
7. **Step 4: Services** → Select services & set pricing
8. **Step 5: Review** → Review all data, generate toolkit
9. **Celebration** → Success animation with confetti
10. **Dashboard** → Redirected to `/dashboard` with assets

## Design System

### Colors Used
- **Primary**: `#0B2545` (Navy Dark)
- **Accent**: `#3ABAB4` (Teal)
- **Secondary**: `#D4AF37` (Gold)
- **Grey**: `#9CA3AF`
- **Success**: `#10B981`
- **Error**: `#EF4444`
- **Warning**: `#F59E0B`

### Typography
- **Heading Font**: Playfair Display (serif)
- **Body Font**: Inter (sans-serif)

### Animations
- **Framer Motion** for step transitions
- **Slide transitions** between steps
- **Scale animations** on buttons
- **Confetti** on completion
- **Progress bar** animation
- **Spinner** during generation

## Mobile Responsiveness

All wizard steps are fully responsive:
- **Mobile**: Single column layout, stacked inputs
- **Tablet**: 2-column grid where appropriate
- **Desktop**: 3-column grid for selections

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

## Form Validation

### React Hook Form
Used in Steps 2, 3, and 4 for:
- Real-time validation
- Error message display
- Form state management
- Submit handling

### Validation Rules
- **Email**: RFC 5322 compliant
- **Phone**: International format support
- **URL**: HTTP/HTTPS validation
- **Text Length**: Character limits
- **Required Fields**: Clear indication

## Error Handling

- Form validation errors displayed inline
- Toast notifications for save errors
- Network error handling
- Fallback states for missing data
- Loading states during async operations

## Accessibility

- Semantic HTML elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management between steps
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Form field labels
- Error announcements

## Performance Optimizations

- Image upload with preview (no backend until final save)
- Debounced color picker updates
- Lazy loading of step components
- Optimized re-renders with React.memo
- Efficient state updates
- Minimal bundle size with code splitting

## Integration Points

### Backend API
- `brandAPI.save(userId, brandData)`: Save brand data
- `brandAPI.get(userId)`: Load existing data

### Navigation
- Protected route requiring authentication
- Automatic redirect after completion
- Back button support (with confirmation)
- Skip option for testing

### Toast Notifications
- Success messages
- Error messages
- Info messages
- Warning messages

## Testing Considerations

### Manual Testing Checklist
- [ ] Upload logo and photo
- [ ] Select each color palette
- [ ] Use custom color picker
- [ ] Fill all required fields
- [ ] Test form validation errors
- [ ] Select multiple target audiences
- [ ] Choose unique positioning
- [ ] Add all service types
- [ ] Set pricing for services
- [ ] Review all data in Step 5
- [ ] Edit from review screen
- [ ] Complete wizard
- [ ] Verify celebration modal
- [ ] Check redirect to dashboard
- [ ] Verify data persistence

### Edge Cases
- Very long names/descriptions
- Special characters in inputs
- Large image files
- Missing optional fields
- Network failures during save
- Browser back button
- Page refresh during wizard
- Multiple browser tabs

## Future Enhancements

### Potential Additions
1. **Save & Resume**: Auto-save progress
2. **Template Preview**: Preview assets before generation
3. **Social Sharing**: Share brand on social media
4. **Import Data**: Import from existing website/LinkedIn
5. **AI Suggestions**: AI-powered positioning suggestions
6. **Image Cropping**: Built-in image editor
7. **Bulk Upload**: Multiple images at once
8. **Video Upload**: Add video introduction
9. **Brand Guidelines**: Auto-generated brand book
10. **A/B Testing**: Test different color schemes

## Deployment Notes

### Environment Variables
None required for wizard functionality. Uses existing:
- `VITE_API_URL`: Backend API endpoint

### Build Commands
```bash
cd frontend
npm install
npm run build
```

### Production Considerations
- Image optimization before upload
- CDN for uploaded assets
- Rate limiting on save endpoint
- Data validation on backend
- GDPR compliance for data storage
- Backup strategy for brand data

## File Paths Reference

All files use absolute paths as required:

### Pages
- `/home/yogi/tim-van-der-vliet/frontend/src/pages/BrandWizard.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/pages/Dashboard.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/pages/CodeEntry.jsx`

### Wizard Components
- `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step1Visuals.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step2Details.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step3Positioning.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step4Services.jsx`
- `/home/yogi/tim-van-der-vliet/frontend/src/components/wizard/Step5Review.jsx`

### Store
- `/home/yogi/tim-van-der-vliet/frontend/src/store/brandStore.js`

### App Configuration
- `/home/yogi/tim-van-der-vliet/frontend/src/App.jsx`

## Code Snippets

### Using the Wizard in Your Component
```jsx
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  const startWizard = () => {
    navigate('/wizard');
  };

  return <button onClick={startWizard}>Start Brand Wizard</button>;
};
```

### Accessing Brand Data
```jsx
import { useBrandStore } from './store/brandStore';

const YourComponent = () => {
  const { brandData, wizardCompleted } = useBrandStore();

  if (!wizardCompleted) {
    return <p>Please complete the wizard first</p>;
  }

  return (
    <div>
      <h1>Welcome, {brandData.fullName}!</h1>
      <p>{brandData.oneLine}</p>
    </div>
  );
};
```

### Updating Brand Data
```jsx
import { useBrandStore } from './store/brandStore';

const YourComponent = () => {
  const { updateField, saveBrandData } = useBrandStore();
  const { user } = useAuthStore();

  const updateEmail = async (newEmail) => {
    updateField('email', newEmail);
    await saveBrandData(user.id);
  };

  return <input onChange={(e) => updateEmail(e.target.value)} />;
};
```

## Support

For issues or questions:
1. Check console for error messages
2. Verify network tab for API calls
3. Check Zustand devtools for state
4. Review validation error messages
5. Test in different browsers

## License

Part of the TT Breathwork Instructor Toolkit.
