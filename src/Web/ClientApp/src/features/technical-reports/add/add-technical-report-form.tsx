import { Button, Input, Textarea, Title } from "rizzui";
import { useState } from "react";
export const AddTechnicalReportForm = () => {
  const [title, setTitle] = useState("");
  const [technicalName, setTechnicalName] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // collect data
    const data = {
      title,
      technicalName,
      date,
      content,
    };
    // send data to the server

    console.log("submit", data);
  };
  return (
    <div className="flex flex-col gap-6">
      <Title as="h3" className="text-red-dark h-full">
        {"اضافة تقرير فني"}
      </Title>

      <form
        className="flex flex-col font-cairo  items-start  rounded-lg shadow-lg bg-gray-50 p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3 items-start">
          <Input
            label={"عنوان التقرير"}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label={"اسم الفني"}
            onChange={(e) => setTechnicalName(e.target.value)}
          />
          <Input
            type="date"
            label={"التاريخ"}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* <Editor /> */}
        <Textarea
          onChange={(e) => setContent(e.target.value)}
          label="محتوى التقرير"
          className="w-[90%]"
          style={{ minHeight: "300px" }}
        />
        <Button className="mt-4" type="submit">
          {"اضافة تقرير فني"}
        </Button>
      </form>
    </div>
  );
};
