import { Listbox } from '@headlessui/react';

interface DropdownProps {
  items: string[];
  selected: string;
  onSelectedChange: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selected,
  onSelectedChange,
}) => {
  return (
    <Listbox value={selected} onChange={onSelectedChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-gray-700">
            Choose an item:
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="block w-full bg-white text-gray-900 rounded-md shadow-sm">
              {selected}
            </Listbox.Button>
            {open && (
              <Listbox.Options className="absolute w-full mt-1 bg-white rounded-md shadow-lg">
                {items.map((item) => (
                  <Listbox.Option
                    key={item}
                    value={item}
                    as="li"
                    className="cursor-pointer select-none relative px-4 py-2"
                  >
                    {({ active }) => (
                      <span
                        className={
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }
                      >
                        {item}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Dropdown;
