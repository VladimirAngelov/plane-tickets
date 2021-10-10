import "./styles/style.css"
import React, { Dispatch, SetStateAction } from "react"
import { required } from "../../utils/validateInputs"

interface FieldsProps {
  fields: Array<{
    name: string
    type: string
    placeholder: string
    min?: string
  }>
  setFormError: Dispatch<SetStateAction<string | undefined>>
  inputValues: Array<{
    name: string
  }>
  onChangeHandlers: Array<{
    name: string
    handler: Dispatch<SetStateAction<string>>
  }>
}

const FormFields: React.FunctionComponent<FieldsProps> = ({
  fields,
  setFormError,
  inputValues,
  onChangeHandlers,
}) => {
  const renderedFields = fields.map((field) => {
    const currentHandler: any = onChangeHandlers.find(
      (h) => h.name === field.name
    )
    let currentValue: any | undefined = inputValues.find(
      (v) => v.name === field.name
    )

    return (
      <div className="booking-form-input-wrapper" key={field.name}>
        <div className="booking-form-placeholder">
          {field.name !== "firstName" &&
            field.name !== "lastName" &&
            field.placeholder}
        </div>
        <input
          className="booking-form-input"
          value={currentValue}
          onChange={(e) => currentHandler.handler(e.target.value)}
          onBlur={(e) =>
            setFormError(
              required(e.target.value, `${field.placeholder} is required`)
            )
          }
          type={field.type}
          min={field.min}
          placeholder={field.placeholder}
        />
      </div>
    )
  })
  return <React.Fragment>{renderedFields}</React.Fragment>
}

export default FormFields
