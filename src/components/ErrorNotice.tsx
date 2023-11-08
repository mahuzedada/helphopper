import React from 'react';

type Props = {
  message: string;
  retryFn: () => void;
};

export default function ErrorNotice({ message, retryFn }: Props) {
  return (
    <div className="bg-red-200 p-4 rounded-md border border-red-500 text-red-900">
      <p className="font-semibold">An Error has occurred: {message}</p>
      <p>
        This is likely due to an outage of OpenAI's API. Check the status at{' '}
        <a target="_blank" href="https://status.openai.com/">
          https://status.openai.com/
        </a>
      </p>
      <button
        onClick={retryFn}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        Retry
      </button>
    </div>
  );
}
