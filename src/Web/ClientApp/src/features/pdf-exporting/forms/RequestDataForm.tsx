// import Select from "react-select";
// import { useForm, Controller } from "react-hook-form";
// import { Checkbox, FormHelperText } from "@mui/material";
// import { useRepairRequestFormContext } from "../../repair-requests/hooks/useRepairRequestFormContext";
// import { yupResolver } from "@hookform/resolvers/yup";
// // import { requestDataSchema } from "./RequestDataForm/validation/request-data.schema";

// import * as yup from "yup";

// export const requestDataSchema = yup
//   .object({
//     reportingDate: yup.string().required(),
//     resourceAssetType: yup.string().required(),
//     resourceAsset: yup.string().required(), // Updated property name
//     facility: yup.string().required(),
//     level: yup.string().required(),
//     area: yup.string().required(),
//   })
//   .required();
// type FormData = yup.InferType<typeof requestDataSchema>;
// export const RequestDataForm = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(requestDataSchema),
//   });
//   const { updateFormData } = useRepairRequestFormContext();

//   const onSubmit = (data: FormData) => {
//     alert(JSON.stringify(data));
//     updateFormData(data);
//     console.log(data);
//   };
//   // GET ALL FACILITIES FROM API

//   // GET ALL LEVELS FROM API BASED ON FACILITY

//   // GET ALL AREAS FROM API BASED ON FACILITY AND LEVEL

//   // GET ALL RESOURCE ASSET TYPES FROM API BASED ON FACILITY, LEVEL AND AREA

//   // GET ALL RESOURCE ASSETS FROM API BASED ON FACILITY, LEVEL, AREA AND RESOURCE ASSET TYPE

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
//       {/* Add Input Date Type from material ui */}

//       <div>
//         <label>Facility</label>
//         <Controller
//           name="facility"
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 options={[
//                   { value: "facility1", label: "Facility 1" },
//                   { value: "facility2", label: "Facility 2" },
//                   { value: "facility3", label: "Facility 3" },
//                 ]}
//               />
//               {errors.facility && (
//                 <FormHelperText error>{errors.facility.message}</FormHelperText>
//               )}
//             </>
//           )}
//           control={control}
//           rules={{ required: "Facility is required" }}
//         />
//       </div>
//       <Controller
//         name="iceCreamType"
//         control={control}
//         render={({ field }) => (
//           <Select
//             {...field}
//             options={[
//               { value: "chocolate", label: "Chocolate" },
//               { value: "strawberry", label: "Strawberry" },
//               { value: "vanilla", label: "Vanilla" },
//             ]}
//           />
//         )}
//       />
//       <div>
//         <label>Level</label>
//         <Controller
//           name="level"
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 options={[
//                   {
//                     label: "Facility 1",
//                     options: ["level1"],
//                   },
//                 ]}
//               />
//               {errors.level && (
//                 <FormHelperText error>{errors.level.message}</FormHelperText>
//               )}
//             </>
//           )}
//           control={control}
//           rules={{ required: "Level is required" }}
//         />
//       </div>

//       <div>
//         <label>Area</label>
//         <Controller
//           name="area"
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 options={[
//                   { value: "area1", label: "Area 1" },
//                   { value: "area2", label: "Area 2" },
//                   { value: "area3", label: "Area 3" },
//                 ]}
//               />
//               {errors.area && (
//                 <FormHelperText error>{errors.area.message}</FormHelperText>
//               )}
//             </>
//           )}
//           control={control}
//           rules={{ required: "Area is required" }}
//         />
//       </div>

//       <div>
//         <label>Resource Asset Type</label>
//         <Controller
//           name="resourceAssetType"
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 options={[
//                   { value: "type1", label: "Type 1" },
//                   { value: "type2", label: "Type 2" },
//                   { value: "type3", label: "Type 3" },
//                 ]}
//               />
//               {errors.resourceAssetType && (
//                 <FormHelperText error>
//                   {errors.resourceAssetType.message}
//                 </FormHelperText>
//               )}
//             </>
//           )}
//           control={control}
//           rules={{ required: "Resource Asset Type is required" }}
//         />
//       </div>

//       <div>
//         <label>Resource Asset</label>
//         <Controller
//           name="resourceAsset"
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 options={[
//                   { value: "asset1", label: "Asset 1" },
//                   { value: "asset2", label: "Asset 2" },
//                   { value: "asset3", label: "Asset 3" },
//                 ]}
//               />
//               {errors.resourceAsset && (
//                 <FormHelperText error>
//                   {errors.resourceAsset.message}
//                 </FormHelperText>
//               )}
//             </>
//           )}
//           control={control}
//           rules={{ required: "Resource Asset is required" }}
//         />
//       </div>

//       <Controller
//         name="Checkbox"
//         control={control}
//         render={({ field }) => <Checkbox {...field} />}
//       />

//       <input type="submit" />
//     </form>
//   );
// };
