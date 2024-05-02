import React, { useReducer } from "react";
import { Form, SelectField } from "../../../../../components/form";
import { z } from "zod";
import { Button } from "../../../../../components/elements";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../actions/updateAction";
import { useFacilities } from "../../hooks/useFacilities";
enum ERROR_MESSAGES {
  FACILITY_REQUIRED = "المنشأة مطلوبة",
  AREA_REQUIRED = "المنطقة مطلوبة",
  LEVEL_REQUIRED = "المستوى مطلوب",
  RESOURCE_ASSET_TYPE_REQUIRED = "نوع الموارد مطلوب",
  RESOURCE_ASSET_REQUIRED = "الموارد مطلوبة",
}
type RequestDataFormValues = {
  facility: string;
  level: string;
  area: string;
  resourceAssetType: string;
  resourceAsset: string;
};

type RequestDataFormProps = {
  onSuccess: () => void;
};

// Generate schema using zod
const requestDataSchema = z.object({
  facility: z.string().min(1, { message: ERROR_MESSAGES.FACILITY_REQUIRED }),
  level: z.string().min(1, { message: ERROR_MESSAGES.LEVEL_REQUIRED }),
  area: z.string().min(1, { message: ERROR_MESSAGES.AREA_REQUIRED }),
  resourceAssetType: z
    .string()
    .min(1, { message: ERROR_MESSAGES.RESOURCE_ASSET_TYPE_REQUIRED }),
  resourceAsset: z
    .string()
    .min(1, { message: ERROR_MESSAGES.RESOURCE_ASSET_REQUIRED }),
});

export const RequestDataForm: React.FC<RequestDataFormProps> = ({
  onSuccess,
}) => {
  const { actions, state } = useStateMachine({ updateAction });
  const { data: facilities, isLoading, isError } = useFacilities();
  console.log(state);

  if (isLoading) return <span>loading</span>;
  if (isError || !facilities) return <span>error</span>;
  // using reducer here to store the selected facility id

  return (
    <Form<RequestDataFormValues, typeof requestDataSchema>
      onSubmit={async (data) => {
        actions.updateAction(data);
        console.log("data: ", data);

        onSuccess();
      }}
      schema={requestDataSchema}
    >
      {({ register, formState }) => (
        <>
          <SelectField
            name="facility"
            label="اختر المنشأة"
            registration={register("facility")}
            options={facilities.map((facility) => ({
              label: facility.name,
              value: facility.id,
            }))}
            error={formState.errors.facility}
            defaultValue={state?.facility}
          />
          <SelectField
            name="area"
            label="اختر الطابق"
            registration={register("level")}
            options={facilities.map((facility) => ({
              label: facility.name,
              value: facility.id,
            }))}
            error={formState.errors.level}
            defaultValue={state?.level}
          />
          <SelectField
            name="area"
            label="اختر المنطقة"
            registration={register("area")}
            options={facilities.map((facility) => ({
              label: facility.name,
              value: facility.id,
            }))}
            error={formState.errors.area}
            defaultValue={state?.area}
          />

          <SelectField
            onChange={(e) =>
              actions.updateAction({ resourceAssetTypeId: e.target.value })
            }
            name="resourceAssetType"
            label="اختر نوع الموارد"
            registration={register("resourceAssetType")}
            options={facilities.map((facility) => ({
              label: facility.name,
              value: facility.id,
            }))}
            error={formState.errors.resourceAssetType}
            defaultValue={state?.resourceAssetType}
          />

          <SelectField
            onChange={(e) =>
              actions.updateAction({ resourceAssetId: e.target.value })
            }
            name="resourceAsset"
            label="اختر الموارد"
            registration={register("resourceAsset")}
            options={facilities.map((facility) => ({
              label: facility.name,
              value: facility.id,
            }))}
            error={formState.errors.resourceAsset}
            defaultValue={state?.resourceAsset}
          />

          <div>
            <Button type="submit" className="w-full" isLoading={false}>
              NEXT
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
