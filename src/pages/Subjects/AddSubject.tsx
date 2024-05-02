import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAddSubjectMutation } from '../../app/api/subjectApiSlice';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import SubmitButton from '../../components/SubmitButton';
import {
   AddSubjectFields,
   addSubjectSchema,
} from '../../types/addSubjectSchema';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const AddSubject = () => {
   const modalRef = useRef<HTMLDialogElement | null>(null);
   const [addSubject, { isLoading }] = useAddSubjectMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<AddSubjectFields>({
      resolver: zodResolver(addSubjectSchema),
      mode: 'onBlur',
   });

   const showModal = () => {
      modalRef.current?.showModal();
   };
   const closeModal = () => {
      modalRef.current?.close();
      reset();
   };

   const submitHandler: SubmitHandler<AddSubjectFields> = async (data) => {
      try {
         const { name, type } = data;
         await addSubject({
            name,
            type,
         }).unwrap();
         toast.success('Subject addess successsfully');
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   if (isLoading) {
      return <p>Loading...</p>;
   }

   return (
      <>
         <button
            className="flex h-[500px] min-w-[300px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-600 text-xl font-bold text-gray-600 transition hover:border-gray-300"
            onClick={showModal}
         >
            Add Subject +
         </button>

         <Modal close={closeModal} modalRef={modalRef}>
            <form onSubmit={handleSubmit(submitHandler)}>
               <div className="flex items-center gap-5">
                  <Input
                     register={{ ...register('name') }}
                     label="Name"
                     placeholder="Enter name of subject"
                     id="name"
                     name="name"
                     type="text"
                  />
                  <Select
                     register={{ ...register('type') }}
                     label="Type"
                     id="type"
                     name="type"
                     options={['completion', 'grade']}
                     error={errors.type}
                  />
               </div>

               <SubmitButton text="Add Subject" disabled={isSubmitting} />
            </form>
         </Modal>
      </>
   );
};
export default AddSubject;
