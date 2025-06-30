import React,{useState} from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX} from 'react-icons/lu';


const EmojiPickerPopup = ({icon, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (  
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div className='flex item-center gap-4 cursor-pointer '
      onClick={() => setIsOpen(true)}>
        <div className='w-12 h-12 flex item-center justify-center'>
          {icon ? (
            <img src={icon} alt='Icon' className=''/>
          ): (
            <LuImage/>
          )}
        </div>
        <p className=''>
          {icon ? "Change Icon": "Pick Icon"}
        </p>
      </div>
      {isOpen && (
        <div className='relative'>
          <button
          className='w-7 h-7 flex item-center justify-center bg-white border-gray-200 rounded-full absolute -top-2 -right-2 z-10 course-pointer'
          onClick={() => setIsOpen(false)}
          >
            <LuX/>
            <EmojiPicker
            open={isOpen}
            onEmojiClick={() => onSelect(emoji?.imageUrl || "")}/>
          </button>
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup