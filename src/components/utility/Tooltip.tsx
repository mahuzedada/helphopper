import { Popover } from '@headlessui/react';

interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  return (
    <Popover className="relative inline-block">
      {({ open }) => (
        <>
          <Popover.Button>{children}</Popover.Button>
          {open && (
            <Popover.Panel
              as="div"
              className={`absolute z-10 px-2 py-1 text-white bg-black rounded-md shadow-lg ${positionClasses[position]}`}
            >
              {content}
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
};

const positionClasses = {
  top: '-bottom-10 left-1/2 transform -translate-x-1/2',
  right: 'left-full ml-2',
  bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
  left: '-right-full mr-2',
};

export default Tooltip;
