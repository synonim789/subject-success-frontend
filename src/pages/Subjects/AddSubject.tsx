import ModalComponent from '../../components/Modal';
import AddSubjectModalContent from './AddSubjectModalContent';

const AddSubject = () => {
   return (
      <>
         <ModalComponent
            buttonClassName="flex min-h-[500px] min-w-[300px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-600 text-xl font-bold text-gray-600 transition hover:border-gray-300"
            buttonChildren="Add Subject +"
            children={<AddSubjectModalContent />}
            label="add subject"
         />
      </>
   );
};
export default AddSubject;
