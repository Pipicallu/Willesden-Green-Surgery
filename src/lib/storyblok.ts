import { useStoryblokApi } from "@storyblok/astro";

export async function getStory(slug: string) {
  const storyblokApi = useStoryblokApi();

  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: import.meta.env.DEV ? "draft" : "published",
  });

  return data.story;
}
