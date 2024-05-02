import { Divider } from "@mui/joy";
import { Input, Textarea, Title } from "rizzui";

export const FixOrder: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 p-6 border-2 border-gray-300 m-3 rounded-md">
      <div className="flex justify-between">
        <Title as="h3" className="text-red-dark ">
          تقرير طلب الإصلاح رقم ٢
        </Title>
        <img
          src="https://cdn.discordapp.com/attachments/1171845001391652998/1183454844539904070/logo-9470000000000.PNG?ex=65886536&is=6575f036&hm=90d15109640d335f4eac88d35bf4362cbbb53544220a60c0b1ec8f66e8500019&"
          alt=""
        />
      </div>

      <section className="px-3 py-4 flex  gap-4 bg-gray-50 rounded-m border-2 border-gray-300 rounded-md flex-col xl:flex-row">
        <Title
          as="h5"
          className="bg-gray-300 text-center rounded-lg flex justify-center items-center shadow-lg"
        >
          خاص بمبلغ الأعطال
        </Title>
        <form
          action=""
          className="grid grid-cols-2 gap-4  w-full xl:grid-cols-3"
        >
          <div>
            <Input label="الموقع" value={"السفارة السعودية - القنصلية"} />
            <Input label="المكتب" value={"مكتب السفير"} />
            <Input
              label="الوقت"
              // add date.now as default value
              value={"2021-01-01"}
              type="date"
            />
            <Input label="وقت الحضور المناسب" type="date" />
          </div>
          <div>
            <Input label="رقم المكتب" value={1} />
            <Input label="رقم الشقة" value={3} />
            <Input label="رقم الطابق" value={7} />
          </div>
          <div>
            <Input label="نوع العطل" value={"كهرباء"} />
            <Textarea label="وصف العطل" value={"كهرباء"} />
          </div>
        </form>
      </section>
      <Divider />
      <section className="px-3 py-4 flex gap-4 bg-gray-50 rounded-m border-2 border-gray-300 rounded-md">
        <Title
          as="h5"
          className="bg-gray-300 text-center rounded-lg flex justify-center items-center shadow-lg"
        >
          خاص بشركة الصيانة
        </Title>
        <form action="" className="grid grid-cols- gap-4 w-full">
          <Input
            label="حالة الطلب"
            value={"تم الإصلاح"}
            className="col-span-2"
          />
          <div className="">
            <Input label="اسم المشرف" value={"محمد"} />
            <Input label="اسم الفني" value={"علي"} />
          </div>
          <div className="">
            <Input label="الوقت" type="date" />
            <Input label="الوقت" type="date" />
          </div>
          <div>
            <Input label="التوقيع" value={""} />
            <Input label="التوقيع" value={""} />
          </div>
          <Textarea
            label="سبب عدم الإصلاح"
            value={"حاجات كتير"}
            className="col-span-4"
          />
          <Textarea label="ملاحظات" value={""} className="col-span-4" />
        </form>
      </section>

      {/* add this div only in print mode */}
      <div className="hidden h-[100px] print:block"></div>
      <Divider />

      <section className="px-3 py-4 flex  gap-4 bg-gray-50 rounded-m border-2 border-gray-300 rounded-md">
        <Title
          as="h5"
          className="bg-gray-300 text-center rounded-lg flex justify-center items-center shadow-lg px-6"
        >
          خاص بالموظف
        </Title>
        <form action="" className="grid grid-cols-4 gap-4 w-full">
          <div>
            <Input label="هل تم الإصلاح" value={"تم الإصلاح"} />
          </div>
          <div className="">
            <Input label="اسم الموظف" value={"خالد"} />
          </div>
          <div className="">
            <Input label="التوقيع" value={""} />
          </div>
          <div>
            <Input label="التاريخ" type="date" />
          </div>
          <Textarea
            label="ملاحظات"
            value={"حاجات كتير"}
            className="col-span-4"
          />
        </form>
      </section>
      <Divider />

      <section className="px-3 py-4 flex gap-4 border-2 bg-gray-50 rounded-m border-2 border-gray-300 rounded-md">
        <Title
          as="h5"
          className="bg-gray-300 text-center rounded-lg flex justify-center items-center shadow-lg"
        >
          خاص بمدير قسم الصيانة
        </Title>{" "}
        <form action="" className="grid grid-cols-3 gap-4 w-full">
          <div>
            <Input label="مدير قسم الصيانة المكلف" value={"خالد"} />
          </div>

          <Input label="التوقيع" />
          <div>
            <Input label="الوقت" type="date" />
          </div>
          <Textarea
            label="ملاحظات"
            value={"حاجات كتير"}
            className="col-span-4"
          />
        </form>
      </section>
      <Divider />

      <Textarea
        label="ملاحظات أخرى"
        className="font-black text-red-dark"
      ></Textarea>
    </div>
  );
};
