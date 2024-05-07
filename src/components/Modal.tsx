import { ReactNode } from 'react';
import {
   Button,
   Dialog,
   DialogTrigger,
   Modal,
   ModalOverlay,
} from 'react-aria-components';
import { MdOutlineCancel } from 'react-icons/md';

type Props = {
   buttonClassName: string;
   buttonChildren: string | ReactNode;
   children: ReactNode;
};

const ModalComponent = ({
   buttonChildren,
   buttonClassName,
   children,
}: Props) => {
   return (
      <DialogTrigger>
         <Button className={buttonClassName}>{buttonChildren}</Button>
         <ModalOverlay className="fixed left-0 top-0 isolate z-20 flex h-full w-full items-center justify-center bg-black/15 p-4 text-center backdrop-blur-lg">
            <Modal>
               <Dialog className="relative w-full rounded-md bg-white p-6 shadow-lg  dark:bg-dark-900 dark:text-white/90">
                  {({ close }) => (
                     <>
                        <button
                           className="absolute right-2 top-2"
                           type="button"
                           onClick={close}
                           aria-label="Close Modal"
                        >
                           <MdOutlineCancel size={30} />
                        </button>
                        <div className="flex w-full items-center">
                           {children}
                        </div>
                     </>
                  )}
               </Dialog>
            </Modal>
         </ModalOverlay>
      </DialogTrigger>
   );
};
export default ModalComponent;
