import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
    return (
        <div>
            <p className='text-sm'>{content}</p>

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='but-primary bg-red-500 hover:bg-red-600'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;