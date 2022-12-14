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
	Francais: 'fr',
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
	// translate en to fr
	es: {
		'Inicio Rápido': [
			{ text: 'Introducción', link: 'es/introduction' },
			{ text: 'Escribiendo JSX', link: 'es/page-2' },
			{ text: 'Componentes de React', link: 'es/page-3' },
			{ text: 'Pasando Props', link: 'es/page-4' },
		],
		'Agregar interactividad': [
			{ text: 'Ciclo de vida', link: 'es/page-5' },
			{ text: 'Manejo de eventos', link: 'es/page-6' },
		],
		'Manejando Estado': [{ text: 'Estado en JSX', link: 'es/page-7' }],
		'React Hooks': [{ text: 'Hooks JSX', link: 'es/page-8' }],
	},
	// translate en to fr 
	fr: {
		'Démarrage rapide': [
			{ text: 'Introduction', link: 'fr/introduction' },
			{ text: 'Écrire du JSX', link: 'fr/page-2' },
			{ text: 'Composants React', link: 'fr/page-3' },
			{ text: 'Passer des props', link: 'fr/page-4' },
		],
		'Ajouter de l\'interactivité': [
			{ text: 'Cycle de vie', link: 'fr/page-5' },
			{ text: 'Gestion des événements', link: 'fr/page-6' },
		],
		'Gérer l\'état': [{ text: 'État dans le JSX', link: 'fr/page-7' }],
		'React Hooks': [{ text: 'Hooks JSX', link: 'fr/page-8' }],
	},
};