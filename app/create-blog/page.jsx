"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import withAuth from "@utils/withAuth";

import Form from "@components/Form";
import PageNotFound from "@components/404";
const CreateBlog = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    blog: "",
    tag: "",
  });

  const createBlog = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/blog/new", {
        method: "POST",
        body: JSON.stringify({
          blog: post.blog,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!session ? (
        <div className="mt-10">
          <PageNotFound />
        </div>
      ) : (
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createBlog}
        />
      )}
    </>
  );
};

export default CreateBlog;
