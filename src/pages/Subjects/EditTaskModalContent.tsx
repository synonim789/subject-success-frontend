import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

const EditTaskModalContent = () => {
   const { close } = useContext(ModalContext)!;

   

   return <div>EditTaskModalContent</div>;
};
export default EditTaskModalContent;
