// src/PinkText/index.stories.tsx
import { css } from '@emotion/react';

import React from "react";
import {View} from "./View";

export default {
  title: "Components/View",
  component: View,
};

export const Passage = () => 
  <View theme='passage'>
    <h3>Time for BED</h3>
    Did you know that giraffes...
  </View>

export const Comprehension = () =>
  <View theme='comprehension'>
    <h3>Time for BED</h3>
    Did you know that giraffes...
  </View>