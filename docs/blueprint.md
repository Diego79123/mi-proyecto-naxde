# **App Name**: Naxde Digital Hub

## Core Features:

- Dynamic Content Management (CMS): Empower the Naxde team to manage all public-facing content (services, products, projects, FAQs, testimonials, blog posts) via a robust internal CMS interface powered by Firestore, ensuring updates without code.
- NFC Digital Card Conversion Landing: A dedicated, high-conversion landing page for 'Tarjetas Digitales NFC', featuring an interactive demo, detailed benefits, and a secure lead capture form to register interest or requests, integrated with a custom API route.
- Secure Lead & Contact Forms: Implement robust contact and card request forms with backend API routes, ensuring strict validation, sanitization (anti-XSS), rate limiting, and secure storage of lead data in Firestore, returning clear user feedback.
- Authenticated Admin Panel & Role Management: A protected administrative panel for content management, allowing secure access via Firebase Authentication with role-based access control (admin/editor) using Firebase custom claims and Firestore security rules.
- Optimized SEO & Server-Side Performance: Ensure optimal search engine visibility and rapid loading times by implementing server-side rendering for public pages and managing comprehensive metadata (title, description, OG, Schema.org) for all key content.
- Futuristic & Adaptive User Interface: Design and implement a responsive, dark-first, 'futuristic premium' user interface with controlled neon accents and subtle glassmorphism effects, featuring distinct desktop (Mega Menu) and mobile (Bottom Nav) navigation patterns.
- AI Content Suggestion Tool for Admins: Provide an AI-powered tool within the admin CMS to assist content creators by generating compelling marketing copy, headlines, or FAQs based on initial inputs, leveraging AI capabilities relevant to Naxde's services.

## Style Guidelines:

- Primary interactive color: Vibrant red-magenta (#F80037), embodying the energetic and bold calls to action required for conversion in a futuristic context.
- Background color: Deep nocturnal blue (#00001D), explicitly specified by the user, providing a dark-first, high-contrast canvas for the premium futuristic aesthetic.
- Secondary accent color: Electric violet (#5200F8), directly from the user's specified complementary color, offering dynamic visual contrast and reinforcing the technological theme.
- Glassmorphism overlays: Subtle white translucent layers (e.g., rgba(255,255,255,0.04) and rgba(255,255,255,0.07)) and soft white borders (rgba(255,255,255,0.10)) to achieve a layered, modern look.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy, and futuristic appeal that suits Naxde's innovative brand identity. Body text font: 'Inter' (sans-serif) for its clean, neutral, and highly readable qualities, suitable for comprehensive content sections.
- Utilize sleek, high-contrast outline icons that complement the futuristic 'neón controlado' aesthetic and ensure clarity in both desktop Mega Menus and mobile Bottom Navigation.
- Desktop layout features an elegant header with a prominent mega menu that opens fullscreen, offering detailed navigation. Mobile layout employs a compact header combined with a fixed, app-style bottom navigation bar, prioritizing key actions.
- Implement subtle, smooth transitions and micro-interactions, especially for glassmorphism effects, navigation elements, and CTAs, enhancing the premium and dynamic feel without being intrusive or 'estrídemte'.