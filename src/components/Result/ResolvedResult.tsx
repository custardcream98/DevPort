import { useCallback, useMemo, useState } from "react";

import Tab from "components/Tab";
import ResultItem from "./ResultItem";

import type { ResponseSet } from "types/api";

enum TabType {
  KOREAN,
  ENGLISH,
}

type Props = {
  korean?: ResponseSet[];
  english?: ResponseSet[];
};

const ResolvedResult = ({ korean, english }: Props) => {
  const [tab, setTab] = useState<TabType>(TabType.KOREAN);
  const results = useMemo(
    () => ({ [TabType.KOREAN]: korean, [TabType.ENGLISH]: english }),
    [korean, english],
  );

  const handleKoreanTabClick = useCallback(() => {
    setTab(TabType.KOREAN);
  }, []);
  const handleEnglishTabClick = useCallback(() => {
    setTab(TabType.ENGLISH);
  }, []);

  return (
    <>
      <Tab.Wrapper>
        <Tab.Button
          isActive={tab === TabType.KOREAN}
          onClick={handleKoreanTabClick}
        >
          한국어
        </Tab.Button>
        <Tab.Button
          isActive={tab === TabType.ENGLISH}
          onClick={handleEnglishTabClick}
        >
          English
        </Tab.Button>
      </Tab.Wrapper>
      <ul>
        {results[tab]?.map((result, index) => {
          const questionNumber = index + 1;

          return (
            <ResultItem
              key={result.question}
              questionNumber={questionNumber}
              {...result}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ResolvedResult;
