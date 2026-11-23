import ItemLayout from '@/layouts/ItemLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';
import Viewer, { type ViewerEvents } from '@/components/Viewer';

const itemEvents: ViewerEvents = {
  // page changes
  'viewer:sequence:change': (message) => {
    window.history.pushState({}, '', `${(message as { sequence: number }).sequence}`);
  },
  // multivolume change
  'change:option:multivolume': (message) => {
    const option = message as string;
    // Check if message contains a bookid and not default message:"/1?lang=en"
    if (option.length > 10) {
      const newPid = option.slice(14, -10);
      // Stay on the current route prefix (/books or /viewer)
      const prefix = window.location.pathname.split('/')[1];
      window.location.href = `${window.location.origin}/${prefix}/${newPid}/1`;
    }
  },
};

export default function ItemPage() {
  const { title, url } = usePage().props as unknown as { title: string; url: string };

  return (
    <ItemLayout>
      <Meta title={title as string} />
      <Viewer title={title} url={url} events={itemEvents} />
    </ItemLayout>
  );
}
