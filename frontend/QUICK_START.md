# TT Breathwork Toolkit - Frontend Quick Start Guide

## Installation

```bash
cd /home/yogi/tim-van-der-vliet/frontend
npm install
```

## Required Dependencies

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "prop-types": "^15.8.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

## Environment Setup

Create `/home/yogi/tim-van-der-vliet/frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000/api
```

## Run Development Server

```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

## File Structure Created

```
frontend/src/
├── main.jsx                          # Entry point
├── App.jsx                           # Root component with routing
├── index.css                         # Global styles
│
├── styles/
│   └── tim-theme.css                 # Complete brand design system
│
├── utils/
│   └── api.js                        # Axios instance & API methods
│
├── store/
│   ├── authStore.js                  # Authentication state
│   ├── brandStore.js                 # Brand data state
│   └── assetStore.js                 # Assets state
│
├── components/
│   ├── common/
│   │   ├── Button.jsx                # Button component
│   │   ├── Input.jsx                 # Input component
│   │   ├── Modal.jsx                 # Modal component
│   │   ├── Loader.jsx                # Loading spinners
│   │   └── Toast.jsx                 # Toast notifications
│   │
│   └── layout/
│       ├── Header.jsx                # App header
│       └── Footer.jsx                # App footer
│
└── pages/
    ├── Landing.jsx                   # Landing page
    └── CodeEntry.jsx                 # Code entry page
```

## Component Usage Examples

### Using the Button Component

```jsx
import Button from './components/common/Button';
import { Download } from 'lucide-react';

function MyComponent() {
  return (
    <Button
      variant="primary"        // primary | secondary | outline | ghost | danger
      size="lg"               // sm | md | lg
      loading={false}
      leftIcon={<Download size={20} />}
      onClick={handleClick}
    >
      Download
    </Button>
  );
}
```

### Using the Input Component

```jsx
import Input from './components/common/Input';
import { Mail } from 'lucide-react';

function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <Input
      label="Email Address"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={error}
      leftIcon={<Mail size={20} />}
      required
    />
  );
}
```

### Using the Modal Component

```jsx
import { useState } from 'react';
import Modal from './components/common/Modal';
import Button from './components/common/Button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"                    // sm | md | lg | xl | full
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Using Toast Notifications

```jsx
import { toast } from './components/common/Toast';

function MyComponent() {
  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Data saved successfully!');
    } catch (error) {
      toast.error('Failed to save data');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### Using Auth Store

```jsx
import { useAuthStore } from './store/authStore';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    validateCode
  } = useAuthStore();

  const handleLogin = async () => {
    const result = await login('user@example.com');
    if (result.success) {
      console.log('Logged in:', result.user);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.email}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
}
```

### Using Brand Store

```jsx
import { useBrandStore } from './store/brandStore';

function BrandForm() {
  const {
    brandData,
    updateField,
    saveBrandData,
    wizardStep,
    nextWizardStep
  } = useBrandStore();

  const handleSave = async () => {
    const result = await saveBrandData(userId);
    if (result.success) {
      toast.success('Brand saved!');
      nextWizardStep();
    }
  };

  return (
    <div>
      <Input
        label="Business Name"
        value={brandData.businessName}
        onChange={(e) => updateField('businessName', e.target.value)}
      />
      <Button onClick={handleSave}>Save & Continue</Button>
    </div>
  );
}
```

### Using Asset Store

```jsx
import { useAssetStore } from './store/assetStore';

function AssetList() {
  const {
    assets,
    loadAssets,
    generateAsset,
    downloadAsset
  } = useAssetStore();

  useEffect(() => {
    loadAssets(userId);
  }, []);

  const handleGenerate = async () => {
    const result = await generateAsset('onePager', userId, {});
    if (result.success) {
      toast.success('Asset generated!');
    }
  };

  const handleDownload = async (assetId) => {
    const result = await downloadAsset(assetId);
    if (result.success) {
      toast.success('Downloaded!');
    }
  };

  return (
    <div>
      <Button onClick={handleGenerate}>Generate Asset</Button>
      {assets.map(asset => (
        <div key={asset.id}>
          <p>{asset.fileName}</p>
          <Button onClick={() => handleDownload(asset.id)}>
            Download
          </Button>
        </div>
      ))}
    </div>
  );
}
```

## Available Routes

Current routes in App.jsx:

- `/` - Landing page
- `/enter-code` - Code entry and account creation

Protected routes (ready to uncomment when pages are built):
- `/wizard` - Brand wizard (5 steps)
- `/dashboard` - Main dashboard with asset tabs
- `/editor/:templateId` - Template editor
- `/launch-plan` - 90-day launch plan

## Tim's Brand Colors

Use these Tailwind classes for consistent branding:

```jsx
// Navy
<div className="bg-tt-navy-dark">     // #0B2545
<div className="bg-tt-navy">          // #13315C
<div className="bg-tt-navy-light">    // #1E4976

