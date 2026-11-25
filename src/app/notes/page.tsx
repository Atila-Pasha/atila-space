import { getNotes } from '@/content/loaders';
export default async function NotesPage() { const notes = await getNotes(); return <main><h1>Notes page placeholder</h1><p>{notes.length} sample notes are available to the content layer.</p></main>; }
