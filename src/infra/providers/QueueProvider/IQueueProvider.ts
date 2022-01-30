type AllTypes = string | number | boolean | null | undefined;
type JobData = Record<string, AllTypes | { [key: string]: AllTypes }>;

type Job = {
  data: JobData;
};

interface IQueueProvider {
  add(job: JobData): Promise<void>;
  process(fn: (job: Job) => Promise<void>): void;
}

export { IQueueProvider, Job, JobData };
