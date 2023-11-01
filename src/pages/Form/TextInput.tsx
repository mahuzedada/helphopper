import InputProps from './InputProps';
import { useFormContext } from 'react-hook-form';

export default function TextInput({
  label,
  placeholder,
  fieldName,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-1/2 px-2">
      <label className="block mb-2 font-bold" htmlFor={`${label}-textInput`}>
        {label}:
      </label>
      <input
        id={`${label}-textInput`}
        type="text"
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
        {...register(fieldName, { required: true })}
      />
      {errors[fieldName]?.type === 'required' && (
        <p className="text-red-600" role="alert">
          {label} is required
        </p>
      )}
    </div>
  );
}
