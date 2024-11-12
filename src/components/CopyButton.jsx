import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';

const CopyButton = ({text, fontSize="text-xl"}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setIsDisabled(true);
    toast.success('Text copied successfully!');
    setTimeout(() => {
      setIsCopied(false);
      setIsDisabled(false);
    }, 5000);
  };

  return (
    <div>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <button disabled={isDisabled} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: isDisabled ? 'default' : 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
          {isCopied ? <LuCopyCheck/> : <i className={`bx bx-copy ${fontSize} py-1 px-2 font-medium bg-black text-white dark:bg-white dark:text-black dark:border-white hover:opacity-50 duration-300 rounded-md`} ></i>}
        </button>
      </CopyToClipboard>
      <ToastContainer />
    </div>
  );
};

export default CopyButton;
