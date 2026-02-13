import "../styles.css";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { reader } from "../reader";
import { markdocConfig } from "../../keystatic.config";

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const post = await reader.collections.posts.read(slug);

  if (!post) return <div>Post not found!</div>;

  const { node } = await post.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div>
      <h1>{post.title}</h1>
      {/* <img src="" alt="" /> */}
      {/* {Markdoc.renderers.react(renderable, React)} */}
      {Markdoc.renderers.react(renderable, React, {
        components: {
          // This overrides the default 'img' tag with Next.js Image component
          img: (props) => (
            <img
              {...props}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          ),
        },
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
