The project follows a modular, scalable, and SEO-oriented architecture designed for high performance and easy maintenance.

gaoshouke-seo-engine/
│
├── public/                 # Static assets (images, icons, fonts, robots.txt, etc.)
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── tools/          # Individual tool implementations (each tool = isolated logic)
│   │   └── ui/             # Base UI components (buttons, cards, inputs, modals, etc.)
│
│   ├── hooks/              # Custom React hooks (shared logic like state, fetch, SEO, etc.)
│
│   ├── lib/                # Core utilities and helper functions
│   │   ├── data/           # Static datasets (tools, guides, calculators, comparisons)
│   │   └── utils/          # Formatting, validation, parsing, SEO helpers
│
│   ├── pages/              # Route-level pages (mapped to URLs)
│   │   ├── Home.tsx
│   │   ├── ToolPage.tsx
│   │   ├── CategoryPage.tsx
│   │   └── NotFound.tsx
│
│   ├── routes/             # Central routing configuration (React Router v6)
│
│   ├── registry/           # Tool registry system (maps tool IDs → components dynamically)
│
│   ├── seo/                # SEO logic (meta tags, schema markup, canonical URLs)
│
│   ├── App.tsx             # Root application layout + router wrapper
│   ├── main.tsx            # React entry point (app bootstrap)
│   └── index.css           # Global styles (Tailwind + custom CSS)
│
├── index.html              # Main HTML template (Vite entry)
├── package.json            # Dependencies + scripts
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
🧠 Architecture Overview

The project is designed with a programmatic SEO + tool-based architecture:

Each tool is treated as an independent module
Tools are registered inside a central registry system
Pages are generated dynamically based on dataset + routing rules
UI is fully component-based and reusable
SEO logic is separated into a dedicated layer for scalability
⚙️ Key Design Principles
Modularity → Every tool is isolated and reusable
Scalability → New tools can be added without modifying core logic
Performance-first → Client-side rendering with optimized Vite build
SEO-driven → Dynamic meta tags, structured data, and clean URLs
Maintainability → Clear separation between UI, logic, and data
