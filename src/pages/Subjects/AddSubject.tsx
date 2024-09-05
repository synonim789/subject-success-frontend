import { Button } from 'react-aria-components';
import ModalComponent from '../../components/Modal';
import AddSubjectModalContent from './AddSubjectModalContent';

const AddSubject = () => {
   return (
      <>
         <ModalComponent
            button={
               <Button
                  className="flex min-h-[500px] min-w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-600 text-xl font-bold text-gray-600 transition hover:border-gray-300"
                  aria-label="add subject"
               >
                  Add Subject +
               </Button>
            }
         >
            <AddSubjectModalContent />
         </ModalComponent>
      </>
   );
};
export default AddSubject;