// Teal
<div className="bg-tt-teal">          // #3ABAB4
<div className="bg-tt-teal-light">    // #5DD5CF

// Gold
<div className="bg-tt-gold">          // #D4AF37
<div className="bg-tt-gold-light">    // #E5C862

// Text colors
<p className="text-tt-navy-dark">
<p className="text-tt-teal">
<p className="text-tt-gold">
```

## Typography Classes

```jsx
// Headings (Playfair Display)
<h1 className="font-heading">

// Body (Inter)
<p className="font-body">

// Text sizes
className="text-xs"      // 12px
className="text-sm"      // 14px
className="text-base"    // 16px
className="text-lg"      // 18px
className="text-xl"      // 20px
className="text-2xl"     // 24px
className="text-3xl"     // 30px
className="text-4xl"     // 36px
```

## Animation Classes

```jsx
// Fade in
<div className="animate-fade-in">

// Slide up
<div className="animate-slide-up">

// Scale in
<div className="animate-scale-in">

// Gradient text
<h1 className="text-gradient">
```

## Common Patterns

### Protected Route Component

```jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/enter-code" replace />;
  }

  return children;
}
```

### Loading State

```jsx
import Loader from './components/common/Loader';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loader fullScreen message="Loading..." />;
  }

  return <div>Content</div>;
}
```

### Error Handling

```jsx
const handleAction = async () => {
  try {
    const result = await someAsyncAction();
    if (result.success) {
      toast.success('Action completed!');
    } else {
      toast.error(result.error || 'Action failed');
    }
  } catch (error) {
    toast.error('Unexpected error occurred');
    console.error(error);
  }
};
```

## API Integration

All API calls are centralized in `utils/api.js`:

```jsx
import { authAPI, brandAPI, assetAPI } from './utils/api';

// Validate code
const response = await authAPI.validateCode('TT-2025-ABC123');

// Save brand data
const response = await brandAPI.save(userId, brandData);

// Generate asset
const response = await assetAPI.generate('onePager', userId, {});
```

## Build for Production

```bash
npm run build
```

Output will be in `frontend/dist/`

## Testing

```bash
# Run dev server and test in browser
npm run dev

# Test different screen sizes
# - Mobile: 375px, 414px
# - Tablet: 768px, 1024px
# - Desktop: 1280px, 1920px
```

## Browser DevTools Tips

1. **React DevTools**: Install extension to inspect component tree
2. **Network Tab**: Monitor API calls and responses
3. **Console**: Check for errors and debug logs
4. **Responsive Mode**: Test mobile layouts

## Common Issues & Solutions

### Issue: Tailwind classes not working
**Solution**: Make sure `index.css` imports are in correct order:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: API calls failing
**Solution**: Check `.env` file has correct `VITE_API_URL`

### Issue: Store state not persisting
**Solution**: Check browser localStorage for `tt-auth-storage` and `tt-brand-storage`

### Issue: Icons not showing
**Solution**: Make sure `lucide-react` is installed: `npm install lucide-react`

### Issue: Animations not working
**Solution**: Check `framer-motion` is installed: `npm install framer-motion`

## Next Development Steps

1. **Build Brand Wizard** (5 steps)
   - Create wizard page components
   - Implement step navigation
   - Add form validation
   - Connect to brand store

2. **Build Dashboard**
   - Create asset cards
   - Implement tab navigation
   - Add download functionality
   - Show progress indicators

3. **Build Template Editor**
   - Implement live preview
   - Add editing controls
   - Integrate Fabric.js for images
   - Connect to asset generation

4. **Build Launch Plan**
   - Create week cards
   - Add progress tracking
   - Implement confetti celebrations
   - Connect to launch plan API

## Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Framer Motion Docs**: https://www.framer.com/motion/
- **React Router Docs**: https://reactrouter.com/
- **Zustand Docs**: https://zustand-demo.pmnd.rs/
- **Lucide Icons**: https://lucide.dev/icons/

## Support

For questions or issues:
- Check `FRONTEND_IMPLEMENTATION.md` for detailed documentation
- Review `SPECKIT.md` for project specifications
- Inspect component PropTypes for usage details
- Check browser console for error messages

---

**Built with care for TT Breathwork instructors** 🌬️
