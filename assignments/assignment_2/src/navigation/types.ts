export type MenuItem = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  time: string;
  accent: string;
  icon: string;
  checklist: string[];
};

export type PlannerItem = {
  id: string;
  day: string;
  title: string;
  time: string;
  location: string;
  accent: string;
};

export type ProfileSetting = {
  label: string;
  value: string;
  note: string;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { item: MenuItem };
};

export type MainTabParamList = {
  Home: undefined;
  Menu: undefined;
  Planner: undefined;
  Profile: undefined;
  Animations: undefined;
};
