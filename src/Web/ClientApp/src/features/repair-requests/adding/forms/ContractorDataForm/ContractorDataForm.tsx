import { Button, Input } from "rizzui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRepairRequestFormContext } from "../../hooks/useRepairRequestFormContext";
import { routes } from "../../../routes";
export const ContractorDataForm: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { updateFormData, formData } = useRepairRequestFormContext();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    updateFormData(data);
    navigate(routes[window.location.pathname].next);
  };
  const onSubmitPrev = (data) => {
    updateFormData(data);
    navigate(routes[window.location.pathname].prev);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Contractor Notes"
        {...register("contractorNotes", {
          required: "Contractor Notes is required",
        })}
        defaultValue={formData.contractorNotes}
      />
      <Input
        label="Contractor Reporting Date"
        {...register("contractorReportingDate", {
          required: "Contractor Reporting Date is required",
        })}
        type="date"
        defaultValue={formData.contractorReportingDate}
      />
      <Button type="submit">Next</Button>
      <Button type="submit" onClick={onSubmitPrev}>
        Prev
      </Button>
    </form>
  );
};
