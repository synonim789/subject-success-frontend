import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOtp as setOtpDispatch } from '../../app/slices/userSlice';
import SubmitButton from '../../components/SubmitButton';

let currentOTPIndex: number = 0;

const OtpForm = () => {
   const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
   const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
   const inputRef = useRef<HTMLInputElement>(null);
   const [errMsg, setErrMsg] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const newOTP: string[] = [...otp];

      newOTP[currentOTPIndex] = value.substring(value.length - 1);

      if (!value) {
         setActiveOtpIndex(currentOTPIndex - 1);
      } else {
         setActiveOtpIndex(currentOTPIndex + 1);
      }

      setOtp(newOTP);
   };

   const handleOnKeyDown = (
      { key }: React.KeyboardEvent<HTMLInputElement>,
      index: number,
   ) => {
      currentOTPIndex = index;
      if (key === 'Backspace') {
         setActiveOtpIndex(currentOTPIndex - 1);
      }
   };

   const submitHandler = (e: SyntheticEvent) => {
      e.preventDefault();
      if (otp.some((num) => num === '')) {
         setErrMsg('Please fill in all OTP numbers.');
      } else {
         const otpNumber = parseInt(otp.join(''));
         dispatch(setOtpDispatch({ otp: otpNumber }));
         navigate('/reset-password');
      }
   };

   useEffect(() => {
      inputRef.current?.focus();
   }, [activeOtpIndex]);

   return (
      <form className="w-full" onSubmit={submitHandler}>
         <div className="my-5 flex w-full items-center justify-center gap-10">
            {otp.map((_, index) => {
               return (
                  <input
                     ref={index === activeOtpIndex ? inputRef : null}
                     type="number"
                     className="size-12 rounded  border-2 border-gray-400 text-center outline-none focus:border-gray-700"
                     onChange={handleOnChange}
                     key={index}
                     value={otp[index]}
                     onKeyDown={(e) => handleOnKeyDown(e, index)}
                  />
               );
            })}
         </div>
         {errMsg && (
            <p className="mb-1 text-left font-semibold text-red-500">
               {errMsg}
            </p>
         )}
         <SubmitButton text="Continue" disabled={false} />
      </form>
   );
};
export default OtpForm;
