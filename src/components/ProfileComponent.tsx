type ResourceLink = {
  shortDescription: string;
  link: string;
};

type SkillResource = {
  skill: string;
  resources: ResourceLink[];
};

type ProfileData = {
  strengths: string[];
  gaps: string[];
  resources: SkillResource[];
  matchScore: number;
};

const ProfileComponent: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">Skill Gap Analysis</h1>
        <span className="text-xl font-bold text-green-500">
          {data.matchScore}% Match
        </span>
      </div>

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
    </div>
  );
};

export default ProfileComponent;
