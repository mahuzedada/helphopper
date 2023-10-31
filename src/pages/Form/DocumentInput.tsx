interface DocumentInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function DocumentInput({ label }: DocumentInputProps) {
  return <>{label}</>;
}
