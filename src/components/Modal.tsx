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
         className="w-full rounded-md bg-white p-6 shadow-lg sm:max-w-[350px] dark:bg-dark-900 dark:text-white/90"
      >
         <button
            className="absolute right-2 top-2"
            type="button"
            onClick={close}
         >
            <MdOutlineCancel size={30} />
         </button>
         <div className="flex w-full items-center">{children}</div>
      </dialog>
   );
};
export default Modal;
