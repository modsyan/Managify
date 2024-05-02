import {
  ContractorData,
  EmployeeData,
  FaultData,
  ManagerData,
  RequestData,
} from "../../../../types";

type UpdateActionPayload =
  | RequestData
  | FaultData
  | ContractorData
  | EmployeeData
  | ManagerData;

export default function updateAction(state, payload: UpdateActionPayload) {
  return {
    ...state,
    yourDetails: {
      ...state.yourDetails,
      ...payload,
    },
  };
}
