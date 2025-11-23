import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Canvas Medical Documentation',
  tagline: 'Healthcare platform documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wjnterdongtran', // Usually your GitHub org/user name.
  projectName: 'medical-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Custom fields for Supabase configuration (accessed via useDocusaurusContext)
  customFields: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function sourceMapPlugin() {
      return {
        name: 'source-map-plugin',
        configureWebpack(config, isServer, utils) {
          // Only enable sourcemaps in development
          if (process.env.NODE_ENV === 'development') {
            return {
              devtool: 'eval-source-map',
            };
          }
          return {};
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/wjnterdongtran/medical-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Canvas Medical Docs',
      logo: {
        alt: 'Canvas Medical Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'workflowsSidebar',
          position: 'left',
          label: 'Workflows',
        },
        {
          type: 'docSidebar',
          sidebarId: 'canvasPlatformSidebar',
          position: 'left',
          label: 'Canvas Platform',
        },
        {
          type: 'docSidebar',
          sidebarId: 'fhirDataSidebar',
          position: 'left',
          label: 'FHIR & Data',
        },
        {
          type: 'docSidebar',
          sidebarId: 'technicalSidebar',
          position: 'left',
          label: 'Technical',
        },
        {
          type: 'docSidebar',
          sidebarId: 'regulatorySidebar',
          position: 'left',
          label: 'Regulatory',
        },
        { to: '/dictionary', label: 'Dictionary', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Workflows',
          items: [
            { label: 'Clinical', to: '/docs/workflows/clinical' },
            { label: 'Administration', to: '/docs/workflows/administration' },
            { label: 'Operations', to: '/docs/workflows/operations' },
          ],
        },
        {
          title: 'Canvas Platform',
          items: [
            { label: 'Architecture', to: '/docs/canvas-platform/architecture' },
            { label: 'Data Model', to: '/docs/canvas-platform/data-model' },
            { label: 'Configuration', to: '/docs/canvas-platform/configuration' },
            { label: 'UI/UX', to: '/docs/canvas-platform/ui-ux' },
          ],
        },
        {
          title: 'Technical',
          items: [
            { label: 'FHIR Resources', to: '/docs/fhir-data/fhir-resources' },
            { label: 'Plugins & API', to: '/docs/technical/plugins-api' },
            { label: 'Terminology', to: '/docs/fhir-data/terminology' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Canvas Medical. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
