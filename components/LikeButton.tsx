'use client';
import { toggleLikeMember } from '@/app/actions/likeActions';
import { useRouter } from 'next/navigation';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import React from 'react';
import { Member } from '@prisma/client';

type Props = {
  target: Member;
  hasLiked: boolean;
};

export default function LikeButton({ target, hasLiked }: Props) {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(target.userId, hasLiked);
    router.refresh();
  }

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-poinPter"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-0.5 -right-0.5"
      />
      <AiFillHeart
        size={24}
        className={hasLiked ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
}
