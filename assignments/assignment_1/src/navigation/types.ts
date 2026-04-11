export type Contact = {
  id: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  room: string;
};

export type RootStackParamList = {
  MainTabs: undefined;
  ContactDetails: { contact: Contact };
};

export type MainTabParamList = {
  Home: undefined;
  Contacts: undefined;
  Schedule: undefined;
  NoticeBoard: undefined;
};
