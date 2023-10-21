"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FcClock } from "react-icons/fc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { toast } from "react-toastify";
import Toast from "./Toast";

const BlogCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.blog);
    navigator.clipboard.writeText(post.blog);
    toast.success("Copied", {
      theme: "light",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  // to get human readable timestamp
  function formatDateWithTime(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = formattedDate.getDate();
    const hours = formattedDate.getHours();
    let minutes = formattedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    // Convert hours from 24-hour format to 12-hour format
    const displayHours = hours % 12 || 12;
    // Ensure minutes are displayed with leading zero if less than 10
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${year}/${month}/${day} , ${displayHours}:${minutes} ${ampm}`;
  }

  function timeAgo(timestamp) {
    const currentTime = Date.now();
    const createdAtTime = new Date(timestamp).getTime();
    const timeDifference = currentTime - createdAtTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (days === 1) {
      return "1 day ago";
    } else {
      // For a timestamp older than 1 day, show the time and date in a specific format
      const formattedDate = formatDateWithTime(timestamp);
      return `${formattedDate}`;
    }
  }

  return (
    <>
      <Toast />
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Tippy
              content={copied === post.blog ? "Copied" : "Copy"}
              animation="fade"
            >
              <Image
                src={
                  copied === post.blog
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt={copied === post.blog ? "tick_icon" : "copy_icon"}
                width={12}
                height={12}
              />
            </Tippy>
          </div>
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">{post.blog}</p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}

        <hr className="my-4" />

        <div className="flex gap-2 items-center">
          {/* <Image
          src="/assets/icons/clock.gif"
          alt="time"
          width={20}
          height={15}
        /> */}
          <FcClock />
          <div>
            <p className="font-inter text-xs text-gray-500">
              <span className="font-inter text-xs text-gray-500 me-2">
                {timeAgo(post.createdAt) === timeAgo(post.updatedAt)
                  ? "Posted"
                  : "Updated"}
              </span>
              {timeAgo(post.createdAt) === timeAgo(post.updatedAt)
                ? timeAgo(post.createdAt)
                : timeAgo(post.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
