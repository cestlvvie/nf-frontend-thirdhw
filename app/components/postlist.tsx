 'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { Post } from "../types/post";
import { Button } from "./button"
import { FilePenIcon } from "./redacticon"
import { Trash2Icon } from "./deleteicon"
import HeartIcon from "./hearticon";
import ViewIcon from "./viewicon";
import ThumbsDownIcon from "./dislikeicon";
import { useTheme } from '../context/ThemeContext';

const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("posts"); 
        setPosts(response.data.posts);
      } catch (err: any) {     
        if (err.response.status === 401) {
          router.push('/login');
        } else {
          setError("Failed to fetch posts");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handlePostClick = (postId: number) => {
    const route = `/posts/${postId}`;
    router.push(route);
  };

  return (
    <div>
        <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className={` rounded-lg p-4 md:p-6 cursor-pointer ${theme === 'dark' ? 'bg-[#1f2937] text-white' : 'bg-[#F5E0D8] text-[#333]'}`}  onClick={() => handlePostClick(post.id)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">User ID: {post.userId}</div>
                  <div className="text-[#666] text-sm">@user{post.userId}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button >
                  <FilePenIcon className="h-5 w-5" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button>
                  <Trash2Icon className="h-5 w-5" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <h2 className="font-semibold">{post.title}</h2>
            <p>{truncateText(post.body, 10)}</p>
            <div className="flex items-center gap-4 mt-4">
                    <HeartIcon className="w-4 h-4" />
                    <span className="sr-only">Likes</span>
                    <span className="ml-1">{post.reactions.likes}</span>
                    <ThumbsDownIcon className="w-4 h-4" />
                    <span className="sr-only">Dislikes</span>
                    <span className="ml-1">{post.reactions.dislikes}</span>
                    <ViewIcon className="w-4 h-4" />
                    <span className="sr-only">Views</span>
                    <span className="ml-1">{post.views}</span>
                   
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
