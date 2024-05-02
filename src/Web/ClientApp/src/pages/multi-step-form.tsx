// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// type FormData = {
//   step1Data: {
//     employeeName: string;
//     employeeDate: string;
//   };
//   step2Data: {
//     employeeNotes: string;
//     satisfied: boolean;
//   };
// };

// const MultiStepForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<FormData>({ mode: "all" });

//   const onSubmit: SubmitHandler<FormData> = (formData) => {
//     console.log(formData); // Handle form submission here
//   };

//   const currentStep = watch("currentStep", 1);

//   const nextStep = () => {
//     setValue("currentStep", currentStep + 1);
//   };

//   const previousStep = () => {
//     setValue("currentStep", currentStep - 1);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {currentStep === 1 && (
//         <div>
//           <h2>Step 1</h2>
//           <input
//             type="text"
//             {...register("step1Data.employeeName", { required: true })}
//             placeholder="Employee Name"
//           />
//           {errors.step1Data?.employeeName && (
//             <span>Employee name is required</span>
//           )}
//           <input
//             type="date"
//             {...register("step1Data.employeeDate", { required: true })}
//             placeholder="Employee Date"
//           />
//           {errors.step1Data?.employeeDate && (
//             <span>Employee date is required</span>
//           )}
//           <button type="button" onClick={nextStep}>
//             Next
//           </button>
//         </div>
//       )}

//       {currentStep === 2 && (
//         <div>
//           <h2>Step 2</h2>
//           <textarea
//             {...register("step2Data.employeeNotes", { required: true })}
//             placeholder="Employee Notes"
//           />
//           {errors.step2Data?.employeeNotes && (
//             <span>Employee notes are required</span>
//           )}
//           <input
//             type="checkbox"
//             {...register("step2Data.satisfied", { required: true })}
//           />
//           <label htmlFor="satisfied">Satisfied</label>
//           {errors.step2Data?.satisfied && <span>Satisfaction is required</span>}
//           <button type="button" onClick={previousStep}>
//             Previous
//           </button>
//           <button type="submit">Submit</button>
//         </div>
//       )}

//       {/* <input type="hidden" {...register("currentStep", { value: 1 })} /> */}
//     </form>
//   );
// };

// export default MultiStepForm;
