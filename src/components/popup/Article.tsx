import { Section, Spacer, Text } from "@arconnect/components";
import type { ArweaveNewsArticle } from "~lib/arweave_news";
import { parseCoverImageFromContent } from "~lib/ans";
import { hoverEffect } from "~utils/theme";
import { useMemo } from "react";
import browser from "webextension-polyfill";
import styled from "styled-components";
import dayjs from "dayjs";
import Skeleton from "~components/Skeleton";

export default function Article({
  source,
  title,
  pubDate,
  link,
  contentSnippet,
  content
}: Props) {
  const coverImage = useMemo(
    () => parseCoverImageFromContent(content),
    [content]
  );

  return (
    <Wrapper onClick={() => browser.tabs.create({ url: link })}>
      <Date>
        {source}
        {" • "}
        {dayjs(pubDate).format("MMM DD, YYYY")}
      </Date>
      <Spacer y={0.15} />
      <Content>
        <div>
          <ArticleTitle>{title}</ArticleTitle>
          <Spacer y={0.35} />
          <ArticleContent>{contentSnippet}</ArticleContent>
          <Spacer y={0.45} />
          <ReadMore>Read more</ReadMore>
        </div>
        <ArticleCoverImage src={coverImage} />
      </Content>
    </Wrapper>
  );
}

export const LoadingArticle = () => (
  <Wrapper>
    <Date>
      <Skeleton width="40%" />
    </Date>
    <Spacer y={0.3} />
    <Content>
      <div>
        <ArticleTitle>
          <Skeleton width="100%" />
          <Spacer y={0.25} />
          <Skeleton width="90%" />
        </ArticleTitle>
        <Spacer y={0.5} />
        <ArticleContent>
          <Skeleton width="100%" height=".735rem" />
          <Spacer y={0.25} />
          <Skeleton width="100%" height=".735rem" />
          <Spacer y={0.25} />
          <Skeleton width="100%" height=".735rem" />
        </ArticleContent>
        <Spacer y={0.45} />
        <ReadMore>
          <Skeleton width="30%" />
        </ReadMore>
      </div>
    </Content>
  </Wrapper>
);

const Wrapper = styled(Section)`
  position: relative;
  cursor: pointer;
  transition: transform 0.07s ease-in-out, opacity 0.23s ease-in-out;

  ${hoverEffect}

  &::after {
    width: calc(100% + 15px);
    height: calc(100% + 4px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Date = styled.span`
  font-size: 0.6rem;
  font-weight: 500;
  color: rgb(${(props) => props.theme.secondaryText});
  text-transform: uppercase;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 0.9fr;
  gap: 0.8rem;
`;

const ArticleTitle = styled(Text).attrs({
  noMargin: true,
  heading: true
})`
  display: -webkit-box;
  font-size: 1rem;
  line-clamp: 2;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleContent = styled(Text).attrs({
  noMargin: true
})`
  display: -webkit-box;
  font-size: 0.735rem;
  text-align: justify;
  line-clamp: 3;
  box-orient: vertical;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMore = styled(ArticleContent)`
  font-weight: 600;
  color: rgb(${(props) => props.theme.theme});
`;

const ArticleCoverImage = styled.div<{
  src: string;
}>`
  background-image: url(${(props) => props.src || ""});
  background-position: center;
  background-size: cover;
  aspect-ratio: 1;
  border-radius: 12px;
`;

interface Props extends ArweaveNewsArticle {
  source: "arweave.news";
}
