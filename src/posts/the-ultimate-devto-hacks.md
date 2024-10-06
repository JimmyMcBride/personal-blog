---
title: "The Ultimate Dev.to Hacks To Skyrocket Your Blog's SEO & Traffic"
description: "This blog dives into how to boost your SEO rankings by leveraging canonical links, sitemaps, and Google Search Console when cross-posting content on platforms like Dev.to or Medium. We cover how to ensure your official blog gets indexed first, and the importance of using sitemaps to drive traffic back to your main site. Using a SvelteKit blog as an example, you’ll see a step-by-step guide on implementing a dynamic sitemap that keeps Google updated on new posts, helping to improve search engine visibility and grow your blog’s audience. Perfect for anyone looking to get the most out of their SEO strategy!"
date: "2024-10-4"
image: /the-ultimate-devto-hacks-banner.webp
categories:
  - seo
  - tutorial
published: true
---

SEO can be hard. Getting people to click and notice your original content can be soul-crushing in the beginning. For us techies, that's what makes a platform like Dev so great! It's a community of like-minded people there to read and support you along your journey. I started my journey blogging on Dev as a way to solidify what I was learning at a coding bootcamp. I was absolutely blown away by the amount of engagement I started to get. People were following me like crazy. I even remember the first time I won "Top 7 Most Popular Blog Of The Week"! I felt like I was on fire!

I remember thinking to myself that my dreams of creating valuable content that helps others out weren't as far off as I feared. So I started my own blog and began posting my Dev content there, but there was still so much I didn't know!

My aim with this blog is to help you understand how the system works, and leverage the tools in place to drive traffic to your official blog and ensure your actual blog shows up in search engines rather than your Dev post. Duplicate content can be penalized in SEO if you don't do it correctly, so I'm here to show you how to do things the right way and work with the Dev platform to get great SEO rankings, driving traffic to your official website. It almost feels like you're hacking Dev's domain authority and popularity for your own website, making competing for that front page and top spot so much easier when you're starting out.

I truly believe Dev can serve as a great tool when growing your audience in the tech space, so here's how I use Dev's platform to get traffic and SEO boosts!

#### **Canonical Links: Why You Need Them**

So, first up **canonical links**. If you're publishing the same content to your blog and platforms like **Dev.to** or **Medium**, then you'll need to let search engines know where the **official** version lives. That's what canonical links are for. They allow Google - and others - to understand which version of your blog is the "original" or "canonical" source.

That means if you do not have a canonical link, search engines may index the duplicate content on Dev.to or Medium, and they may think it is the original. You would be driving visitors away from your personal site to Dev.to, even though it's your blog content!

So here's how you'd add a canonical link to your **Dev.to** post, for instance:

![set canonical link on dev](/dev-canonical-link.webp "Set a cononical link on Dev.to")

Then on your offical blog, you can add a link in your header pointing to your site as the canonical link as well.

```html
<link rel="canonical" href="https://your-website.com/your-post-slug" />
```

This tells Google, **"Hey, this post lives officially on my blog, not on this platform."** In this way, the search engines will rank higher your personal blog when showing the results.

---

#### **Why Canonical Links Alone Aren't Enough**

Now, here is where things get interesting. **Canonical links alone don't always ensure that your blog shows up in search results first**--especially if Dev.to or Medium has been indexed more quickly because of the size and traffic of their platforms.

For example, if you publish to Dev.to and to your own blog simultaneously, search engines might index the Dev.to one first because **large platforms like Dev.to** are crawled more often. In that case, even when the canonical link is present, your blog could be outranked by your own Dev.to post!

This is where **sitemaps** and **Google Search Console** save your bacon.

---

#### **Sitemaps: Your Fast Pass for Indexing**

That's what sitemaps are for: it helps search engines understand the architecture of your website and index your content quicker. Think of it this way: you’re giving Google a clear roadmap to your content, pointing out exactly where each important piece is located—like marking all the key spots on a map—so it knows exactly where to return and crawl your site efficiently.

In SvelteKit, you can dynamically generate a sitemap to help search engines like Google keep up with your latest blog posts as they are published. Here’s the **sitemap.xml** implementation I use for my [SvelteKit blog](https://jimmymcbride.dev/blog/sveltekit-blog):

```typescript
import { url } from "$lib/config"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import type { RequestEvent } from "@sveltejs/kit"

export const GET = async ({ fetch }: RequestEvent) => {
	const response = await fetch("/api/posts")
	const posts: Post[] = await response.json()

	const links = posts.map((post: Post) => ({
		url: `/blog/${post.slug}`,
		changefreq: "weekly",
		priority: 0.8,
	}))

	const stream = new SitemapStream({ hostname: url })

	return new Response(
		await streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString()),
		{
			headers: {
				"Content-Type": "application/xml",
			},
		}
	)
}

export const prerender = true
```

This allows Google to be notified of new blog posts automatically as they are published, which can help boost your blog's SEO rankings. For those using other frameworks, you can adapt this approach to fit your needs. For Node.js users, the `sitemap` npm package is super handy for generating and managing your sitemaps.

Once your sitemap is ready, this needs to be submitted to **Google Search Console** so that Google knows exactly where to look for your content.

---

#### **Google Search Console: Your Control Center for Indexing**

And so brings us to **Google Search Console**. If you're serious about SEO, well, this tool is not optional.

Here's what you do:

1. **Submit Your Sitemap**: Navigate to [Google Search Console](https://search.google.com/search-console/about), click the **Sitemaps** section, and submit your sitemap URL - for example, `https://your-site.com/sitemap.xml`.

![google search console add sitemap](/gsc-sitemap.webp "Add a sitemap to Google Seach Console")

2. **Request Indexing**: Once you've submitted your sitemap, you can then go into Google Search Console and request indexing of your posts immediately without having to wait for Google to crawl your site. Within **URL Inspection Tool**, you put your blog URL and hit **Request Indexing**. That's you telling Google, **"Hey, I've got new content—check it out!"**

This will ensure that **your personal blog** gets indexed sooner and appears higher than your posts on Dev.to and Medium.

---

#### **The Full SEO Picture**

So, here's the recap: **Canonical links** help Google understand which blog is the "official" version, whereas **sitemaps** and **Google Search Console** ensure **your site** gets indexed and appears in search results **first**. If you don't do all three, then you will probably find your Dev.to or Medium posts outrank your blog.

It's a little extra effort, but it's worth it when you see that the traffic is going directly to **your site**-and not someone else's.

---

#### **Wrapping Up: SEO Done Right**

By now, if you have worked hard in creating and growing your tech blog, these tips will put you in full command of your SEO strategy. Keep in mind, though, that everything is about securing **your site** with much-deserved visibility in the search engines.

I'll be covering **backlink strategies** in an upcoming article, so if you're interested in learning more about boosting your blog's visibility, stay tuned!

Got thoughts, questions, or tips of your own? **Join us over in [The Developers Lounge](https://discord.gg/4PCy4Bz)** and let's chat about SEO, blogging, and everything tech!

Happy blogging!
