export type Events = {
  [key: string]: Event;
};

export type Event = {
	listeners: Array<(details: any) => void>;
};
