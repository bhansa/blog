---
title: Drafting blog posts in Gatsby
date: "2020-09-21"
description: "In this blog post I will talk about a simple way of creating draft blog post in your gatsby site"
---

![image shows draft process by andrew neel](./andrew-neel-cckf4TsHAuw-unsplash.jpg)  
<span>Photo by <a href="https://unsplash.com/@andrewtneel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Andrew Neel</a> on <a href="https://unsplash.com/s/photos/draft?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

You have created your new blog and have many ideas for blog posts already. You probably will create a list of blog post titles or some drafts directly in your project so that you can work on them later.

While you were writing a blog post you got another title in your mind to write, You abandoned the current article and moved to write a new one.

Now let's say that you have finished one of them already and want to publish it, if you are using `gh-pages` and deploying using `npm run deploy`, assuming your package.json contains `"deploy": "gatsby build --prefix-paths && gh-pages -d public"`.

It may deploy the unfinished posts as well.

So what if You want to keep few posts hidden while they are still under process or development.

One simple way is to use the markdown **frontmatter**, you can add an extra key value pair in your markdown file.

Example:

```markdown
---
title: <title>
date: <date>
description: <desc>
draft: true
---
```

In the above example I added `draft: true` as an extra parameter and I will be using the same while **rendering the DOM**.

We can fetch the same parameter in our graphql syntax, with other details which are already there.

```javascript
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            draft // I'm here :)
          }
        }
      }
    }
  }
`
```

and use it in the render method where we are rendering a list of all blog posts.

```javascript
{
  posts.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    return (
      <article
        key={node.fields.slug}
        itemScope
        itemType="http://schema.org/Article"
        hidden={node.frontmatter.draft} // like this, using `draft` parameter here
      >
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link
              style={{ boxShadow: `none` }}
              to={node.fields.slug}
              itemProp="url"
            >
              <span itemProp="headline">{title}</span>
            </Link>
          </h3>
          <small>{node.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </article>
    )
  })
}
```

If you see, I have used **`hidden={node.frontmatter.draft}`** where **hidden** is a HTML element attribute.

Here I am only hiding the post from the all blogs list, you can choose to do other things as well, example: not rendering it completely.

That's it. Now if you want to work on posts and don't want to deploy them with other created posts, you can just put `draft: true` in your frontmatter and remove it once it is ready to go live 😃✨
