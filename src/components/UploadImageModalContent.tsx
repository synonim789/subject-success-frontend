import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import toast from 'react-hot-toast';
import { useUpdateProfilePictureMutation } from '../app/api/userApiSlice';
import getCroppedImg from '../utils/cropImage';

const UploadImageModalContent = () => {
   const [updateProfilePicture, { isLoading }] =
      useUpdateProfilePictureMutation();

   const [photo, setPhoto] = useState<{ url: string; file: File } | null>(null);
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [openCrop, setOpenCrop] = useState(false);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
      null,
   );

   const completeCrop = (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
   };

   const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files[0];
         setPhoto({ url: URL.createObjectURL(file), file: file });
         setOpenCrop(true);
      }
   };

   const handleCropImage = async () => {
      try {
         if (photo?.url && croppedAreaPixels) {
            const croppedImg = await getCroppedImg(
               photo.url,
               croppedAreaPixels,
            );
            if (croppedImg) {
               const file = new File([croppedImg?.file], `${photo.file.name}`, {
                  type: photo.file.type,
               });
               const formData = new FormData();
               formData.append('image', file);
               const data = await updateProfilePicture(formData).unwrap();
               toast.success(data.message);
               setOpenCrop(false);
               setPhoto(null);
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {openCrop ? (
            <section className="flex h-fit w-full flex-col gap-5">
               <h2 className="my-3">Crop Image</h2>
               <section className="relative  aspect-square w-full overflow-hidden rounded-lg">
                  <Cropper
                     image={photo?.url}
                     crop={crop}
                     zoom={zoom}
                     onZoomChange={setZoom}
                     onCropChange={setCrop}
                     onCropComplete={completeCrop}
                     aspect={1 / 1}
                  />
               </section>
               <div>
                  <label
                     htmlFor="zoomRange"
                     className="mb-0.5 mt-2 block text-sm font-medium"
                  >
                     Zoom: {`${Math.round(zoom * 100)}%`}
                  </label>
                  <input
                     type="range"
                     id="zoomRange"
                     min={1}
                     max={3}
                     step={0.1}
                     value={zoom}
                     onChange={(e) => setZoom(parseFloat(e.target.value))}
                     className="w-full"
                  />
               </div>
               <button
                  className="w-full rounded-lg bg-green-house-500 py-2 text-center text-lg font-semibold uppercase text-white transition hover:bg-green-house-600 disabled:cursor-not-allowed disabled:bg-green-300"
                  type="button"
                  onClick={handleCropImage}
                  disabled={isLoading}
               >
                  Crop & Upload
               </button>
            </section>
         ) : (
            <label className=" px-5">
               <span className="sr-only">Choose profile photo</span>
               <input
                  type="file"
                  className="file block w-full text-slate-500 file:mr-2 file:cursor-pointer file:rounded-md file:border-none file:bg-green-house-500 file:px-5 file:py-2 file:uppercase file:text-white file:transition file:hover:bg-green-house-600"
                  accept="image/*"
                  onChange={onFileChange}
               />
            </label>
         )}
      </>
   );
};
export default UploadImageModalContent;
