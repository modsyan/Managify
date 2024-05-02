// import { Input, Textarea, Title } from "rizzui";
// import dataJson from "../../data/lang.json";
// // import { useState } from "react";
// import useFormContext from "../../hooks/useFormContext";
// export const ContractorForm = () => {
//   const { handleChange, data } = useFormContext();
//   // const [value, setValue] = useState(String(data.fixed));

//   return (
//     <form className="grid grid-cols-2  bg-gray-50 p-3 rounded-md shadow-md gap-8 ring-[1px] ring-gray-200 co">
//       <Title as="h5" className="col-span-5 mt-5 text-red-dark">
//         بيانات المقاول
//       </Title>
//       <div className="grid grid-cols-2 grid-rows-2 gap-6">
//         <Input
//           type="text"
//           label={dataJson.ar.technical_name}
//           placeholder="محمد عبدالله"
//           className=""
//           id="technicalName"
//           value={data.technicalName}
//           onChange={handleChange}
//         />
//         <Input
//           type="text"
//           label={dataJson.ar.supervisor_name}
//           placeholder="محمد عبدالله"
//           className=""
//           id="supervisorName"
//           value={data.supervisorName}
//           onChange={handleChange}
//         />
//         <Input
//           type="date"
//           label={dataJson.ar.reporting_date}
//           onChange={handleChange}
//           value={data.contractorReportingDate}
//           id="contractorReportingDate"
//         />
//         <Input
//           type="text"
//           label={dataJson.ar.asset_name}
//           placeholder="المكيف"
//           className=""
//           id="assetName"
//           value={data.resourceAssetType}
//           onChange={handleChange}
//         />
//         <Textarea
//           label={dataJson.ar.notes}
//           placeholder={dataJson.ar.write_your_note_here}
//           className=" resize-none col-span-2 "
//           id="contractorNotes"
//           value={data.contractorNotes}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col justify-between gap-10">
//         {/* <RadioGroup
//           value={value}
//           setValue={setValue}
//           className="flex gap-4 col-span-5 my-3"
//           onSelect={(e) => {
//             handleChange(e);
//           }}
//         >
//           <Radio
//             label={dataJson.ar.not_fixed}
//             value={String(false)}
//             id="fixed"
//           />
//           <Radio label={dataJson.ar.fixed} value={String(true)} id="fixed" />
//         </RadioGroup> */}
//         <Textarea
//           id="cause"
//           label={dataJson.ar.not_repairing_causion_help}
//           placeholder={dataJson.ar.write_the_causion}
//           className="col-span-3 resize-none "
//           value={data.cause}
//           onChange={handleChange}
//         />
//       </div>
//     </form>
//   );
// };
