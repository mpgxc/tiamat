type JobProp = Record<string, string>;
type Job = Record<string, string | JobProp>;

interface IQueueProvider {
  add(job: Job): Promise<void>;
  process(fn: (job: { data: Job }) => Promise<void>): void;
}

export { IQueueProvider, Job };
