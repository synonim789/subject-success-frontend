import AddSubjectModalContent from '../../components/AddSubjectModalContent';
import ModalComponent from '../../components/Modal';

const AddSubject = () => {
   return (
      <>
         <ModalComponent
            buttonClassName="flex h-[500px] min-w-[300px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-600 text-xl font-bold text-gray-600 transition hover:border-gray-300"
            buttonChildren="Add Subject +"
            children={<AddSubjectModalContent />}
         />
      </>
   );
};
export default AddSubject;
