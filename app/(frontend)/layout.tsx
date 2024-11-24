import ScrollToTopButton from '@/components/navigation/ScrollToTopButton';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed bottom-0 right-0 m-8 z-50">
        <ScrollToTopButton />
      </div>
      {children}
    </>
  );
}
