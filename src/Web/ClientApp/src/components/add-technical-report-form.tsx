// import { Button, Input, Textarea, Title } from "rizzui";
// import data from "../data/lang.json";
// import { FormEventHandler } from "react";
// export const AddTechnicalReportForm: React.FC<{
//   handleSubmit: FormEventHandler<HTMLFormElement>;
// }> = ({ handleSubmit }) => {
//   return (
//     <form
//       className="flex flex-col font-cairo  text-black items-start p-4 bg-gray-100 ml-5 mx-3 rounded-lg shadow-lg my-2"
//       onSubmit={handleSubmit}
//     >
//       <Title as="h4" className="mt-4">
//         {data.ar.technical_reports_create}
//       </Title>
//       <div className="flex gap-3 items-start my-6">
//         <Input
//           label={"عنوان التقرير"}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <Input
//           label={"اسم الفني"}
//           onChange={(e) => setTechnicalName(e.target.value)}
//         />
//         <Input
//           type="date"
//           label={"التاريخ"}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>
//       {/* <Editor /> */}
//       <Textarea
//         onChange={(e) => setContent(e.target.value)}
//         label="محتوى التقرير"
//         className="w-[90%]"
//         style={{ minHeight: "300px" }}
//       />
//       <Button className="mt-4" type="submit">
//         {data.ar.technical_reports_create}
//       </Button>
//     </form>
//   );
// };
