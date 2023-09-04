import { Label, Input } from './Filter.styled';

export const Filter = ({ filter, onChange }) => {
  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        value={filter}
        onChange={e => {
          onChange(e.target.value);
        }}
      ></Input>
    </Label>
  );
};
