import { getTranslations } from "next-intl/server";
import BlogPostPage from "@/app/components/BlogPostPage";

export default async function BlogDetailsWrapper({ params }) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const posts = [
    { id: 1, title: t("post1Title"), date: t("post1Date"), content: t("post1Content"), image: "/test2.jpg" },
    { id: 2, title: t("post2Title"), date: t("post2Date"), content: t("post2Content"), image: "/test4.jpg" },
    { id: 3, title: t("post3Title"), date: t("post3Date"), content: t("post3Content"), image: "/test1.jpg" },
  ];

  const post = posts[Number(id) - 1];

  return <BlogPostPage post={post} />;
}
