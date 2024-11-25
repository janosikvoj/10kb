export function handleLandingPageNav(
  router,
  pathname,
  currentParams,
  newParams
) {
  const params = new URLSearchParams(currentParams);

  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
}
