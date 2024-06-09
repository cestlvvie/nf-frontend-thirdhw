'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosInstance from '@/app/api/axiosInstance';
import { useEffect, useState } from 'react';
import { Button } from "../../components/button"
import { FilePenIcon } from "../../components/redacticon"
import { Trash2Icon } from "../../components/deleteicon"
import { Post } from '../../types/post';
import HeartIcon from '@/app/components/hearticon';
import ViewIcon from '@/app/components/viewicon';
import ThumbsDownIcon from '@/app/components/dislikeicon';

const PostDetail: React.FC<{ params: { slug: number } }> = ({ params: { slug } }) => {
  const router = useRouter();
  const id = slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`posts/${id}`); 
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <main className="flex-1  flex flex-col justify-between p-6 md:p-8 lg:p-10">
    <div className="flex-1 bg-[#F5E0D8] rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium">User ID: {post.userId}</div>
            <div className="text-[#666] text-sm">@user{post.userId}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <FilePenIcon className="h-5 w-5" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button>
            <Trash2Icon className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="prose prose-stone dark:prose-invert">
        <h1 className="text-xl mt-3 mb-4">- {post.title} -</h1>
        <p>
          {post.body}
        </p>
      </div>
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
    </div>
  </main>
  );
};

export default PostDetail;
