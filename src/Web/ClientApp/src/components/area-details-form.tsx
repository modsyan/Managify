// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Level } from "../types";
// import { Button, Dropdown, DropdownItem, Input } from "rizzui";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import cn from "../utils/class-names";

// export const AreaDetailsForm: React.FC<{ className?: string }> = ({
//   className,
// }) => {
//   const [levels, setLevels] = useState<Level[]>();
//   const [levelNames, setLevelNames] = useState<string[]>();
//   const [levelExists, _setLevelExists] = useState<boolean>(false);
//   const [areaExist, _setAreaExist] = useState<boolean>(false);
//   const [categoryExist, setCategoryExist] = useState<boolean>(false);
//   const [assetExist, setAssetExist] = useState<boolean>(false);
//   // get all levels from this endpoint
//   useEffect(() => {
//     axios
//       .get<Level[]>("http://localhost:5001/levels")
//       .then((response) => {
//         setLevels(response.data);
//         setLevelNames(response.data.map((level) => level.name));
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   const getAreaNames = (level: string): string[] => {
//     const levelObj = levels?.find((l) => l.name === level);
//     return levelObj?.areas.map((area) => area.name) || [];
//   };
//   const getCategories = (area: string): string[] => {
//     const areaObj = levels
//       ?.find((level) => level.name === selectedLevel)
//       ?.areas.find((a) => a.name === area);
//     return areaObj?.resourceAssetTypes.map((category) => category.name) || [];
//   };
//   const getAssets = (category: string): string[] => {
//     const categoryObj = levels
//       ?.find((level) => level.name === selectedLevel)
//       ?.areas.find((a) => a.name === selectedArea)
//       ?.resourceAssetTypes.find((c) => c.name === category);
//     return categoryObj?.resourceAssets.map((asset) => asset.name) || [];
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("submit");
//   };
//   return (
//     <form onSubmit={handleSubmit} className={cn(className, " w-full gap-4  ")}>
//       {levelExists && (
//         <ItemsDropDown
//           items={levelNames || []}
//           label="الطابق"
//           onSelect={() => {}}
//         />
//       )}
//       {!levelExists && <Input label="اسم الطابق" />}
//       <Input label="اسم المنطقة" />
//       <Input label="اسم الفئة" />
//       <Input label="اسم القطعة" />
//       {/* <Checkbox
//         label={"الطابق موجود"}
//         onChange={() => {
//           setLevelExists(!levelExists);
//         }}
//       /> */}

//       {/* <Checkbox
//         label={"المنطقة موجودة"}
//         onChange={() => {
//           setAreaExist(!areaExist);
//         }}
//       />
//       <Checkbox
//         label={"الفئة موجودة"}
//         onChange={() => {
//           setCategoryExist(!categoryExist);
//         }}
//       />
//       <Checkbox
//         label={"الممتلكات موجودة"}
//         onChange={() => {
//           setAssetExist(!assetExist);
//         }}
//       /> */}
//       {(!levelExists || !areaExist || !categoryExist || !assetExist) && (
//         <Button type="submit">إضافة</Button>
//       )}
//     </form>
//   );
// };

// const ItemsDropDown: React.FC<{
//   items: string[];
//   label: string;
//   onSelect: (item: string | null) => void;
// }> = ({ items, label, onSelect }) => {
//   const [selectedItem, setSelectedItem] = useState<string | null>(null);

//   const handleItemClick = (item: string) => {
//     console.log(item);
//     setSelectedItem(item);
//     onSelect(item);
//   };

//   return (
//     <div>
//       <label
//         className="rizzui-input-label block text-sm mb-1.5"
//         htmlFor={label}
//       >
//         {label}
//       </label>
//       <Dropdown
//         trigger={
//           <Button variant="outline" className="w-full">
//             {selectedItem || "اختر من هنا"}{" "}
//             <ChevronDownIcon className="ml-2 w-5" />
//           </Button>
//         }
//         className={"self-end"}
//         dropdownClassName="w-48 mt-4"
//       >
//         <div className="flex gap-3 items-center flex-col">
//           {items.map((item, index) => (
//             <div
//               onClick={() => handleItemClick(item)}
//               key={index}
//               className="w-full"
//             >
//               <DropdownItem
//                 className="px-5 py-2"
//                 activeClassName="bg-gray-100"
//                 key={index}
//               >
//                 {({ active }) => (
//                   <span
//                     className={cn("text-gray-600", active && "!text-gray-900")}
//                   >
//                     {item}
//                   </span>
//                 )}
//               </DropdownItem>
//             </div>
//           ))}
//         </div>
//       </Dropdown>
//     </div>
//   );
// };
