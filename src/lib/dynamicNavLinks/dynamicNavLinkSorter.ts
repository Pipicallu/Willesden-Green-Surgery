type storyBlokLinkProps = {
  id: number;
  uuid: string;
  slug: string;
  path: string | null;
  parent_id: number | null;
  name: string;
  is_folder: boolean;
  published: boolean;
  is_startpage: boolean;
  position: number;
  real_path: string;
};

export type sortedLinksProps = {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  parent_id: number | null;
  childLinks: sortedLinksProps[] | null;
};

const formatSlugToName = (slug: string) => {
  return slug
    .split("/")
    .slice(-1)[0]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function dynamicNavLinkSorter(
  links: Record<string, storyBlokLinkProps>,
) {
  const simpleLinks: sortedLinksProps[] = Object.values(links)
    .filter((link) => link.slug !== "home")
    .map((link) => {
      return {
        id: link.id,
        uuid: link.uuid,
        slug: link.slug,
        name: formatSlugToName(link.slug),
        parent_id: link.parent_id,
        childLinks: null,
      };
    });

  simpleLinks.forEach((currentLink) => {
    if (currentLink.parent_id) {
      const parentLink = simpleLinks.find(
        (l) => l.id === currentLink.parent_id,
      );
      if (parentLink) {
        if (parentLink.childLinks === null) {
          parentLink.childLinks = [];
        }
        parentLink.childLinks.push(currentLink);
      }
    }
  });

  return simpleLinks.filter((link) => !link.parent_id);
}
