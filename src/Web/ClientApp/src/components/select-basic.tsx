import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export default function SelectBasic() {
  return (
    <Select defaultValue="dog">
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
    </Select>
  );
}
