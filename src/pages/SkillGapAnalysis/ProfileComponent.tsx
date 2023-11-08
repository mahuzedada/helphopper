type ResourceLink = {
  shortDescription: string;
  link: string;
};

type SkillResource = {
  skill: string;
  resources: ResourceLink[];
};

export type ProfileData = {
  summary: string;
  strengths: string[];
  gaps: string[];
  resources: SkillResource[];
  matchScore: number;
};
type Props = {
  data: ProfileData;
};

export default function ProfileComponent({ data }: Props) {
  let matchColorClass = '';
  if (data.matchScore < 25) {
    matchColorClass = 'text-red-500';
  } else if (data.matchScore < 50) {
    matchColorClass = 'text-yellow-500';
  } else if (data.matchScore < 70) {
    matchColorClass = 'text-lime-500';
  } else if (data.matchScore < 90) {
    matchColorClass = 'text-green-600';
  } else {
    matchColorClass = 'text-blue-700';
  }

  return (
    <>
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Result</h1>
        <span className={`text-2xl font-bold ${matchColorClass}`}>
          {data.matchScore}% Match
        </span>
      </div>
      <div className="mb-4">{data.summary}</div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Strengths</h2>
          <ul className="list-disc pl-5">
            {data.strengths.map((strength, idx) => (
              <li key={idx} className="mb-2">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Gaps</h2>
          <ul className="list-disc pl-5">
            {data.gaps.map((gap, idx) => (
              <li key={idx} className="mb-2">
                {gap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Resources to Improve</h2>
        {data.resources.map((resource, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="text-lg font-medium mb-2">{resource.skill}</h3>
            <ul className="list-decimal pl-5">
              {resource.resources.map((link, linkIdx) => (
                <li key={linkIdx} className="mb-2">
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.shortDescription}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
