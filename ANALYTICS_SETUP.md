# Website Analytics Setup Guide

## Google Analytics 4 Setup

I've set up Google Analytics 4 tracking for your website. Here's what you need to do to complete the setup:

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard to create your account
4. Create a new property for your website (oceantoearth.life)
5. Choose "Web" as your platform

### Step 2: Get Your Measurement ID

1. In your Google Analytics property, go to **Admin** (gear icon)
2. Under "Property", click **Data Streams**
3. Click on your web stream
4. Copy the **Measurement ID** (it starts with "G-")

### Step 3: Update the Analytics Code

1. Open `js/analytics.js`
2. Replace all instances of `G-XXXXXXXXXX` with your actual Measurement ID
3. Save the file

### Step 4: Add Analytics to All Pages

The analytics script is currently only on the English home page. You'll need to add it to all your HTML pages:

Add this line in the `<head>` section of each HTML file, right before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script src="../js/analytics.js"></script>
```

**Pages that need the analytics script:**
- All pages in `/en/` directory
- All pages in `/fr/` directory  
- All pages in `/it/` directory
- All pages in `/de/` directory
- `index.html`
- `about.html`
- `blog.html`
- `contact.html`
- `social.html`
- `vision.html`

### Step 5: Test the Setup

1. Deploy your website
2. Visit your website
3. Go to Google Analytics → Reports → Realtime
4. You should see your visit in real-time

## What Analytics Tracks

The setup includes tracking for:

- **Page views** - Every page visit
- **Navigation clicks** - When users click menu links
- **Business card clicks** - Clicks on Veranaturae and Athelas Diving cards
- **Contact button clicks** - When users try to contact you
- **Language changes** - When users switch languages
- **Carousel interactions** - When users navigate through your intro carousel
- **Scroll depth** - How far users scroll on pages (25%, 50%, 75%, 100%)
- **Time on page** - How long users stay on each page

## Privacy Considerations

- No personal information is collected
- No login required for visitors
- Complies with GDPR (Google Analytics handles this)
- Users can opt-out via browser settings or ad blockers

## Alternative Analytics Options

If you prefer not to use Google Analytics, here are some privacy-focused alternatives:

### 1. Plausible Analytics
- Privacy-focused, GDPR compliant
- Simple dashboard
- No cookies or personal data collection
- Paid service ($9/month)

### 2. Simple Analytics
- Privacy-first analytics
- GDPR compliant
- Self-hosted option available
- Free tier available

### 3. Matomo (formerly Piwik)
- Open-source, self-hosted
- Full control over data
- Free to use
- Requires server setup

## Viewing Your Analytics

Once set up, you can view your analytics at:
- **Google Analytics**: https://analytics.google.com/
- **Real-time data**: Available immediately
- **Standard reports**: Available within 24-48 hours

## Key Metrics to Watch

- **Page views** - Total visits to your site
- **Unique visitors** - Number of different people visiting
- **Top pages** - Which pages are most popular
- **Traffic sources** - Where visitors come from (Google, social media, etc.)
- **Bounce rate** - Percentage of visitors who leave after one page
- **Average session duration** - How long people stay on your site

## Need Help?

If you need assistance setting up Google Analytics or have questions about the implementation, feel free to ask! 