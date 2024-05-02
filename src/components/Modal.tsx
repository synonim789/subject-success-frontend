import { ReactNode, RefObject } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

type Props = {
   modalRef: RefObject<HTMLDialogElement>;
   children: ReactNode;
   close: () => void;
};

const Modal = ({ modalRef, children, close }: Props) => {
   return (
      <dialog
         ref={modalRef}
         className="z-[1000] w-full rounded-md bg-white p-6 shadow-lg sm:w-fit dark:bg-dark-900 dark:text-white/90"
      >
         <button
            className="absolute right-2 top-2"
            type="button"
            onClick={close}
            aria-label="Close Modal"
         >
            <MdOutlineCancel size={30} />
         </button>
         <div className="flex w-full items-center">{children}</div>
      </dialog>
   );
};
export default Modal;
