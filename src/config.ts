// site name and description
export const SITE = {
	title: 'Class Capstone',
	description: 'Simplified React Concepts Learned In Class.',
	defaultLanguage: 'en_US',
};

// Github repo edit link
export const GITHUB_EDIT_URL = `https://github.com/ZeekBeakCreek/class-astro/blob/patch`;

export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

// multi-language support maybe?
export const KNOWN_LANGUAGES = {
	English: 'en',
	Español: 'es',
} as const;

export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

// search for components in the docs **not quite working yet**
export const ALGOLIA = {
	indexName: 'astro-class-index',
	appId: 'S0GBVBX8ZA',
	apiKey: 'c5545df156185e00b9b802e2f89e2380',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Quick Start': [
			{ text: 'Introduction', link: 'en/introduction' },
			{ text: 'Writing JSX', link: 'en/page-2' },
			{ text: 'React Components', link: 'en/page-3' },
			{ text: 'Passing Props', link: 'en/page-4' },
		],
		'Adding Interactivity': [
			{ text: 'Lifecycle', link: 'en/page-5' },
			{ text: 'Event Handling', link: 'en/page-6' },
		],
		'Managing State': [{ text: 'State in JSX', link: 'en/page-7' }],
		'React Hooks': [{ text: 'JSX Hooks', link: 'en/page-8' }],
	},
	es: {
		'Encabezado de sección': [
			{ text: 'Introducción', link: 'es/introduction' },
			{ text: 'Página 2', link: 'es/page-2' },
			{ text: 'Página 3', link: 'es/page-3' },
		],
		'Otra sección': [{ text: 'Página 4', link: 'es/page-4' }],
	},
};
