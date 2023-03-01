import { useCallback, useMemo, useState } from "react";

import Tab from "components/Tab";
import StyledResultP from "./StyledResultP";

enum TabType {
  KOREAN,
  ENGLISH,
}

type Props = {
  korean?: string;
  english?: string;
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
      <StyledResultP>{results[tab]}</StyledResultP>
    </>
  );
};

export default ResolvedResult;
