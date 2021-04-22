// src/PinkText/index.stories.tsx
import { css } from '@emotion/react';

import React from "react";
import Text from ".";

export default {
  title: "core-elements/Text",
  component: Text,
};

export const BaseText = () => <Text>텍스트</Text>;
export const textfiled = () => <div  css={css`background:#5a5ab9`}><br /><Text><h2>제목</h2><br />본문본문본문본문본문</Text><br /></div>