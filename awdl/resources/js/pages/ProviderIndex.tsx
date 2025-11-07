import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';

export default function ProviderIndex() {
  const pageTitle = 'Providers: Ancient World Digital Library Collection - NYU Libraries';
  const { providersMap } = usePage().props as unknown as { providersMap: { nid: string; label: string }[] };
  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Browse by providers</h1>
        </header>
        <div>
          <ul>
            {providersMap.map(({ nid, label }) => (
              <li key={nid}>
                <a href={route('providers.show', nid)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </DefaultLayout>
  );
}
