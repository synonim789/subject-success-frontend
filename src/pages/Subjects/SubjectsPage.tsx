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
               buttonChildren={<>Delete all subjects</>}
               buttonClassName="rounded-lg bg-red-500 px-4 py-2 text-lg font-bold capitalize text-white transition hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
               children={<DeleteAllSubjectModalContent />}
               label="Delete all subjects"
               disabled={data?.length === 0}
            />
         </div>
         <Subjects />
      </div>
   );
};
export default SubjectsPage;
