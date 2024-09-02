import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const MentionBox = ({ avatarSrc, fallbackText, title, date, link, tags }) => {
  return (
    <div className='pt-6 pl-6 pb-6'>
      <div className='flex'>
        <Avatar>
          <AvatarImage src={avatarSrc} alt='Avatar' />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
        <div className='ml-4'>
          <div className='flex'>
            <div className='font-semibold text-gray-500 text-lg'>{title}</div>
            <div className='ml-4 text-gray-600'>{date}</div>
          </div>
          <a className="text-green-600 no-underline" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      </div>
      <div className='mt-2'>{tags}</div>
    </div>
  );
};

export { MentionBox };
