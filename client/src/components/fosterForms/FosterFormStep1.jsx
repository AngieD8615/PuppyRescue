import React from 'react'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'

export const FosterFormStep1 = () => {
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const onSubmit = (data) => {
    history.push('/FosterFormStep2')
  }

  return (
    <div>
      <Typography component='h2' variant='h5'>Step 1</Typography>
      <form>
        <input 
          ref={register}
          name='curFosterName'
          type='text'
          placeholder='foster name'
        />
        <input
          ref={register}
          name='puppy_id'
          type='text'
          placeholder='puppy id'
        />
        <button type='submit'>Next</button>
      </form>
    </div>
  )
}