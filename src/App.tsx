import React from 'react'
import { useForm } from 'react-hook-form'
import {} from 'react-beautiful-dnd'
import {} from 'react-use'
import { myTheme } from './myTheme'
import styled from 'styled-components'

const Button = styled.button`
  background: purple;
  border-radius: 3px;
  border: 2px solid #126;
  padding: 0.25em 1em;
`

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  register: ({ required }: { required?: boolean }) => RefReturn
}

interface IInputProps {
  label: string
}

// The following component is an example of your existing Input Component
const Input: React.FC<InputProps> = ({ label, register, required }) => (
  <>
    <label>{label}</label>
    <input name={label} ref={register({ required })} />
  </>
)

type Option = {
  label: React.ReactNode
  value: string | number | string[]
}

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] } & HTMLSelectElement

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef<SelectProps, { label: string }>(
  ({ label }, ref) => (
    <>
      <label>{label}</label>
      <select name={label} ref={ref}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  )
)

interface IFormValues {
  'First Name': string
  Age: number
}

const App = () => {
  const { register, handleSubmit } = useForm<IFormValues>()

  const onSubmit = (data: IFormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="First Name" register={register} required />
      <Select label="Age" ref={register} />
      <input type="submit" />
      <Button>Click me!!!!</Button>
    </form>
  )
}
export default App
