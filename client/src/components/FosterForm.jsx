import React from 'react';
import { FormControl } from '@material-ui/core';
import useForm from 'react-hook-form';

export default function FosterForm() {
  const { register, handleSubmit, errors } = useForm()

  const onSobmit = (data) => {
    console.log(data);
  }
  return (
    <form onSumbit={handleSubmit(onSubmit)}>
      <select placeholder='Foster' name='curFosterName' ref={register}>
        {/* use map to fill this with foster names */}
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <input type='text' placeholder='Foster' name='curFosterName' ref={register} />
    </form>
  )
}