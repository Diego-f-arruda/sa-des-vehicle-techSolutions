
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SelectRadio() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Aprovado" control={<Radio />} label="Aprovado" />
        <FormControlLabel value="Reprovado" control={<Radio />} label="Reprovado" />
        
      </RadioGroup>
    </FormControl>
  );
}