import React,{useState} from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX} from 'react-icons/lu';


const EmojiPickerPopup = ({icon, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiData) => {
    onSelect(emojiData.imageUrl);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>

      <div className='flex items-center gap-4 cursor-pointer '
        onClick={() => setIsOpen(true)}>
        <div className='w-12 h-12 flex items-center justify-center'>
          {icon ? (
            <img src={icon} alt='Icon' className='w-6 h-6 object-contain'/>
          ) : (
            <LuImage size={24} className="text-gray-500"/>
          )}
        </div>
        <p className='text-gray-700 text-sm'>
          {icon ? "Change Icon": "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className='absolute z-20 mt-2'>
          <button
            type="button"
            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 right-0 z-30 cursor-pointer shadow-md hover:bg-gray-100'
            onClick={() => setIsOpen(false)}
            aria-label="Close emoji picker"
          >
            <LuX size={16}/>
          </button>

          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            height={350}
            width={300}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup;