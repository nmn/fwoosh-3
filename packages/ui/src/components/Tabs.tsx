"use client";

import {
  Tabs as TabsPrimitive,
  TabsProps,
  TabList as TabListPrimitive,
  TabListProps,
  Tab as TabPrimitive,
  TabProps,
  TabPanel as TabPanelPrimitive,
  TabPanelProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { gray, space } from "../theme/theme.stylex.js";

export function Tabs(props: TabsProps) {
  return <TabsPrimitive {...props} />;
}

const tabListStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    paddingTop: space[2],
    paddingBottom: space[2],
    paddingLeft: space[3],
    paddingRight: space[3],
  },
});

export function TabList<T>(props: TabListProps<T>) {
  // @ts-ignore
  return <TabListPrimitive {...props} {...stylex.props(tabListStyles.base)} />;
}

const tabStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    padding: `${space[2]} ${space[3]}`,
    border: `1px solid ${gray.elementBorder}`,
    backgroundColor: gray.elementBg,
  },
});

export function Tab(props: TabProps) {
  return <TabPrimitive {...props} {...stylex.props(tabStyles.base)} />;
}

export function TabPanel(props: TabPanelProps) {
  return <TabPanelPrimitive {...props} />;
}
