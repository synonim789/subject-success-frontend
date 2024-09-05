import { Button } from 'react-aria-components';
import { useGetSubjectsQuery } from '../../app/api/subjectApiSlice';
import ModalComponent from '../../components/Modal';
import DeleteAllSubjectModalContent from './DeleteAllSubjectModalContent';
import Subjects from './Subjects';

const SubjectsPage = () => {
   const { data } = useGetSubjectsQuery();
   return (
      <div>
         <div className="mb-10 flex justify-end">
            <ModalComponent
               button={
                  <Button
                     aria-label="Delete all subjects"
                     className="rounded-lg bg-red-500 px-4 py-2 text-lg font-bold capitalize text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                     isDisabled={data?.length === 0}
                  >
                     Delete all subjects
                  </Button>
               }
            >
               <DeleteAllSubjectModalContent />
            </ModalComponent>
         </div>
         <Subjects />
      </div>
   );
};
export default SubjectsPage;
