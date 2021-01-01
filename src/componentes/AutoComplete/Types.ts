import { AutocompleteChangeDetails, AutocompleteChangeReason } from "@material-ui/lab";

export default interface AutoCompleteProps<T> {
  onChange?: (event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
  label: string;
  name: string;
  required?: boolean;
  listOptionsIn: boolean;
  disabled?: boolean;
  multiple?: boolean;
}