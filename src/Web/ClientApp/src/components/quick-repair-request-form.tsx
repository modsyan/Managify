import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Input } from "rizzui";

export const QuickRepairRequestForm = () => {
  // extract area id from url
  const { areaId } = useParams<{ areaId: string }>();
  // fetch area data from api using axios and react-query localhost:5001/areas/:areaId
  const { data, isLoading, isError } = useQuery(["area", areaId], () =>
    axios(`http://localhost:5001/areas/${areaId}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
  console.log(data, isLoading, isError);

  return (
    <form>
      <Input value={data.name} disabled={true}></Input>
      <Input value={data.level.name} disabled={true}></Input>
      <Input value={data.facility.name} disabled={true}></Input>
    </form>
  );
};
