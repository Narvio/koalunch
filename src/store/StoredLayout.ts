export type LayoutBreakpoint = "lg" | "md" | "sm" | "xs" | "xxs";
export type LayoutData = {
  x: number,
  y: number,
  h: number,
  w: number,
  i: string;
}[];

export type StoredLayout = {
  [key in LayoutBreakpoint]: LayoutData;
};

export type ApplyLayoutParams = {
  breakpoint: LayoutBreakpoint,
  layout: LayoutData;
};
